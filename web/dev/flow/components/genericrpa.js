Vue.component('generic-command', {
    template:`
    <div class="row" v-if="commandFather.father==='countwindow'">
        <div class="col-md-12">
            <div class="form-group">
                <label>{{app.texts.assign_result}}</label>
                <input 
                    style="{{input.style}}" 
                    class="form-control accept_vars" 
                    type="text"
                    v-model.lazy="command.command" 
                    :placeholder="'{variable}'"
                >
            </div>
        </div>
    </div>
    <div class="row" v-else-if="commandFather.setVar">
        <div class="col">
            <div class="form-group">
                <label>{{app.texts.assign_result}}</label>
                    <input 
                        style="{{input.style}}" 
                        class="form-control accept_vars" 
                        type="text"
                        v-model.lazy="command.var" 
                        :placeholder="'{variable}'"
                    >
            </div>
        </div>
    </div>  
    <div class="row" v-else-if="commandFather.getResult">
    <div class="col-12">
            <div class="form-group">
                <label>{{commandFather.title_command}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model.lazy="command.command" 
                >
            </div>
        </div>

        <div v-if="commandFather.father !== 'getclipboard'" class="col-12">
            <div class="form-group">
                <label>{{commandFather.title_options}}</label>
                <select class="form-control" v-model.lazy="command.option">
                    <option v-for="item in commandFather.options" :value="item">{{item}}</option>
                </select>
            </div>
        </div>

        <div class="col-12">
            <div class="form-group">
                <label>{{app.texts.assign_result}}</label>
                <input 
                    style="{{input.style}}" 
                    class="form-control accept_vars" 
                    type="text"
                    v-model.lazy="command.getvar" 
                    :placeholder="'{variable}'"
                >
            </div>
        </div>

    </div>
    
    <div v-else>
        <div class="row" v-if="commandFather.title_command && commandFather.command_available">
            <div class="col" v-if="commandFather.file">
                <div class="form-group">
                    <label>{{commandFather.title_command}}</label>
                    <div class="input-group">
                        <input 
                            class="form-control accept_vars"
                            autocomplete="off" 
                            type="text" 
                            :id="'file'"
                            v-model.lazy="command.command"
                        >
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" @click="searchFile()">
                            <i class="fa fa-spin fa-spinner" v-show="loading"></i>
                            {{app.texts.search}}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col" v-else>
                <div class="form-group">
                    <label>{{commandFather.title_command}}</label>
                    <input 
                        style="{{input.style}}" 
                        class="form-control accept_vars" 
                        type="text"
                        v-model.lazy="command.command" 
                        :description="commandFather.help"
                    >
                    <small class="text-helper" v-if="commandFather.help">
                        {{commandFather.help}}
                    </small>
                </div>
            </div>
        </div>
        <div class="row" v-if="modalHasOptions()">
            <div class="col">
                <label>{{commandFather.title_options}}</label>
                <select class="form-control" v-model.lazy="command.option">
                    <option v-for="item in commandFather.options" :value="item">{{item}}</option>
                </select>
            </div> 
        </div> 
    </div>

    `,
    props:['commandData', 'commandFather'],
    data() {
        return {
            loading: false
        }
    },
    mounted: function() {
    },
    computed:{
        command: function(){
            var command = this.commandData
            if(!command.command){
                command.command = ''              
            }
            return command;
        }
    },
    methods: {
        modalHasOptions () {
            return this.commandFather.options && this.commandFather.options.length > 0
          },
        searchFile(id, extensions){
            this.loading = true
            app.searchFile(null,extensions).then((ret)=>{
                this.$set(this.command, 'command', ret)
                this.loading = false
            })
        }
    }
})




