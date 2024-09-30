Vue.component('excel-readxlsx', {
    template:`
<div class="excel-readxlsx row">
    <div class="col-md-12">
        <div class="form-group">
            <label>{{app.texts.path}}:</label>
            <div class="input-group">
                <input class="form-control accept_vars" id="modal_archivos_file_name_xlsx" type="text"
                    v-model.lazy="command.command.file_path">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchFile()"><i
                            class="fa fa-spin fa-spinner" v-show="app.file_loading"></i>
                        {{app.texts.search}}</button>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="form-group">
            <label>{{app.texts.assign_result}}:</label>
            <input class="form-control accept_vars" type="text" v-model.lazy="command.getvar">
        </div>
    </div>

    <div class="col-md-6">
        <div class="form-group">
            <label>Id:</label>
            <input class="form-control accept_vars" type="text" v-model.lazy="command.command.identificator"
                placeholder="default">
        </div>
    </div>
</div>
    `,
    props:['commandData', 'commandFather'],
    methods: {
        searchFile(id, extensions){
            app.searchFile(null,app.extensions.xlsx).then((ret)=>{
                this.command.command.file_path = ret
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
                    file_path: '',
                    identificator: '',
                }
            }
            return command;
        }
    }
})
Vue.component('excel-savexlsx', {
    template:`
<div class="container">
    <div class="row">
        <div class="col">

            <div class="form-group">
                <label>{{commandFather.title_command}}</label>
                <div class="input-group">
                    <input 
                        class="form-control accept_vars" 
                        type="text" 
                        v-model.lazy="command.command"
                    >
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchFileSave('', commandFather.extensions, commandFather.default_extension)"><i
                        class="fa fa-spin fa-spinner" v-show="loading"></i>
                        {{app.texts.search}}</button>
                    </div>
                </div>
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
    methods: {
        searchFileSave(id, extensions, default_extension){
            this.loading = true
            app.searchFileSave(null, extensions, default_extension).then((ret)=>{
                this.$set(this.command, 'command', ret)
                this.loading = false
            })
        },
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
