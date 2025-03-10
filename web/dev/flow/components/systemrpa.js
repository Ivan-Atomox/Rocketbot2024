Vue.component('system-setvar', {
    template:`
<div class="system-setvar ">
    <div  class="form-group">
        <label >{{ commandFather.title_command}}</label>
        
        <input type="text" class="form-control accept_vars" v-model.lazy="command.command">
        <!--<small>Filtrar lista</small> - <small>Trabajar con fechas</small>-->
       
    </div>
    <div class="form-group">
        <label >{{ app.texts.assign_result }}</label>
        <input type="text" autocomplete="off" class="form-control accept_vars" v-model.lazy="command.var" placeholder='{variable}'>
    </div>
</div>
    `,
    props:['commandData', 'commandFather'],
  
    mounted: function () {
    },
    computed:{
        command: function(){
            var command = this.commandData
            
            return command;
        }
    },
   
})

Vue.component('system-startapp', {
    template:`
<div class="system-setvar ">
    <div  class="form-group">
        <label >{{ commandFather.title_command}}</label>
        <div class="input-group">
            <input class="form-control accept_vars" id="modal_syustem_startapp" type="text" v-model.lazy="command.command.path" >
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchFileM()">
                    <i class="fa fa-spin fa-spinner" v-show="app.file_loading"></i> {{app.texts.search}}
                </button>
            </div>
        </div>
    </div>
    <div  class="form-group">
        <label >{{app.texts.synchronous}} / {{app.texts.asynchronous}}</label>
       <select class="form-control" v-model.lazy="command.command.tipo">
        <option value="0">{{app.texts.synchronous}}</option>
        <option value="1">{{app.texts.asynchronous}}</option>

       </select>
        <small class="text-muted" v-html="app.texts.app_synchro_help"></small>
       
    </div>
    <div class="form-group">
        <label >{{ app.texts.assign_result }}</label>
        <input type="text" class="form-control accept_vars" placeholder='{variable}' v-model.lazy="command.getvar">
    </div>
</div>
    `,
    props:['commandData', 'commandFather'],
    data() {
        return {
            loading:false
        }
    },
    methods: {
        searchFileM(){
            this.loading = true
             app.searchFile(null, "*").then((e)=>{
                this.$set(this.command.command, 'path', e)    
                this.loading = false              
            })
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
                    path: '',
                    tipo: '',
                }
            }
            return command;
        }
    }
})
