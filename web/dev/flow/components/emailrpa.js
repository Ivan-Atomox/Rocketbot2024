Vue.component('email-configure', {
    template:`
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label>{{app.texts.server + 'SMTP'}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.smtp" 
                >
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>{{app.texts.port + 'SMTP'}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.smtp_port" 
                >
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group form-check">
                <input
                    type="checkbox" 
                    class="form-check-input" 
                    v-model.lazy="command.command.ssl"
                >
                <label>SMTP SSL</label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label>{{app.texts.server + 'IMAP'}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.imap" 
                >
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group">
                <label>{{app.texts.port + 'IMAP'}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.imap_port" 
                >
            </div>
        </div>
        <div class="col-md-3">
            <div class="form-group form-check">
                <input
                    type="checkbox" 
                    class="form-check-input" 
                    v-model.lazy="command.command.imap_ssl"
                >
                <label>IMAP SSL</label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label>{{app.texts.user}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.user" 
                >
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label>{{app.texts.password}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.pass" 
                >
            </div>
        </div>
        <div class="col-md-4">
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
                    smtp: 'smtp.gmail.com',
                    smtp_port: 465,
                    imap: 'imap.gmail.com',
                    imap_port: 993,
                    ssl: true,
                    imap_ssl: true,
                    user: '',
                    pass: ''
                }
            }
            return command;
        }
    },
    methods: {
        changeCheckbox (id) {
            if (this.command.command[id] === false) {
                delete this.command.command[id]
            }
        }
    }
})
Vue.component('email-send', {
    template:`
<div class="container">
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{app.texts.to}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.to" 
                >
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{app.texts.subject}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.subject" 
                >
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{app.texts.message}}</label>
                <textarea 
                    class="form-control" 
                    v-model.lazy="command.command.msg" 
                ></textarea>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{app.texts.attachment}}</label>
                <div class="input-group">
                    <input 
                        class="form-control accept_vars"
                        autocomplete="off" 
                        type="text" 
                        v-model.lazy="command.command.file"
                    >
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchFile('file', commandFather.extensions)">
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
            loading: false
        }
    },
    computed:{
        command: function(){
            var command = this.commandData
            if(command.command){
                
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                } 

            } else {
                command.command = {                    
                    to: '',
                    smtp_port: 465,
                    subject: '',
                    msg: '',
                    file: ''
                }
            }
            return command;
        }
    },
    methods: {
        searchFile(id, extensions){
            this.loading = true
            app.searchFile(null,extensions).then((ret)=>{
                this.$set(this.command.command, id, ret)
                this.loading = false
            })
            
        }
    }
})
Vue.component('email-getallemail', {
    template:`
<div class="container">
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{commandFather.title_command}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model.lazy="command.command" 
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
    data () {
        return {
            loading: false
        }
    },
    computed:{
        command: function(){
            var command = this.commandData
            if(!command.command){
                command.command = ''              
            }
            return command;
        },
        
    }
})
Vue.component('email-read', {
    template:`
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label>{{commandFather.title_command}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.id" 
                >
            </div>
        </div>
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
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{commandFather.title_command_2}}</label>
                <div class="input-group">
                    <input 
                        class="form-control accept_vars" 
                        type="text" 
                        v-model.lazy="command.command.file"
                    >
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchFolder('file')"><i
                            class="fa fa-spin fa-spinner" v-show="loading"></i>
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
            loading: false
        }
    },
    computed:{
        command: function(){
            var command = this.commandData
            if(command.command){
                
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                } 

            } else {
                command.command = {                    
                    id: '',
                    file: ''
                }
            }
            return command;
        }
        
    },
    methods: {
        searchFolder(id){
            this.loading = true
            app.searchFolder(null).then((ret)=>{
                this.$set(this.command.command, id, ret)
                this.loading = false
            })
        }
    }
})