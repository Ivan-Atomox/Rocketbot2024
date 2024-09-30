Vue.component('mysql-connect', {
    template:`
<div class="container">
    <div class="row">
       <div class="col-md-8">
            <div class="form-group">
                <label>{{app.texts.server_config_title}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.host" 
                >
            </div>
       </div> 
       <div class="col-md-4">
            <div class="form-group">
                <label>{{app.texts.port}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.port" 
                >
            </div>
       </div> 
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{app.texts.database}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.database" 
                >
            </div>
        </div>  
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label>{{app.texts.user}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.user" 
                >
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label>{{app.texts.password}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.password" 
                >
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label>{{app.texts.assign_result}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    placeholder="{variable}"
                    v-model.lazy="command.getvar" 
                >
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label>ID</label>
                <input
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.identificator" 
                >
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
                    host: '',
                    port: '3306',
                    database: '',
                    user: '',
                    password: ''
                }
            }
            return command;
        }
    }
})
Vue.component('mysql-query', {
    template:`
<div class="container">
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{commandFather.title_command}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.query" 
                >
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{app.texts.assign_result}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    placeholder="{variable}"
                    v-model.lazy="command.getvar" 
                >
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

            } else {
                command.command = {                    
                    query: '',
                }
            }
            return command;
        }
    }
})