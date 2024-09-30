Vue.component('modal-edit', {
    template:`
    <div>
    <div class="modal fade" id="modal-edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header">
                    <h5 class="modal-title w-100" id="exampleModalLabel">
                        <img style="width: 28px;float: left;" v-bind:src="commandFather.icon||''">  {{getCommandTitle(commandFather) }}
                        <div class="m-1 ml-3 pl-2 float-right rem9 w-100">
                            <div v-if="!edit_description">
                            <small v-if="copyCommand.description" class="mr-3">"<b> {{ copyCommand.description}} </b>"</small> <small v-if="!copyCommand.description||copyCommand.description.length==0" class="text-muted"> {{app.texts.description}} </small> <i @click="edit_description=true" class="fa fa-pencil mr-1 can-click"></i>
                                </div>
                            <input v-if="edit_description" type="text" class="form-control" v-model="copyCommand.description" :placeholder="app.texts.description">
                        </div>
                    </h5>
                    
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
        </div>
            <div class="modal-body">
                <div v-if="commandData && commandFather" class="">
                    <p> <i class="fas fa-question-circle"></i> {{ commandFather?.en?.description|| commandFather.description?.en ||  commandFather.description }}</p>
                    <modules v-if="commandData.father === 'module' " v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></modules>
                    <form-command v-else-if="'form' in commandFather && !['trycatch'].includes(commandData.father)"  v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></form-command>
                    <web-use v-else-if="(commandData.father === 'use' || commandData.father === 'openbrowser')" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></web-use>
                    <web-getimage v-else-if="commandData.father === 'getimage'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></web-getimage>
                    <files-savetext v-else-if="commandData.father === 'savedatafile'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></files-savetext>
                    <files-filescontrol v-else-if="['movefile', 'copyfile', 'deletefile', 'zipfile', 'unzipfile'].includes(commandData.father)" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></files-filescontrol>
                    <files-extract-text v-else-if="commandData.father === 'pdftext'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></files-extract-text>
                    <files-new-xlsx v-else-if="['newxlsx', 'getcell'].includes(commandData.father)" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></files-new-xlsx>
                    <files-open-xlsx v-else-if="commandData.father === 'readxlsx'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></files-open-xlsx>
                    <files-count-elements v-else-if="['getsheets', 'getrows', 'getcols'].includes(commandData.father)" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></files-count-elements>
                    <files-set-cell v-else-if="commandData.father === 'setcell'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></files-set-cell>
                    <mysql-connect v-else-if="commandData.father === 'connect'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></mysql-connect>
                    <mysql-query v-else-if="commandData.father === 'query'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></mysql-query>
                    <email-configure v-else-if="commandData.father === 'configemail'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></email-configure>
                    <email-send v-else-if="commandData.father === 'sendemail'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></email-send>
                    <email-getallemail v-else-if="['getallemail', 'getunreademail', 'runmacro'].includes(commandData.father)" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></email-getallemail>
                    <email-read v-else-if="commandData.father === 'reademail'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></email-read>
                    <http-simple v-else-if="commandData.father === 'geturl'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></http-simple>
                    <http-advanced v-else-if="commandData.father === 'request'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></http-advanced>
                    
                    <virtual-clickimage  v-else-if="commandData.group == 'virtual'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></virtual-clickimage>
                    <web-waitforobject v-else-if="commandData.father == 'waitforobject'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></web-waitforobject>
                    <system-setvar v-else-if="commandData && commandData.father == 'setVar'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></system-setvar>

                    <scripts-execpython 
                        v-else-if="commandData.father === 'execScriptPython'"    
                        v-bind:command-data="copyCommand" 
                        v-bind:command-father="commandFather"
                    ></scripts-execpython>
                    <scripts-execjs 
                        v-else-if="commandData.father === 'execJs'" 
                        v-bind:command-data="copyCommand" 
                        v-bind:command-father="commandFather"
                    ></scripts-execjs>

                    <div v-else-if="commandData && commandData.father == 'execRocketBotDB'" class="form-group">
                        <label for="botSelect">{{ commandFather.title_command}}</label>

                        <select2 id="botSelect" :options="options" :inits="copyCommand.command" v-model="copyCommand.command">
                            <option disabled value="0">Select one</option>
                        </select2>
                        
                    </div>

                    <scripts-rocketbotExpose 
                        v-else-if="commandData && commandData.father == 'execRocketBotDBExpose'" 
                        v-bind:command-data="copyCommand" 
                        v-bind:command-father="commandFather" 
                        v-bind:options="options"
                        v-bind:bots="bots"
                    ></scripts-rocketbotExpose>
                    <excel-readxlsx v-else-if="commandData.father == 'readxlsx'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></excel-readxlsx>
                    <excel-savexlsx v-else-if="commandData.father === 'savexlsx' && commandData.group === 'excel'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></excel-savexlsx>
                    <system-startapp v-else-if="commandData.father == 'startapp'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></system-startapp>
                    <logic v-else-if="commandData.group == 'logic'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></logic>   
                    
                    <generic-command v-else v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></generic-command>

                 
                </div>
            </div>
            <div class="modal-footer">
            <div class="stop-bot-error row">
                    
                    <div class="col-6">
                        <div class="form-group">
                            <div class="form-check " style="margin-top: 0px; ">
                                <input type="checkbox" class="form-check-input" v-model="copyCommand.run_onerror" >
                                <label class="form-check-label text-danger" >Error Handling: <span class="text-black">Run Robot</span></label>
                            </div>
                            <div v-show="copyCommand.run_onerror">
                            <select2  :options="options" :inits="robot_error" v-model="copyCommand.run_onerror_robot">
                                <option disabled value="0">Select one</option>
                            </select2>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-check " style="margin-top: 0px; ">
                            <input type="checkbox" class="form-check-input" v-model="copyCommand.stop_onerror" >
                            <label class="form-check-label text-danger" >Error Handling: Stop all</label>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary" @click='close'>{{app.texts.cancel}}</button>
                <button type="button" class="btn btn-primary" @click='save' >{{app.texts.add_command}}</button>
            </div>
        </div>
    </div>
</div> 
           </div>     
    `,
    props:['editingCommand', 'bots'],
    mounted: function(){

        const that = this
        $('#modal-edit').on('hide.bs.modal', function (e) {
            that.commandModified = null;
            that.commandFather = {};
            that.commandData = {};
            that.copyCommand = {};
            that.options = [];
            that.robot_error = '';
            that.legacy_command = true;
            app.removeEditedCommand();
          })
    },
    data: function (){
        return {
           
            commandModified: null,
            editableCodeMirror: null,
            commandFather :  {},
            commandData :  {},
            copyCommand : {},
            options : [],
            edit_description : false,
            robot_error:'',
            legacy_command: true,
            legacy_commands: ['use', 'waitforobject', 'for', 'execRocketBotDB', 'readxlsx', 'evaluateIf',"evaluatewhile", 'startapp','clickimage'],
            commands_replace_brackets: ['setVar', 'getsheets', 'getrows', 'getcols'],
            commandsToJson: [
                'use', 
                'waitforobject', 
                'openbrowser',  
                'readxlsx',
                'module',
                'for',
                'startapp', 
                'getimage', 
                'savedatafile', 
                'movefile', 
                'copyfile', 
                'deletefile', 
                'zipfile', 
                'unzipfile',
                'pdftext',
                'execRocketBotDBExpose',
                'connect',
                'query',
                'configemail',
                'sendemail',
                'reademail',
                'request'
            ],
            commands_command_is_var: ['getsheets', 'getrows', 'getcols'],
            commandsWithoutInputs: ['stop'],
            groupToJson:['virtual']
        }
    },
    
    watch: {
        'editingCommand': function(newVal, oldVal){
            if (newVal) {
                this.edit_description = false;
                let commandInCommand = getCommandById(app.$data.bot.project.commands,newVal)
                if (!commandInCommand) {
                    commandInCommand = {
                        "id": actual_node.data.id,
                        "command": actual_node.data.command,
                        "father": actual_node.name,
                        "group": actual_node.class === 'logical' ? 'logic' : actual_node.class,
                        "children": [],
                        "else": [],
                        "disabled": false,
                        "option": actual_node.data.option,
                        "var": actual_node.data?.var,
                        "setvar": actual_node.data?.setvar,
                        "getvar": actual_node.data?.getvar,
                        "result": actual_node.data?.result,
                        "run_onerror": actual_node.data?.run_onerror,
                        "run_onerror_robot": actual_node.data?.run_onerror_robot,
                        "stop_onerror": actual_node.data?.stop_onerror,
                        "extra_data": actual_node.data?.extra_data
                    }
                }
                var originalCommand = JSON.parse(JSON.stringify(commandInCommand));
                this.commandData = originalCommand;
                if (originalCommand.father == 'module' && originalCommand.group == 'scripts') {
                    this.commandFather = app.getFatherData(originalCommand.father, originalCommand.group, originalCommand.command);
                }else{
                    this.commandFather = app.getFatherData(originalCommand.father, originalCommand.group, originalCommand);
                }
                this.copyCommand = JSON.parse(JSON.stringify(originalCommand));
                app.$data.command_editing = this.copyCommand;
                this.options = app.bots.map(function(b){
                    return {
                        id: b.name,
                        text: b.name
                    }
                })
                this.robot_error = this.copyCommand.run_onerror_robot;
                this.legacy_command = !this.legacy_commands.includes(this.commandData.father)            
            }
        }
    },
    methods: {
        'onChange': function(e){
            console.log(e)
        },
        //TODO: DSP VA A TENER VARIOS IDIOMAS
        'commandTitle': function(command){
            return command.title?.en  || command.title
        },
        'getCommandTitle': function(command) {
            if (this.commandHasTitleAsAString(command)) {
              return command.title
            } else if (this.commandHasTitleAsAnObject(command)) {
              if ('en' in command.title) {
                return command.title.en
              } 
            } else if ('en' in command) {
              return command.en.title
            }
          },
          'commandHasTitleAsAnObject': function(command) {
            return 'title' in command && typeof command.title !== 'string'
          },
          'commandHasTitleAsAString': function(command) {
            return 'title' in command && typeof command.title === 'string'
          },
          'close': function() {
            app.closeModal()
          },
        'save': function(){
            $("#command_"+this.copyCommand.id).attr("data-content", this.copyCommand.description);
            if(this.commandFather.father == 'execScriptPython' || this.commandFather.father == 'execJs'){
                this.copyCommand.command = editableCodeMirror.getValue()
            }
            // if (this.commandFather.father === 'setcell') {
            //     this.copyCommand.command = this.copyCommand.text + '='
            // }
            if (('form' in this.commandFather && !['trycatch'].includes(this.commandData.father) && 'remove_vars' in this.copyCommand)) {
                this.copyCommand.remove_vars.forEach((id) => {
                    if (id in this.copyCommand.command && this.copyCommand.command[id] !== 'iframe') {
                    
                        this.copyCommand.command[id] = this.copyCommand.command[id].replace('{', '').replace('}', '')
                    }
                }) 
                delete this.copyCommand.remove_vars
            }
            if (this.copyCommand.getvar) {
                this.copyCommand.getvar = this.copyCommand.getvar.replace('{', '').replace('}', '')
            }
            if (this.commands_replace_brackets.includes(this.commandFather.father)) {
                this.copyCommand.var = this.copyCommand.var.replace('{', '').replace('}', '')
            }
            if ((this.commandFather.setVar || this.commands_command_is_var.includes(this.commandFather.father)) && this.copyCommand.var) {
                this.copyCommand.command = this.copyCommand.var
            } 
            if (this.commandsWithoutInputs.includes(this.commandFather.father)) {
                this.copyCommand.command = ''
            }
            let c = JSON.parse(JSON.stringify(this.copyCommand))
			// if not is string
            if(
                (this.commandsToJson.includes(this.commandFather.father) || 
                this.groupToJson.includes(this.commandFather.group) || 
                this.commandFather.form) && typeof c.command == 'object'
                ){
                    c.command = JSON.stringify(c.command);                      
            }
            if(this.commandFather.group == 'virtual'){
                c["data_"] = JSON.parse(c.command)
            }
            console.log("🚀 ~ file: editcommand.js ~ line 160 ~ c", c)
            if(this.groupToJson.includes(this.commandFather.group)){
                document.querySelector("#command_"+c.id+" > div.icon-container-img").style.backgroundImage = "url(" + c.extra_data + ")"
            }
            app.setCommand(c);
            if(c.command){
                try{
                    document.getElementById("no_edited_" + c.id).style.display = "none";
                }catch(e){}
            }
            app.closeModal();
        }
    }
})

