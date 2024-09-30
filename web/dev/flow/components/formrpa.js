Vue.component('form-command', {
    template:`
        <div class="row">
            <div v-for="input in forms" v-bind:class="input.css">
                <div class="form-group" v-if="input.type=='input'">
                    <label>{{setInputTitle(input)}}</label>
                    <input 
                        style="{{input.style}}" 
                        class="form-control accept_vars" 
                        type="text"
                        v-model.lazy="command.command[input.id]" 
                        :placeholder="setInputPlaceholder(input)"
                    >
                    <small class="text-helper" v-if="input.help">
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
                        v-model.lazy="command.command[input.id]"
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

                <div class="form-group" v-if="input.type=='file_select'">
                    <label>{{setInputTitle(input)}}</label>
                    <div class="input-group">
                        <input 
                            class="form-control accept_vars"
                            autocomplete="off" 
                            type="text" 
                            :id="input.id"
                            :placeholder="setInputPlaceholder(input)"
                            v-model.lazy="command.command[input.id]"
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

                <div class="form-group" v-if="input.type=='folder_select'">
                    <label>{{setInputTitle(input)}}</label>
                    <div class="input-group">
                        <input 
                            class="form-control accept_vars" 
                            type="text" 
                            :id="input.id"
                            :placeholder="setInputPlaceholder(input)"
                            v-model.lazy="command.command[input.id]"
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

                <div class="form-group" v-if="input.type=='select'">
                    <label>{{setInputTitle(input)}}</label>
                    <select style="{{input.style}}" class="form-control" v-model.lazy="command.command[input.id]">
                        <option v-for="item in input.options" :value="item.value">{{item.title}}</option>
                    </select>
                    <small class="text-helper"  v-if="input.help">
                        {{setInputHelp(input)}}
                    </small>
                </div>

                <div class="form-group form-check" v-if="input.type=='checkbox'">
                    <input style="{{input.style}}" 
                        :id="input.id" 
                        type="checkbox" 
                        class="form-check-input" 
                        @change="changeCheckbox(input.id)"
                        v-model.lazy="command.command[input.id]"
                    >
                        <label>{{setInputTitle(input)}}</label>
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
                        v-model.lazy="command.command[input.id]"
                    ></textarea>
                    <small class="text-helper"  v-if="commandFather.group!=='windows' && input.help">
                        {{setInputHelp(input)}}
                    </small>
                </div>

                <div 
                    v-if="commandFather.group==='windows' && input.type === 'textarea'" 
                    class="text-helper" 
                    @click.prevent="checkAddon(input)" 
                    v-html="input.help" 
                />
                

                <div class="form-group" v-if="input.type=='label'">
                    <label  style="{{input.style}}" class="form-check-label" for="{{input.id}}">{{setInputTitle(input)}}</label>
                </div>


            </div>
        </div>
    `,
    props:['commandData', 'commandFather'],
    data() {
        return {
            loading: false,
        }
    },
    mounted: function () {
        var this_ = this;
		$("#modal-edit").on('shown.bs.modal', function () {
			//if exist iframe in modal
			var iframe = document.getElementById('modal_iframe');
			if(iframe){
				this_.iframeLoaded({target:iframe}, 'mounted')
			}
		});   
    },
    computed:{
        forms:function(){
            var f = [];
            if(this.commandFather.form){
                f = JSON.parse(JSON.stringify(this.commandFather.form.inputs))
            }
            return f
        },
        command: function(){
            var command = this.commandData

            if(command.command){
                
                if(typeof(command.command) == 'string'){
                    command.command = JSON.parse(command.command)
                }                
            } 
            command.remove_vars = this.extractRemoveVars()
            return command;
        }
    },
    methods: {
        //TODO: que acepte languages
        checkAddon: function (input) { 
            try {
                document.getElementById('desktop_recorder_visor').click()
              } catch (e) {
                console.log(e)
              }
        },
        setInputPlaceholder: function(input) {
            try {
                if (typeof input.placeholder === 'string') {
                  return input.placeholder
                } else if ('en' in input.placeholder) {
                    return input.placeholder.en
                } 
              } catch {
                return input.placeholder
            }
        },
        extractRemoveVars: function () {
            let array = []
            try {
                this.commandFather.form.inputs.forEach(input => {
                    if (input.remove_vars) {
                        array.push(input.id)
                  }
                })      
            } catch {
                return []
            } finally {
                return array
            }
        },
        changeCheckbox (id) {
            if (this.command.command[id] === false) {
                delete this.command.command[id]
            }
        },
        setInputTitle (input) {
            try {
                if (typeof input.title === 'string') {
                  return input.title
                } else if ('en' in input.title) {
                    return input.title.en
                } 
              } catch {
                return input.title
            }
        },
        setInputHelp (input) {
            try {
                if (typeof input.help === 'string') {
                  return input.help
                } else if ('en' in input.help) {
                    return input.help.en
                } 
              } catch {
                return input.help
            }
        },
        iframeLoaded: function(e, location){
            var iframe = e.target;
			var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
			if (iframeWin.document.body) {
                iframe.height = iframeWin.document.documentElement.scrollHeight + 100 || iframeWin.document.body.scrollHeight + 100 ;
            }
                // // set data from command
            if(typeof this.commandData.command == 'string'){
                this.commandData.command = JSON.parse(this.commandData.command)
            }
            if (iframeWin) {
                iframeWin.postMessage(this.commandData.command['iframe'], '*');
            }
		},
        searchFileSave(id, extensions, default_extension){
            this.loading = true
            app.searchFileSave(null, extensions, default_extension).then((ret)=>{
                this.$set(this.command.command, id, ret)
                this.loading = false
            })
        },
        searchFolder(id){
            this.loading = true
            app.searchFolder(null).then((ret)=>{
                this.$set(this.command.command, id, ret)
                this.loading = false
            })
        },
        searchFile(id, extensions){
            this.loading = true
            app.searchFile(null,extensions).then((ret)=>{
                this.$set(this.command.command, id, ret)
                this.loading = false
            })
            
        }
    }
})