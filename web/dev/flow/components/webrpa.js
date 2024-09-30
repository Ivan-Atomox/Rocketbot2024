Vue.component('web-use', {
    template:`
<div class="web-use row">
    <div class="col-md-6">
        <div class="form-group md-12">
            <label class="ng-binding">{{app.texts.select_navigator}}:</label>
            <select class="form-control" id="command_list_op" v-model.lazy="command.option">
                <option  >-- Select --</option>
                <option label="chrome" value="chrome" >chrome</option>
                <option label="firefox" value="firefox">firefox</option>
                <option label="ie" value="ie">ie</option>
                <option label="safari" value="safari">safari</option>
            </select>
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group ">
            <label for="web-use-url">{{app.texts.server_config_title}}:</label>
            <input type="text" v-model.lazy="command.command.url" autocomplete="off" class="form-control" id="web-use-url" placeholder="https://rocketbot.co">
            <small id="emailHelp" class="form-text text-muted">{{app.texts.url_help}}</small>
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group">
            <label for="web-use-iddriver"><small><b>* Optional</b></small> {{app.texts.identifier}}:</label>
            <input autocomplete="off" type="text" v-model.lazy="command.command.id_driver" class="form-control md-6" id="web-use-iddriver" placeholder="default">
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group">
            <label for="web-use-profile"><small><b>* Optional</b></small> {{app.texts.profile}}:</label>
            <div class="input-group">
              <input 
                id="web-use-profile" 
                class="form-control" 
                type="text" 
                v-model.lazy="command.command.profile" 
                :placeholder="app.texts.profile"
                autocomplete="off"
              >
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchFolder('profile')"><i
                class="fa fa-spin fa-spinner" v-show="loading"></i>
                {{app.texts.search}}</button>
              </div>
            </div>
            <small id="emailHelp" class="form-text text-muted">{{app.texts.profile_help}}</small>
        </div>
    </div>
</div>
    `,
    props:['commandData', 'commandFather'],
    data () {
      return {
        loading:false
      }
    },
    computed:{
        command: function(){
            var command = this.commandData
            if(command.command){
                
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                }                
            }else{
                
                command.command = {
                    url: '',
                    id_driver: '',
                    profile: '',
                    option: ''
                }
            }
            return command;
        }
    },
    methods: {
      searchFolder(id){
        app.searchFolder(null).then((ret)=>{
          this.$set(this.command.command, id, ret)
        })
      }
    }
})
Vue.component('web-getimage', {
    template:`
<div class="container">
  <div class="row">

      <div class="col-md-3">
        <div class="form-group">
          <label>{{commandFather.title_options}}</label>
          <select class="form-control" v-model.lazy="command.option">
            <option v-for="item in commandFather.options" :value="item">{{item}}</option>
          </select>
        </div>
      </div>

      <div class="col-md-9">
        <div class="form-group">
          <label>{{commandFather.title_command_1}}</label>
          <input 
            class="form-control accept_vars" 
            type="text"
            v-model.lazy="command.command.search" 
          >
        </div>
      </div>

  </div>
  <div class="row">
    <div class="col">
      <div class="form-group">
        <label>{{app.texts.path}}</label>
        <div class="input-group">
          <input 
            class="form-control accept_vars"
            autocomplete="off" 
            type="text" 
            v-model.lazy="command.command.pathfile"
          >
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchFileSave('pathfile', commandFather.extensions, commandFather.default_extension)">
            <i class="fa fa-spin fa-spinner" v-show="loading"></i>
            {{app.texts.search}}</button>
          </div>
        </div>         
      </div>
    </div>
  </div>
</div>

    `,
    props:['commandData', 'commandFather'],
    data () {
      return {
        loading:false
      }
    },
    computed:{
        command: function(){
            var command = this.commandData
            if(command.command){
                
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                }                
            }else{
                
                command.command = {
                    search: '',
                    pathfile: ''
                }
            }
            return command;
        }
    },
    methods: {
      searchFileSave(id, extensions, default_extension){
        this.loading = true
        app.searchFileSave(null, extensions, default_extension).then((ret)=>{
            this.$set(this.command.command, id, ret)
            this.loading = false
        })
      },
      searchFolder(id){
        app.searchFolder(null).then((ret)=>{
          this.$set(this.command.command, id, ret)
        })
      }
    }
})

Vue.component('web-waitforobject', {
    template:`
<div class="web-waitforobject">
<div class="row">
<div class="col-9">
  <div class="form-group">
    <label>{{app.texts.data_search}}:</label>
    <input class="form-control accept_vars" type="text" v-model.lazy="command.command.object">
  </div>
</div>

<div class="col-3">
  <div class="form-group">
    <label>{{app.texts.data_type}}:</label>
    <select class="form-control" v-model.lazy="command.option">
      <option name="" value="">-- Seleccione --</option>
      <option v-for="x in commandFather.options" :value="x">{{x}}</option>
    </select>
  </div>
</div>
<div class="col-3">
  <div class="form-group">
    <label>{{app.texts.wait}} {{app.texts.before}}:</label>
    <div class="input-group">
      <input class="form-control accept_vars" type="text" v-model.lazy="command.command.before">
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">{{app.texts.seconds}} <i
            class="fa fa-hourglass-start "> </i></span>
      </div>
    </div>
  </div>
</div>

<div class="col-6">
  <div class="form-group">
          <label>{{app.texts.action}} {{app.texts.and}} {{app.texts.wait}} {{app.texts.max}}:</label>

    <div class="input-group">

      <div class="input-group-prepend">

      <select class="form-control" v-model.lazy="command.command.wait_for">
        <option value="present">Present</option>
        <option value="visible">Visible</option>
        <option value="not_visible">Not Visible</option>
        <option value="clickable">Clickable</option>

      </select>
      </div>
      <input class="form-control accept_vars" type="text" v-model.lazy="command.command.wait_time">
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">{{app.texts.seconds}} <i
            class="fa fa-hourglass-half "></i></span>
      </div>
    </div>
  </div>
</div>
<div class="col-3">
  <div class="form-group">
    <label>{{app.texts.wait}} {{app.texts.after}}:</label>
    <div class="input-group">
      <input class="form-control accept_vars" type="text" v-model.lazy="command.command.after">
      <div class="input-group-append">
        <span class="input-group-text" id="basic-addon2">{{app.texts.seconds}} <i
            class="fa fa-hourglass-end "></i></span>
      </div>
    </div>
  </div>
</div>
<div class="col-12">
   
    <div class="form-group">
      <label>{{app.texts.assign_result}}</label>
      <input class="form-control accept_vars" type="text" v-model.lazy="command.getvar"
        placeholder="{variable}">
    </div>

</div>
</div>
</div>
    `,
    props:['commandData', 'commandFather'],
    
    computed:{
        command: function(){
            var command = this.commandData
            if(command.command){
                
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                }                
            }else{
                
                command.command = {
                    object: '',
                    wait_for: '',
                    wait_time: '',
                    after: ''
                }
            }
            return command;
        }
    }
})