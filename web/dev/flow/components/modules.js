Vue.component('modules', {
    template:`
<div class="row">
    <div v-for="input in forms" v-bind:class="input.css">
        <div class="form-group" v-if="input.type=='input'">
        <label>{{setInputTitle(input)}}</label>
        <input style="{{input.style}}" class="form-control accept_vars" type="text"
           v-model.lazy="command.command[input.id]" :placeholder="setInputPlaceholder(input)">
           <small class="text-helper" v-if="input.help" v-html="setInputHelp(input)"></small>
           </div>


        <div class="form-group" v-if="input.type=='file_new'">
            <label>{{setInputTitle(input)}}</label>
            <div class="input-group">
                <input class="form-control accept_vars" type="text" :id="input.id"
                :placeholder="setInputPlaceholder(input)"
                v-model.lazy="command.command[input.id]">
                <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchFileSave(input.id, input.extensions, input.default_extension)"><i
                    class="fa fa-spin fa-spinner" v-show="loading"></i>
                    {{app.texts.search}}</button>
                </div>
            </div>
            
            <small class="text-helper"  v-if="input.help" v-html="setInputHelp(input)"></small>
                
        </div>

        <div class="form-group" v-if="input.type=='file_select'">
        <label>{{setInputTitle(input)}}</label>
        <div class="input-group">
            <input class="form-control accept_vars" type="text" :id="input.id"
            :placeholder="setInputPlaceholder(input)"
            v-model.lazy="command.command[input.id]">
            <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="searchFile(input.id, input.extensions)"><i
                class="fa fa-spin fa-spinner" v-show="loading"></i>
                {{app.texts.search}}</button>
            </div>
        </div>
        <small class="text-helper" v-if="input.help" v-html="setInputHelp(input)"></small>

        </div>

        
        <div class="form-group" v-if="input.type=='folder_select'">
            <label>{{setInputTitle(input)}}</label>
            <div class="input-group">
                <input class="form-control accept_vars" type="text" :id="input.id"
                :placeholder="setInputPlaceholder(input)"
                v-model.lazy="command.command[input.id]">
                <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchFolder(input.id)"><i
                    class="fa fa-spin fa-spinner" v-show="loading"></i>
                    {{app.texts.search}}</button>
                </div>
            </div>
            <small class="text-helper" v-if="input.help" v-html="setInputHelp(input)"></small>

        </div>

        
        <div class="form-group" v-if="input.type=='select'">

            <label>{{setInputTitle(input)}}</label>

            <select style="{{input.style}}" class="form-control" v-model.lazy="command.command[input.id]">
                <option v-for="item in input.options" :value="item.value">{{item.title}}</option>
            </select>
            <small class="text-helper" v-if="input.help" v-html="setInputHelp(input)"></small>
            </div>

        
        <div class="form-group form-check" v-if="input.type=='checkbox'">
        <input 
            :id="input.id"
            style="{{input.style}}" 
            class="form-check-input" 
            type="checkbox" 
            @change="changeCheckbox(input.id)"
            v-model.lazy="command.command[input.id]"
        >
        <label class="form-check-label" for="{{input.id}}">{{setInputTitle(input)}}</label>
        <small class="text-helper" v-html="setInputHelp(input)"></small>
        </div>
        <div class="form-group" v-if="input.type=='textarea'">
        <label  for="{{input.id}}">{{setInputTitle(input)}}</label>
        <textarea style="{{input.style}}"  class="form-control" :id="input.id" 
       :placeholder="setInputPlaceholder(input)"
            v-model.lazy="command.command[input.id]"></textarea style="{{input.style}}">
            <small class="text-helper" v-if="input.help" v-html="setInputHelp(input)"></small>
            </div>
        
			<div class="form-group" v-if="input.type=='label'">
        <label  style="{{input.style}}" class="form-check-label" for="{{input.id}}">{{setInputTitle(input)}}</label>
        </div>

        <div class="form-group" v-if="input.type=='html'">
        <label  for="{{input.id}}">{{setInputTitle(input)}}</label><br>
        <iframe style="{{input.style}}" class="iframe" id="modal_iframe" @load.once="iframeLoaded" :src="'../module/'+commandFather.module_name+'/html/'+input.src" :data-iframe="'../module/'+commandFather.module_name+'/html/'+input.src" >
        </iframe>
    </div>
</div>
    `,
    props:['commandData', 'commandFather'],
    data() {
        return {
            loading: false,
        }
    },
	mounted() {
		var this_ = this;
		$("#modal-edit").on('shown.bs.modal', function () {
			//if exist iframe in modal
			var iframe = document.getElementById('modal_iframe');
			if(iframe){
				this_.iframeLoaded({target:iframe})
			}
		});
	},
    methods: {
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
            this.loading=true
            app.searchFolder(null).then((ret)=>{
                this.$set(this.command.command, id, ret)
                this.loading=false
            })
        },
        searchFile(id, extensions){
            this.loading=true
            app.searchFile(null,extensions).then((ret)=>{
                this.$set(this.command.command, id, ret)
                this.loading=false
            })
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
        changeCheckbox (id) {
            if (this.command.command[id] === false) {
                delete this.command.command[id]
            }
        }
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
    }
})
