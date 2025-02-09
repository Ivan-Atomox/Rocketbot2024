const DEBUG = true;
let app = new Vue({
  el: '#app',
  data: {
    test2: [  { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" }],
    test: '',
    max_char: 50,
    commands: {},
    bot:{},
    bots:[],
    project: [],
    robotModules: [],
    modules:{},
    botsInDB: {},
    controlHide: false,
    botDBName:"",
    bot_folder: "",
    addons:[],
    robot_name:" ",
    message:"",
    path_encode:" ",
    project_description:"",
    controlMenuAddons: false,
    version: '0.1',
    version_app: '2024.01.01 beta',
    vars:[],
    command_editing:{},
    editing_command:null,
    father_editing:{},
    language: "en",
    texts: [],
    file_loading: false,
    command_running: {},
    robot_version: "",
    robot_type: null,
    data_type: null,
    stack_logic: [],
    viewVars: false,
    viewRobot: false,
    viewRobotsInProject: false,
    viewExpose: false,
    nod_running: null,
    logic_commands : ['evaluateif', 'for', 'evaluatewhile', 'group'],
    break_commands : ['for', 'evaluatewhile'],
    viewMods: false,
    robot_stop: false,
    extensions :{
        'image': [['Jpg', '*.jpg'], ['Png', '*.png'], ['Gif', '*.gif'], ['Bmp', '*.bmp']],
        'video': [['Mp4', '*.mp4'], ['Avi', '*.avi'], ['Mkv', '*.mkv'], ['Webm', '*.webm']],
        'audio': [['Mp3', '*.mp3'], ['Wav', '*.wav'], ['Ogg', '*.ogg'], ['Flac', '*.flac'], ['Aac', '*.aac']],
        'pdf': [['Pdf', '*.pdf']],
        'xlsx': [['Xlsx', '*.xlsx'], ['Xls', '*.xls'], ['Csv', '*.csv'], ['Xlsm', '*.xlsm']],
        'docx': [['Doc', '*.docx']],
        'exe': [['Exe', '*.exe']],
        'db': [['Databases', '*.db']],
    }

  },
  watch: {
    'robot_stop': function(o,n){
      if(o){
        $.toast({ 
          heading: 'Robot stopped',
          text : "The execution of the robot will be stopped", 
          showHideTransition : 'slide',  // It can be plain, fade or slide
          allowToastClose : false,       // Show the close button or not
          hideAfter : false,              // `false` to make it sticky or time in miliseconds to hide after
          stack : 5,      
          hideAfter: 5000,
          allowToastClose: true,
          icon: 'warning',               // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
          position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
        })
      }
    }
  },
  methods:{
    addInputToExpose(event) {
      this.bot.project.expose.form.push(event);
    },
    exportModal(){
      $("#modal_export_select").modal()
    },
    openNewRobotModal() {
      $("#modal-new-robot").modal("show");
    },
    downloadJSON() {
      let project = {project: this.bot.project}
      project.project.commands = this.exportToDB();
      const stringified = JSON.stringify(project)
      const name = this.bot?.project?.profile?.name + '.json' || 'robot.json'
      const type = 'application/json'
      const id = 'file_download'
      const elem = document.getElementById(id)
      if (elem) {
        elem.parentNode.removeChild(elem)
      }
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.id = id
      const file = new Blob([stringified], {
        type
      })
      a.href = URL.createObjectURL(file)
      a.download = name
      a.click()
    },
    removeEditedCommand(){
      app.$data.editing_command = null;
      app.$data.command_editing = {};
    },
    closeModal(){
      this.removeEditedCommand();
      $("#modal-edit").modal("hide");
    },
    closeNewRobotModal(){
      $("#modal-new-robot").modal("hide");
    },
    exportDb(production, withModule, func){
      let p = production?1:0;
      let url = '../projectto/'+p+'/' + this.robot_name+ "/" +this.path_encode+"?include_modules="+withModule
      fetch(url).then(response=>response)
      .then(data=>{
        if(func){func(data)}
      })
    },
    createNewRobot(name, description, type) {
      const newProject = this.generateEmptyProject()
      newProject.profile.name = name
      newProject.profile.description = description
      fetch("../addbot", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: $.param({ 
          name: name, 
          code: JSON.stringify({project: newProject}) , 
          description: description, 
          db: this.path_encode, 
          version: '', 
          father: type === 'flow' ? "flow" : "", 
          bot_type: type === 'flow' ? "flow" : null
        })
      }).then(response => response.json())
      .then(data => {
        const url = type === 'flow' ? `flow?r=${name}&d=${this.path_encode}` : `editor/#/edit/${name}/db/${this.path_encode}`
        window.open(url, "_blank")
        this.closeNewRobotModal()
    }).catch(err=>{
        $.toast({ 
          heading: 'Robot could not be saved',
          text : "Please try again", 
          showHideTransition : 'slide',  // It can be plain, fade or slide
          allowToastClose : false,       // Show the close button or not
          hideAfter : false,              // `false` to make it sticky or time in miliseconds to hide after
          stack : 5,      
          hideAfter: 5000,
          bgColor: '#BC0017',
          allowToastClose: true,
          icon: 'warning',               // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
          position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
        })
      })
    },
    getProject() {
      let data = new FormData();
      data.append("path", this.path_encode)
      data.append("name",this.robot_name);
      data.append("data", JSON.stringify(this.bot))

      fetch("../project",
      {
        method: "POST",
        body: data
      })
      .then(res=> res.json())
      .then(data=>{
        this.project = data;
        this.robotModules = this.project?.[0]?.modules || [];
        this.$set(this.bot.project, 'modules', this.robotModules)
      })
    },
    getCommands(func){
      fetch("../commands/" + this.language)
      .then(response => response.json())
      .then(data => {
        this.commands = data.commands;
        this.texts = data.texts;
        fetch("../getmodules")
        .then(response => response.json())
        .then(data => {
          this.modules = data[0].children;
          if(func){
            func()
          }
        })
      });
      
    },
    getFatherData(father, group, command ) { 
      
      let gi = function (params) {
        if(!params){
          return []
        }
        let img = false;
        for (let t = 0; t < params.length; t++) {
          if (params[t].children && params[t].children.length > 0) {
            img = gi(params[t].children);
            if (img) {
              return img;
            }
          }
          if (params[t].else && params[t].children.length > 0) {
            img = gi(params[t].else);
            if (img) {
              return img;
            }
          }
        }
        
        for (let t = 0; t < params.length; t++) {
          if (params[t].father == father && params[t].group == group) {
            return params[t];
          }
        }
      }
      let gi_modu = function (params, module_name, module_) {
        let img = false;
        for (let t = 0; t < params.length; t++) {
          if (params[t].children && params[t].children.length > 0) {
            img = gi_modu(params[t].children, module_name, module_);
            if (img) {
              return img;
            }
          }
        }
        
        for (let t = 0; t < params.length; t++) {
          if (params[t]['module_name'] == module_name && params[t]['module'] == module_) {
            return params[t];
          }
        }
      }
      if (father == 'module' && group == 'scripts') {
        JSON.parse(command)
        //console.log(father, group, command)
        let c = JSON.parse(command);
        let ret = gi_modu(app.modules, c["module_name"], c["module"])
        //console.log("ret", ret)
        return ret;
      } else {
        //console.log("getFatherData", father, group, command)
        let ret = gi(app.$data.commands);
        return ret
      }
    },
    saveBot(){
      let flow = editor.export();
      for(let c in flow.drawflow.Home.data){
        flow.drawflow.Home.data[c].html = null;
      }
      let bot = copyObject(app.$data.bot);
      bot.project.commands = this.exportToDB();
      bot.flow = flow;
      
      
      fetch("../addbot", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: $.param({ 
          name: this.robot_name, 
          code: JSON.stringify(bot) , 
          description:this.project_description, 
          db:this.path_encode, 
          version: this.robot_version, 
          father: this.robot_type, 
          bot_type: "flow"})
        
      })
      
      .then(response => response.json())
      .then(data => {
        this.getProject();
        $.toast({ 
          heading: 'Robot Saved',
          text : "The robot was saved in Drawflow format, it can only be edited with Rocketbot Drawflow.", 
          showHideTransition : 'slide',  // It can be plain, fade or slide
          allowToastClose : false,       // Show the close button or not
          hideAfter : false,              // `false` to make it sticky or time in miliseconds to hide after
          stack : 5,      
          hideAfter: 10000,
          allowToastClose: true,
          icon: 'success',               // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
          position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
        })
      }
      )
    },
    getDbFile(){
      fetch("../getdb_file", {method:"POST"})
      .then(res=> res.json())
      .then((data)=>{
        //console.log(data)
        if(data && data.load){
          //console.log(data.name);
          this.botDBName = data.name;
          this.path_encode = data.encode
          let form_ = new FormData();
          form_.append("db", data.encode);
          fetch("../getbots", 
          {
            method:"POST",
            body: form_
          } )
          .then((res)=> {return res.json()})
          .then((bots)=>{
            this.botsInDB = bots.bots;
            MicroModal.show('modal-1')
          })
        }
      })
    },
    getBot(db, name){
      let data = new FormData();
      data.append("db",db)
      data.append("name",name);
      this.path_encode = db;
      this.robot_name = name ;
      fetch("../getbot",
      {
        method: "POST",
        body: data
      })
      .then(res=> res.json())
      .then((data)=>{
        this.setBot(data, name)
      })
    },
    setBot (data, name) {
      document.title = name + " - Rocketbot Drawflow";
      this.bot = this.setBotProject(data, name);
      if (!('expose' in this.bot.project)) {
        this.$set(this.bot.project, 'expose', this.setDefaultExpose(this.bot.project.profile.name, this.bot.project.profile.description))
      }
      this.setBotExtraData(data);
      this.getProject();
      loadBotView(this.bot);
      try{
        MicroModal.close("modal-1");
      }catch(e){
        
      }
    },
    setDefaultExpose (name, description) { //*
      return {
        title: {
          en: name + ' expose' || '',
          es: name + ' expose' || '',
          pr: name + ' expose' || ''
        },
        description: {
          en: description || '',
          es: description || '',
          pr: description || ''
        },
        form: []
      }
    },
    deleteBot (bot, index) {
      const formData = new FormData()
      formData.append('name', bot.name)
      formData.append('id', bot.id)
      formData.append('type', bot.type)
      formData.append('db', this.path_encode)
      fetch("../removebot", {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      }).then(res => res.json())
      .then(data => {
        this.bots.splice(index, 1)
      })
      .catch(err => {
        $.toast({ 
          heading: 'Robot could not be deleted',
          text : "Please try again", 
          showHideTransition : 'slide',  // It can be plain, fade or slide
          allowToastClose : false,       // Show the close button or not
          hideAfter : false,              // `false` to make it sticky or time in miliseconds to hide after
          stack : 5,      
          hideAfter: 5000,
          bgColor: '#BC0017',
          allowToastClose: true,
          icon: 'warning',               // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
          position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
        })
      })
    },
    generateEmptyProject () {
      return {
        commands: [], ifs: [], modules: [], profile: {}, vars: []
      }
    },
    setBotProject (data, name) {
      let result = JSON.parse(data[0].data);
  
      if (!result) {
        result = {project: this.generateEmptyProject()};
        result.project.profile.name = name
        result.project.profile.description = data[0]?.description || "";
      }
      return result
    },
    setBotExtraData(data) {
      this.project_description = this.bot.project.profile.description;
      this.vars = this.bot.project.vars;
      this.robot_version = data[0]?.version;
      this.robot_type = data[0]?.father;
      this.test=  data[0]?.father
      this.data_type = data[0]?.data_type;
    },
    getBots(db){
      if(!db){
        db = this.path_encode;
      }
      let data = new FormData();
      data.append("db",db)
      
      fetch("../getbots",
      {
        method: "POST",
        body: data
      })
      .then(res=> res.json())
      .then((data)=>{
        this.bots = data.bots;
        this.bot_folder = data.db;
      })
      
      
    },
    async updateModule (name, index) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('branch', 'master')

      const moduleUpdatedRes = await fetch(
         '/market/installMod/', {
          method: 'POST',
          body: formData
        }
      ).then(res => {
        if (res.status === 200) {
        
          fetch("../getmodules")
          .then(response => response.json())
          .then(data => {
            this.modules = data[0].children;
            this.bot.project.modules[index].status = 'Installed'
            this.bot.project.modules[index].version = this.bot.project.modules[index].last_version
            this.robotModules[index].status = 'Installed'
            this.robotModules[index].version = this.robotModules[index].last_version
          
          })
          .catch(err => 
          {
            console.log(err, 'err')
          }
          )
          .finally(() => {
            $.toast({ 
              heading: 'Module installed',
              text : "Please save and refresh the page to see the changes.", 
              showHideTransition : 'slide',  // It can be plain, fade or slide
              allowToastClose : false,       // Show the close button or not
              hideAfter : false,              // `false` to make it sticky or time in miliseconds to hide after
              stack : 5,      
              hideAfter: 10000,
              allowToastClose: true,
              icon: 'success',               // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
              position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
            })
          })
        } else {
          $.toast({ 
            heading: 'Module could not be updated',
            text : "Please try again", 
            showHideTransition : 'slide',  // It can be plain, fade or slide
            allowToastClose : false,       // Show the close button or not
            hideAfter : false,              // `false` to make it sticky or time in miliseconds to hide after
            stack : 5,      
            hideAfter: 5000,
            bgColor: '#BC0017',
            allowToastClose: true,
            icon: 'warning',               // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
            position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
          })
        }
      })
      .catch(err => $.toast({ 
        heading: 'Module could not be updated',
        text : "Please try again", 
        showHideTransition : 'slide',  // It can be plain, fade or slide
        allowToastClose : false,       // Show the close button or not
        hideAfter : false,              // `false` to make it sticky or time in miliseconds to hide after
        stack : 5,      
        hideAfter: 5000,
        bgColor: '#BC0017',
        allowToastClose: true,
        icon: 'warning',               // `fakse` to show one stack at a time count showing the number of toasts that can be shown at once
        position : 'top-center'       // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values to position the toast on page
      }))
    },
    changeRobotName(name) {
      this.bot.project.profile.name = name;
      this.robot_name = name;
    },
    changeRobotVersion(version) {
      this.robot_version = version;
    },
    changeRobotType(type) {
      this.robot_type = type;
    },
    changeRobotDescription(description) {
      this.bot.project.profile.description = description;
      this.project_description = description;
    },
    controlMenu(){
      let obj = document.getElementById("controlMenu");
      let btn = document.getElementById("controlMenuBtn");
      
      if(this.controlHide)
      { 
        obj.classList.remove("collapse");
        btn.classList.remove("collapsed");
        
      }else{
        obj.classList.add("collapse");
        btn.classList.add("collapsed");
      };
      this.controlHide = !this.controlHide;
    },
    getAddons(){
      fetch("/getAddons")
      .then(response => response.json())
      .then((data) => {
        this.addons = data;
      });
      
    },

    /*ROBOT EXECUTION*/
    /*START ROBOT: reinitializes the execution icons and sets all the command to pause.
    
    */
    startrobot(){
      this.stack_logic = [];
      $(".fa-check").removeClass("fa-check").addClass("fa-pause")
      $(".runned").removeClass("runned");
      this.setToInitialState(this.bot.project.commands, true);
      this.robot_stop = false;
      this.executeRobot();
    },
    executeRobot(nod, connection, start){
      this.nod_running = nod;

      if(this.robot_stop){
        return;
      }
      if(!nod){
        this.playStartNode(nod, start); 
      }
      $(".node_in_node-"+this.nod_running?.id+ " path").addClass("runned");
      /* get command to run */
      let vv = getCommandById(this.bot.project.commands,this.nod_running?.data.id )
      
      if(!vv){
        console.log("No command found")
        return;
      }
      /* Run command */
      playNode(vv, true);
    },
    playStartNode(node, start) {
      if(start===false){
        return;
      }
      console.log("No node: is a Start FLAG")
      //GET NODE FROM ID get a NODE ID, and returns the node object
      //getNextCommand takes a node object and gets its next command
      this.command_running = getNextCommand(editor.getNodeFromId(editor.getNodesFromName("start")[0])  ,0, 1);
      this.nod_running = this.command_running     
    },
    executeCommand(command, func){
      if(command?.disabled){
        if(func){
          func({disabled:true});
        }
        return;
      }
      let icon = document.getElementById("icon_status_" + command.id );
      let running = document.getElementById("running_" + command.id );
      icon.className = "fa fa-spin fa-spinner";
      try{
        icon.parentElement.classList.remove("text-danger")
      }catch(e){}
      running.className = "running active";
      let data = {
        project: {
          profile: {
            name: this.robot_name,
            description: this.project_description || "",
            version: this.version
          },
          vars: this.vars,
          commands: [command],
          ifs: []
        }
      }
      let details={
        "db":this.path_encode,
        "info": JSON.stringify(data)
      }
      
      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");  
      
      fetch("/execute",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      })
      .then(res=> res.json())
      .then((res)=>{
        if(res && res.status=="True"){
          if(res.vars && res.vars.length > 0){
            app.$data.vars = res.vars;
          }
          icon.className = "fa fa-check";          
        }else{
          icon.className = "fa fa-exclamation-triangle";
          icon.parentElement.classList.add("text-danger")
        }
        running.className = "running";
        if(func) func(res);
      })
    },
    setToInitialState(data, init, execute, execute_debbug) {
      /**
      * Pongo los comandos en pausa forzada
      */
      if (!execute) {
        execute = 2;
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i] || data[i] != null) {
          data[i].execute = execute;
          data[i].index = i;
          data[i].execute_debbug = execute_debbug?execute_debbug:0;
          data[i].img = "";
          if (data[i].father == 'evaluateIf' || data[i].father == 'trycatch') {
            if (!data[i]["else"]) {
              data[i]["else"] = [];
            }
          }
          data[i]['screenshot'] = "";
          if (data[i].father == "for" && init) {
            let c = null
            if (typeof data[i].command === 'string') {
              try {
                c = JSON.parse(data[i].command)
              } catch (e) {
                console.log('error: ' + e, 'command: ' + data[i])
              }
            } else {
              c = data[i].command
            }
            if (c === null) {
              c = {
                iterable: '',
                count: 0
              }
            }
            data[i].command = JSON.stringify({
              iterable: c.iterable,
              count: 0
            })
          }
          if (!data[i].id) {
            data[i].id = guid();
          }
          if (data[i].children) {
            data[i].children = copyObject(this.setToInitialState(data[i].children, init));
          }
          if (data[i].else) {
            data[i].else = copyObject(this.setToInitialState(data[i].else, init));
          }
        } else {
          /**
          * El comando por alguna razon es null
          */
          data.splice(i, 1)
          i = i - 1;
        }
      }
      
      return data;
    },
   
    
    setCommand(command, id){
      getCommandById(this.bot.project.commands , id || command.id, command)       
      actual_node.data.command = command.command || ""
      actual_node.data.option = command.option || ""
      actual_node.data.var = command.var || ""
      actual_node.data.getvar = command.getvar || ""
      actual_node.data.setvar = command.setvar || ""
      actual_node.data.result = command.result || ""
      editor.updateNodeDataFromId(actual_node.id, actual_node.data)
      $("#node_command_"+actual_node.data.id).text(actual_node.data.command||"")
    },
    
    searchFolder(path){
      return fetch("../getfolder", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then(response => response.text())
      .then(data => {
        if(path){
          let input = $("#" + path);
          input.val(data);
          input.trigger('input');
          input.trigger('change');
        }else{
          return data
        }
      })
    },
    searchFileSave( path,extensions,default_extension){
      if(!extensions){
        extensions = this.extensions
      }
      return fetch("../getfilesave", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: $.param({ extensions: extensions, default_extension: default_extension}),
        
      })
      
      .then(response => response.text())
      .then(data => {
        if(path){
          let input = $("#" + path);
          input.val(data);
          input.trigger('input');
          input.trigger('change');
        }else{
          return data
        }
      })
    },
    saveDataCommand(text, name, type) {
      var id = "file_download";
      var elem = document.getElementById(id);
      if (elem) {
          elem.parentNode.removeChild(elem);
      }
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.id = id;
      var file = new Blob([text], {
          type: type
      });
      a.href = URL.createObjectURL(file);
      a.download = name;
      a.click();
  },
    exportToDB(){
      /**
       * Return only cascade version of
       */            
      let it = function(nodo, con){
        let data = [];
      
        //check if ids exists
        let nodo_ = {...nodo}
        while(nodo){

          nodo = getNextCommand(nodo,0,con);
          if(nodo){
            let comm = getCommandById(app.bot.project.commands , nodo.data.id);
            if (!comm) {
              
              app.bot.project.commands.push({
                id: nodo.data.id,
                command: nodo.data?.command,
                option: nodo.data?.option,
                var: nodo.data?.var,
                getvar: nodo.data?.getvar,
                setvar: nodo.data?.setvar,
                result: nodo.data?.result,
                father: nodo.name,
                group: nodo.class === 'logical' ? 'logic' : nodo.class,
                children: [],
                else: [],
                disabled: nodo.data?.disabled,
                extra_data: nodo.data?.extra_data
              });
            }
            
          }
      }
      nodo = {...nodo_};
        while(nodo){
          nodo = getNextCommand(nodo,0,con);
          if(nodo){
            let comm = getCommandById(app.bot.project.commands , nodo.data.id);
            if(['evaluateIf', 'trycatch'].includes(nodo.name)){
              comm.children = it(nodo, 1);
              comm.else = it(nodo, 2);              
            }
            if([ 'evaluatewhile','for','group' ].includes(nodo.name)){
              comm.children = it(nodo, 1);
            }
            data.push(comm);
            con = Object.keys(nodo.outputs).length;
          }
        }
        return data;
      }
      let data = it(editor.export().drawflow.Home.data[1],1)
      return data
    },
    searchFile(path, extensions, default_extension){
      //let extensions = "*";
       return fetch("../getfile", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: $.param({ extensions: extensions, default_extension: default_extension}),
        
      })
      
      .then(response => response.text())
      .then(data => {
        if(path){
          let input = $("#" + path);
          input.val(data);
          input.trigger('input');
          input.trigger('change');
        }else{
          return data
        }
      })
      
    },
  
  },
  mounted(){
	//get events from eventlistener, multiple events can be added, compatible with IE11
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
	 // Listen to message from child window
	eventer(messageEvent,function(e) {
		try {
			var data = e.data
			if (data.type && data.type == 'iframe') {
				try{
					//if this.command_editing.command is a string change to object
					if(typeof app.$data.command_editing.command == 'string'){
						app.$data.command_editing.command = JSON.parse(app.$data.command_editing.command)
					}
				}catch(e){
					console.log(e)
				}
				app.$data.command_editing.command['iframe'] = data.commands;
			}
			if (data.type && data.type == 'scrollTo') {
				var k;
				let _data = editor.export().drawflow.Home.data;
				for(var t = 0; t < Object.keys(_data).length; t++){
					k =  Object.keys(_data)[t];
					if(_data[k].data.id == data.id){
						editor.translate_to(
							(- _data[k].pos_x) + (editor.precanvas.clientWidth / 2), 
							(- _data[k].pos_y) + (editor.precanvas.clientHeight / 2)
							);
						break;
					}

				}
			}
		} catch (e) {
			console.log(e)
		}	
	},false);
	

    let params = new URLSearchParams(window.location.search);
    if(params.has("r")){
      this.robot_name = params.get("r");  
    }
    if(params.has("d")){
      this.path_encode = params.get("d");  
    }
    
    this.getCommands(function(){
      if(app.$data.robot_name && app.$data.robot_name.length > 1 && app.$data.path_encode.length > 1){
        editor.loadingFromDb = true;
        app.getBot(app.$data.path_encode,app.$data.robot_name)
      }else{
        app.$data.bot = {
          project: {
            profile: {
              name: "",
              description: "",
              version: app.$data.version
            },
            vars: [],
            commands: [],
            ifs: []
          }
        }
        addNodeToDrawFlow('start',"start", 140, 150, [], 0);
      }
    }); 
    this.getAddons();
    this.getBots(this.path_encode);
    
  }
})


