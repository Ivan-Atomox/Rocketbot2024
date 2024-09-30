Vue.component('scripts-execpython', {
    template:`
    <div class="row">
    <div class="col-md-12">
        <div class="form-group">
            <label>{{ commandFather.title_command}}:</label>
            <textarea class="form-control accept_vars"  type="text" id="code_edit_python" v-model.lazy="command.command"></textarea>
        </div>
    </div>
    </div>
    `,
    props:['commandData', 'commandFather'],
    watch: {
        'commandData': function(newVal, oldVal){
            editableCodeMirror.setValue(newVal.command)
            editableCodeMirror.setCursor(0)
            editableCodeMirror.refresh()
            
        }
    },
    mounted: function () {
               
        editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('code_edit_python'), {
            mode: "python",
            theme: "material",
            lineNumbers: true,
            smartIndent: true,
            autocorrect: true,
            hint: CodeMirror.hint.python
        }); 
        
        editableCodeMirror.setCursor(0)
        editableCodeMirror.refresh()
        

        $("#modal-edit").on('shown.bs.modal', function () {
          if(editableCodeMirror){
            editableCodeMirror.refresh()
          }
        })
    },
    computed:{
        command: function(){
            var command = this.commandData
            
            return command;
        },
        
    }
})
Vue.component('scripts-execjs', {
    template:`

<div class="container">

    <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <label>{{ commandFather.title_command}}:</label>
                <textarea class="form-control accept_vars"  type="text" id="code_edit_js" v-model.lazy="command.command"></textarea>
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
                    v-model.lazy="command.getvar" 
                    :placeholder="'{variable}'"
                >
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label>{{app.texts.title_options}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model.lazy="command.option" 
                    :placeholder="'latin-1'"
                >
            </div>
        </div>
    </div>

</div>

    `,
    props:['commandData', 'commandFather'],
    watch: {
        'commandData': function(newVal, oldVal){
            editableCodeMirror.setValue(newVal.command)
            editableCodeMirror.setCursor(0)
            editableCodeMirror.refresh()
            
        }
    },
    mounted: function () {
               
        editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('code_edit_js'), {
            mode: "javascript",
            theme: "material",
            lineNumbers: true,
            smartIndent: true,
            autocorrect: true,
            hint: CodeMirror.hint.js
        }); 
        
        editableCodeMirror.setCursor(0)
        editableCodeMirror.refresh()
        

        $("#modal-edit").on('shown.bs.modal', function () {
          if(editableCodeMirror){
            editableCodeMirror.refresh()
          }
        })
    },
    computed:{
        command: function(){
            var command = this.commandData
            
            return command;
        },
        
    }
})
Vue.component('scripts-rocketbotExpose', {
    template:`

<div class="container">
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{commandFather.title_command}}</label>
                <select class="form-control" v-model="command.command.robot">
                    <option v-for="item in options" :value="item.id">{{item.id}}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="row" v-if="selectedBotHasExposed">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-12">
                    <h5>{{getExposedTitle(selectedBot.exposed)}}</h5>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="alert alert-secondary" role="alert">
                        {{getExposedDescription(selectedBot.exposed)}}
                    </div>
                </div>
            </div>
            <div class="row">
                <div v-for="input in selectedBot.exposed.form" :key="input.id" :class="input.css">
            
                    <div class="form-group" v-if="input.type=='input'">
                        <label>{{setInputTitle(input)}}</label>
                        <input 
                            style="{{input.style}}" 
                            class="form-control accept_vars" 
                            type="text"
                            :placeholder="setInputPlaceholder(input)"
                            v-model="command.command.vars[input.id]"
                        >
                        <small class="text-helper" v-if="input.help">
                            {{setInputHelp(input)}}
                        </small>
                    </div>

                    <div class="form-group" v-if="input.type=='select'">
                        <label>{{setInputTitle(input)}}</label>
                        <select style="{{input.style}}" class="form-control" v-model="command.command.vars[input.id]">
                            <option v-for="item in input.options" :value="item">{{item}}</option>
                        </select>
                        <small class="text-helper"  v-if="input.help">
                            {{setInputHelp(input)}}
                        </small>
                    </div>

                    <div class="form-group" v-if="input.type=='textarea'">
                        <label>{{setInputTitle(input)}}</label>
                        <textarea 
                            style="{{input.style}}"  
                            class="form-control" 
                            :id="input.id" 
                            :placeholder="setInputPlaceholder(input)"
                            v-model="command.command.vars[input.id]"
                        ></textarea>
                        <small class="text-helper"  v-if="input.help">
                            {{setInputHelp(input)}}
                        </small>
                    </div>

                    <div class="form-group form-check" v-if="input.type=='checkbox'">
                        <input style="{{input.style}}" 
                            :id="input.id" 
                            type="checkbox" 
                            class="form-check-input"
                            v-model="command.command.vars[input.id]" 
                        >
                        <label>{{setInputTitle(input)}}</label>
                        <small class="text-helper"  v-if="input.help">
                            {{setInputHelp(input)}}
                        </small>
                    </div>

                    <div class="form-group" v-if="input.type=='file_select'">
                        <label>{{setInputTitle(input)}}</label>
                        <div class="input-group">
                            <input 
                                class="form-control accept_vars"
                                autocomplete="off" 
                                type="text" 
                                :id="input.id"
                                :placeholder="setInputPlaceholder(input)"
                                v-model="command.command.vars[input.id]"
                            >
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" @click="searchFile(input.id, input.extensions)">
                                <i class="fa fa-spin fa-spinner" v-show="loading"></i>
                                {{app.texts.search}}</button>
                            </div>
                        </div>         
                        <small class="text-helper"  v-if="input.help">
                            {{setInputHelp(input)}}
                        </small>
                    </div>

                    <div class="form-group" v-if="input.type=='file_new'">
                        <label>{{setInputTitle(input)}}</label>
                        <div class="input-group">
                            <input 
                                class="form-control accept_vars" 
                                type="text" 
                                :id="input.id"
                                :placeholder="setInputPlaceholder(input)"
                                v-model="command.command.vars[input.id]"
                            >
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" @click="searchFileSave(input.id, input.extensions, input.default_extension)"><i
                                class="fa fa-spin fa-spinner" v-show="loading"></i>
                                {{app.texts.search}}</button>
                            </div>
                        </div>
                        <small class="text-helper"  v-if="input.help">
                            {{setInputHelp(input)}}
                        </small>
                    </div>


                    <div class="form-group" v-if="input.type=='folder_select'">
                        <label>{{setInputTitle(input)}}</label>
                        <div class="input-group">
                            <input 
                                class="form-control accept_vars" 
                                type="text" 
                                :id="input.id"
                                :placeholder="setInputPlaceholder(input)"
                                v-model="command.command.vars[input.id]"
                            >
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" @click="searchFolder(input.id)"><i
                                    class="fa fa-spin fa-spinner" v-show="loading"></i>
                                    {{app.texts.search}}</button>
                            </div>
                        </div>
                        <small class="text-helper"  v-if="input.help">
                            {{setInputHelp(input)}}
                        </small>
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
                    style="{{input.style}}" 
                    class="form-control accept_vars" 
                    type="text"
                    v-model="command.command.result" 
                    :placeholder="'{variable}'"
                >
            </div>
        </div>
    </div>

</div>

    `,
    props:['commandData', 'commandFather', 'options', 'bots'],
    data () {
        return {
            loading: false
        }
    },
//TODO: multilenguaje
    mounted: function () {
       
    },
    computed:{
        selectedBot: function() {
            return this.bots.find((bot) => {
                return bot.name === this.command.command.robot
            })
        },
        selectedBotHasExposed: function() {
            return this.selectedBot?.exposed?.form?.length > 0
        },
        command: function(){
            var command = this.commandData
            if(command.command){
                
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                }                
            }else{
                command.command = { 
                    vars: {},                   
                    result: '',
                }
            }
            return command;
        }
        
    },
    methods: {
        getExposedTitle(exposed) {
            return exposed.title.en
        },
        getExposedDescription(exposed) {
            return exposed.description.en 
        },
        setInputTitle(input) {
            return input.title.en
        },
        setInputPlaceholder(input) {
            return input.placeholder?.en || ''
        },
        setInputHelp(input) {
            return input.help.en || ''
        },
        searchFileSave(id, extensions, default_extension){
            this.loading = true
            app.searchFileSave(null, extensions, default_extension).then((ret)=>{
                this.$set(this.command.command.vars, id, ret)
                this.loading = false
            })
        },
        searchFolder(id){
            this.loading = true
            app.searchFolder(null).then((ret)=>{
                this.$set(this.command.command.vars, id, ret)
                this.loading = false
            })
        },
        searchFile(id, extensions){
            this.loading = true
            app.searchFile(null,extensions).then((ret)=>{
                this.$set(this.command.command.vars, id, ret)
                this.loading = false
            }) 
        }
    }
})