Vue.component('modal-delete', {
    template:`
    <div>
    <div class="modal fade" id="modal-delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Delete Command</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h3> 
                    <img style="width: 28px;float: left;" v-bind:src="commandFather.icon||''">  {{ commandFather.title?.en  || commandFather.title }} 
                </h3>
                
                
                <p> <i class="fas fa-question-circle"></i> {{ commandFather?.en?.description|| commandFather.description?.en ||  commandFather.description }}</p>
                <div class="container">
                    
                    <web-use  v-if="commandData && commandData.father == 'use'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></web-use>
                    <web-waitforobject v-if="commandData && commandData.father == 'waitforobject'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></web-waitforobject>
                    <system-setvar v-if="commandData && commandData.father == 'setVar'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></system-setvar>

                    <div v-if="commandData && commandData.father == 'execRocketBotDB'" class="form-group">
                            <label for="exampleFormControlSelect1">{{ commandFather.title_command}}</label>

                            <select2  :options="options" :inits="copyCommand.command" v-model="copyCommand.command">
                                <option disabled value="0">Select one</option>
                            </select2>
                    </div>
                    <div  v-if="commandData && (commandFather.command_available || commandFather.setVar) && legacy_command && commandData.father != 'setVar'" class="form-group">
                        <label for="exampleFormControlSelect1">{{ commandFather.title_command}}</label>
                        <input type="text" class="form-control" v-model="copyCommand.command">
                    </div>
                   
                    <div  v-if="commandFather.getResult " class="form-group">
                        <label >{{ app.texts.assign_result }}</label>
                        <input type="text" class="form-control" v-model="copyCommand.getvar">
                    </div>
                    
                    <div v-show="commandFather.options && commandFather.command_available && legacy_command && commandData.father != 'setVar'" class="form-group">
                        <label>{{commandFather.title_options}}</label>
                        <select class="form-control" id="command_list_op" v-model="copyCommand.option">
                            <option name="" value="">-- Seleccione --</option>
                            <option v-for="option in commandFather.options" v-bind:value="option">{{option}}</option>
                        </select>
                    </div>
                    <excel-readxlsx v-if="commandData && commandData.father == 'readxlsx'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></excel-readxlsx>



                    <logic v-if="commandData && commandData.group == 'logic'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></logic>
                    <modules v-if="commandData && commandData.father == 'module'" v-bind:command-data="copyCommand" v-bind:command-father="commandFather"></modules>

                   <!-- {{ commandData }}
                    <hr>
                    {{ commandFather }}
                    <hr>
                    {{legacy_command}}-->
                </div>
            </div>
            <div class="modal-footer">
            <div class="stop-bot-error row">
                    
                    <div class="col-6">
                        <div class="form-group">
                            <div class="form-check " style="margin-top: 0px; ">
                                <input type="checkbox" class="form-check-input" v-model="copyCommand.run_onerror" >
                                <label class="form-check-label text-danger" >Error Handling: <span class="text-black">Run Robot</span></label>
                            </div>
                            <div v-show="copyCommand.run_onerror">
                            <select2  :options="options" :inits="robot_error" v-model="copyCommand.run_onerror_robot">
                                <option disabled value="0">Select one</option>
                            </select2>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-check " style="margin-top: 0px; ">
                            <input type="checkbox" class="form-check-input" v-model="copyCommand.stop_onerror" >
                            <label class="form-check-label text-danger" >Error Handling: Stop all</label>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{app.texts.cancel}}</button>
                <button type="button" class="btn btn-primary" @click='save' >{{app.texts.add_command}}</button>
            </div>
        </div>
    </div>
</div> 
           </div>     
    `,
    props:['editingCommand'],
    mounted: function(){
        
    },
    data: function (){
        return {
            commandFather :  {},
            commandData :  {},
            copyCommand : {},
            options : [],
            robot_error:'',
            legacy_command: true,
            legacy_commands: ['use', 'waitforobject', 'for', 'execRocketBotDB', 'readxlsx', 'evaluateIf'],
            commandsToJson: ['use', 'openbrowser',  'readxlsx','module','for'],
        }
    },
    watch: {
        'editingCommand': function(newVal, oldVal){
            // var vv = getCommandById(app.$data.bot.project.commands,newVal )
            // this.commandData= vv;
            // if (vv.father == 'module' && vv.group == 'scripts') {
            //     this.commandFather= app.getFatherData(vv.father, vv.group, vv.command);
            // }else{
            //     this.commandFather= app.getFatherData(vv.father, vv.group, vv);
            // }
            // this.copyCommand = JSON.parse(JSON.stringify(vv));
            // this.options = app.bots.map(function(b){
            //     return {
            //         id: b.name,
            //         text: b.name
            //     }
            // })
            // this.robot_error = this.copyCommand.run_onerror_robot;
            // this.legacy_command = !this.legacy_commands.includes(this.commandData.father)
        }
    },
    methods: {
        'save': function(){
            let c = JSON.parse(JSON.stringify(this.copyCommand))
            if(this.commandsToJson.includes(this.commandFather.father)){
                    c.command = JSON.stringify(c.command);  
            }
            app.setCommand(c);
            $("#modal-edit").modal('hide');
        }
    }
})