let getCommandById = function(data,id, setdata){
  
  let search = function(data,id){
    for(let c =0; c < data.length; c++){
      if (data[c]) {
        if(data[c].id == id){
          if(setdata) {
            data[c] = setdata;
          }
          return data[c]
          
        }
        if(data[c].children ){
          let d = search(data[c].children, id)
           if(d) return d;
        }
        if(data[c].else){
          let d = search(data[c].else, id)
          if(d) return d;
        }
      } 
    }
  }
  let re = search(data,id);
  return re;
}
let deleteCommandById = function(data,id){
  let result;
  for(c in data){
    if (data[c]) {
      if(data[c].id == id){
        data.splice(c,1)
        continue;
      }
      if(data[c]?.children && data[c].children.length >0){
        result = deleteCommandById(data[c].children, id)
        if(result) return result;
      }
      if(!result && data[c]?.else && data[c].else >0){
        result = deleteCommandById(data[c].else, id)
        if(result) return result;
      }
    }
  }
}
let editCommand = function(id){
  app.$data.editing_command = id;
  unShowConextMenu()
  
  $("#modal-edit").modal("show");
  setTimeout(function(){
    loadAutocomplete();
  },500)
}



function playNode (vv, run){
  unShowConextMenu()
  if(!vv){
    vv = getCommandById(app.$data.bot.project.commands ,actual_node.data.id )
  }
  
  //vv.children = [];
  //vv.else = [];
  /* run command */
  app.executeCommand(vv, function(res){
    if(!run){
      return;
    }
    
    let node_disabled = res?.disabled;
    let d_connection = 1;
    let getNext = true;    
    let isBreak = false;
    let addLogic = true;
    let isTryCatch = false;
    let logicIndex ;
    for(let t=0; t < app.$data.stack_logic.length; t++){
      if(app.$data.stack_logic[t].data.id == vv.id){
        addLogic = false;
        logicIndex = t;
        break;            
      }
    }
    if(!node_disabled){
      if(res.break){
        isBreak = true;
        
      }
      if (res.extra ){
        app.setToInitialState(vv.children, true);
        if(vv.father == "evaluateIf" ){
          app.$data.stack_logic.push(copyObject(app.$data.nod_running));
          if ( res.extra.res != "True" || res.status != "True"){
            d_connection = 2;                               
          }      
        }
        
        if(["for","evaluatewhile","trycatch", "group"].includes(vv.father) ){        
          if (res.extra.res === true){          
            // Add to stack if is a for
            
            if(addLogic){
              if(vv.father == "trycatch"){
                //alert("add try")
              }
              app.$data.stack_logic.push(copyObject(app.$data.nod_running));
            }else{
              app.$data.stack_logic[logicIndex] = copyObject(app.$data.nod_running);
            }
            if(vv.father == "for" ){
              let t = JSON.parse(vv.command);
              t.count = res.extra.count;
              vv.command = JSON.stringify(t);
              getCommandById(app.$data.bot.project.commands ,vv.id ,vv)          
            }
          }else{ 
            
            d_connection = 2;
            //app.$data.stack_logic.pop();
            
          }
        }
        if (['stop', 'stop_all'].includes(vv.father)){
          app.$data.robot_stop = true;
          return;
        }
        
        
        
      }
      //data.extra.count

      if(res.status == "False" && app.$data.stack_logic.map(function(i){return i.name;}).includes("trycatch")){
        console.log("Status False, error on command")
        isTryCatch = true;
        d_connection = 2;
      }
      if(app.$data.nod_running.data?.breakpoint){
        alert("Breakpoint")
        return;
      }
    }else{
      d_connection = Object.keys(app.$data.nod_running.outputs).length;
    }
    if(
      Object.keys( app.$data.nod_running.outputs).length > 0 && 
      app.$data.nod_running.outputs['output_1'].connections.length >0 && 
      getNextCommand(app.$data.nod_running,0,d_connection) &&
      !isBreak && !isTryCatch 
      ){  
        
        /* get next command and run */
        let nc = getNextCommand(app.$data.nod_running,0,d_connection||1);
        
        app.executeRobot(nc, d_connection)
      }else{
        console.log("No connections or break")
        app.$data.command_running = null;
        let nod_;
        let t_index = app.$data.stack_logic.length - 1;
        if(isBreak){          
          // Search next logic breakeable
          while(t_index >= 0){            
            if(app.$data.break_commands.includes(app.$data.stack_logic[ t_index ].name) ){            
              break;
            }else{
              app.$data.stack_logic.splice( t_index, 1);
            }  
            t_index--;
          }                    
        }
        if(isTryCatch){ 
          t_index = app.$data.stack_logic.length - 1;          
          while(t_index >= 0){            
            if(app.$data.stack_logic[ t_index ].name == "trycatch" ){   
              break;
            }else{
              app.$data.stack_logic.splice( t_index, 1);
            }  
            t_index--;
          }                    
        }
        if (app.$data.stack_logic.length > 0){       
          nod_ =  app.$data.stack_logic.pop();
          let temp;
          if(nod_.name == "trycatch" ){ 
            d_connection = 3; 
            if(isTryCatch){
              d_connection = 2; 
              app.$data.stack_logic.push(nod_);
            }
            temp = getNextCommand(nod_,0,d_connection);
          }
          if(nod_.name == "evaluateIf" ){ 
            d_connection = 3; 
            temp = getNextCommand(nod_,0,d_connection||1);
          }
          if(["for","evaluatewhile"].includes(nod_.name ) ){ 
            temp = nod_;
            if(isBreak){
              d_connection = 2;
              temp = getNextCommand(nod_,0,d_connection);
            }
          }
          if(["group"].includes(nod_.name ) ){ 
            temp = nod_;
            
              d_connection = 2;
              temp = getNextCommand(nod_,0,d_connection);
          }
          if (temp) {
            app.executeRobot(temp, d_connection)
          } else if (app.$data.stack_logic.length > 0) {
            app.$data.nod_running = app.$data.stack_logic.pop();
            app.executeRobot(app.$data.nod_running, 0)

          } else {
          }
        }
      }
    })
  }
  let deleteNode = function(id){
    unShowConextMenu();
    if(!id){
      deleteCommandById(app.$data.bot.project.commands ,actual_node.data.id )
      editor.removeNodeId('node-' + actual_node.id)
    }else{
      let nid = editor.getNodeFromId(id.split("-")[1])
      deleteCommandById(app.$data.bot.project.commands ,nid.data.id )
      editor.removeNodeId(id)
    }
    
  }
  let cloneCommand = function(){
    unShowConextMenu();
    let command = copyObject(getCommandById(app.$data.bot.project.commands ,actual_node.data.id ))
    let id_ = guid();
    command.id = id_;
    app.$data.bot.project.commands.push(command);

    addNodeToDrawFlow(command.father, command.group, actual_node.pos_x ,  actual_node.pos_y + 100, command.command, id_, command,false, true)


  }
  
  let copyObject = function(obj){
    return JSON.parse(JSON.stringify(obj));
  }

 
  const dataURItoBlob = (dataURI) =>{
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
        type: mimeString
    });
}

let searchChild = function(nodo, con, hide_){
  let data = [];

  while(nodo){
    nodo=getNextCommand(nodo,0,con);
    
    if(nodo){
      let comm = getCommandById(app.bot.project.commands , nodo.data.id);      
      if(!nodo.data?.hiden){
        if(['evaluateif', 'trycatch'].includes(nodo.name)){
          comm.children = searchChild(nodo, 1, hide_);
          comm.else = searchChild(nodo, 2, hide_);              
        }
        if([ 'evaluatewhile','for','group' ].includes(nodo.name)){
          comm.children = searchChild(nodo, 1, hide_);
        }
      }
      
      let p = $(".node_in_node-" + nodo.id), c = $("#command_" + nodo.data.id).parent().parent()
      if(hide_ ){
        p.hide(100);c.hide(100)
      }else{
        p.show(100);c.show(100)
        
        
      }
      data.push(comm);
      con = Object.keys(nodo.outputs).length;
      
    }
  }
  return data;
}