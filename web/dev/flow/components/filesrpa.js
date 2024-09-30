Vue.component('files-savetext', {
    template:`
<div class="container">
    <div class="row">

        <div class="col-md-6">
            <label>{{commandFather.title_command}}</label>
            <div class="input-group">
                <input 
                    class="form-control accept_vars" 
                    type="text" 
                    id="file_name"
                    v-model.lazy="command.command.file_name"
                >
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchFileSave('file_name', commandFather.extensions, commandFather.default_extension)"><i
                    class="fa fa-spin fa-spinner" v-show="loading"></i>
                    {{app.texts.search}}</button>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <label>{{app.texts.mode}}</label>
            <select class="form-control" v-model.lazy="command.command.type">
                <option v-for="item in options" :value="item.value">{{item.text}}</option>
            </select>
        </div>

        <div class="col-md-3">
            <input 
                type="checkbox" 
                class="form-check-input" 
                id="line_break"
                v-model.lazy="command.command.new_line"
            >
            <label class="form-check-label" for="line_break">{{app.texts.add_line_break}}</label>
        </div>

    </div>
    <div class="row">
        <div class="col">
            <label  for="text_textarea">{{app.texts.text}}</label>
            <textarea 
                class="form-control" 
                id="text_textarea" 
                v-model.lazy="command.command.file_data"
            ></textarea>
        </div>
    </div>
</div>
    `,
    props:['commandData', 'commandFather'],
    data() {
        return {
            loading: false,
            options: [
                { value: 'add', text: app.texts.append },
                { value: 'write', text: app.texts.overwrite }
              ],
        }
    },
    methods: {
        searchFileSave(id, extensions, default_extension){
            this.loading = true
            app.searchFileSave(null, extensions, default_extension).then((ret)=>{
                this.$set(this.command.command, id, ret)
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
                    file_name: '',
                    type: '',
                    new_line: '',
                    file_data: ''
                }
            }
            return command;
        }
    }
})

Vue.component('files-filescontrol', {
    template:`
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <label>{{commandFather.title_command}}</label>
                <div class="input-group">
                    <input 
                        class="form-control accept_vars"
                        autocomplete="off" 
                        type="text" 
                        v-model.lazy="command.command.from"
                    >
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchFile('from')">
                        <i class="fa fa-spin fa-spinner" v-show="loading"></i>
                        {{app.texts.search}}</button>
                    </div>
                </div>
            </div>
            <div v-if="!['deletefile', 'trashfile', 'unzipfile'].includes(commandFather.father)" class="col-md-6">

                <label>{{commandFather.title_command_1}}</label>
                <div class="input-group">
                    <input 
                        class="form-control accept_vars" 
                        type="text" 
                        v-model.lazy="command.command.to"
                    >
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchFileSave('to', commandFather.extensions, commandFather.default_extension)"><i
                        class="fa fa-spin fa-spinner" v-show="loading"></i>
                        {{app.texts.search}}</button>
                    </div>
                </div>
            </div>

            <div v-if="commandFather.father === 'unzipfile'" class="col-md-6">

                <label>{{commandFather.title_command_1}}</label>
                <div class="input-group">
                    <input 
                        class="form-control accept_vars" 
                        type="text" 
                        v-model.lazy="command.command.to"
                    >
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchFolder('to')"><i
                            class="fa fa-spin fa-spinner" v-show="loading"></i>
                            {{app.texts.search}}</button>
                    </div>
                </div>
            </div>

            <div class="col">

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

        </div>
    </div>
    `,
    props:['commandData', 'commandFather'],
    data() {
        return {
            loading: false
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
        searchFile(id, extensions){
            this.loading = true
            app.searchFile(null,extensions).then((ret)=>{
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
                    from: '',
                    to: ''
                }
            }
            return command;
        }
    }
})

Vue.component('files-extract-text', {
    template:`
    <div class="container">
       <div class="row">
            <div class="col-md-6">
                <label>{{commandFather.title_command}}</label>
                <div class="input-group">
                    <input 
                        class="form-control accept_vars"
                        autocomplete="off" 
                        type="text" 
                        v-model.lazy="command.command.file"
                    >
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchFile('file', commandFather.extensions, commandFather.default_extension)">
                        <i class="fa fa-spin fa-spinner" v-show="loading"></i>
                        {{app.texts.search}}</button>
                    </div>
                </div>

            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>{{commandFather.title_command_1}}</label>
                    <input 
                        class="form-control accept_vars" 
                        type="text"
                        v-model.lazy="command.command.page" 
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
                        v-model.lazy="command.getvar" 
                        :placeholder="'{variable}'"
                    >
                </div>
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
    methods: {
        searchFileSave(id, extensions, default_extension){
            this.loading = true
            app.searchFileSave(null, extensions, default_extension).then((ret)=>{
                this.$set(this.command.command, id, ret)
                this.loading = false
            })
        },
        searchFile(id, extensions, default_extension){
            this.loading = true
            app.searchFile(null,extensions).then((ret)=>{
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
                    file: '',
                    page: ''
                }
            }
            return command;
        }
    }
})


Vue.component('files-new-xlsx', {
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
                <label>{{app.texts.assign_result}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model.lazy="command.getvar" 
                    :placeholder="'{variable}'"
                >
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
    methods: {
        searchFileSave(id, extensions, default_extension){
            this.loading = true
            app.searchFileSave(null, extensions, default_extension).then((ret)=>{
                this.$set(this.command.command, id, ret)
                this.loading = false
            })
        },
        searchFile(id, extensions, default_extension){
            this.loading = true
            app.searchFile(null,extensions).then((ret)=>{
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
        }
    },
    computed:{
        command: function(){
            var command = this.commandData
            if(!command.command){
                command.command = ''              
            }
            return command;
        }
    }
})
Vue.component('files-open-xlsx', {
    template:`
    <div class="container">
        <div class="row">
            <div class="col">

                <label>{{commandFather.title_command}}</label>
                <div class="input-group">
                    <input 
                        class="form-control accept_vars"
                        autocomplete="off" 
                        type="text" 
                        v-model.lazy="command.command.file_path"
                    >
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="searchFile('file_path', commandFather.extensions, commandFather.default_extension)">
                        <i class="fa fa-spin fa-spinner" v-show="loading"></i>
                        {{app.texts.search}}</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label>{{app.texts.assign_result}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model.lazy="command.getvar" 
                    :placeholder="'{variable}'"
                >
            </div>
            <div class="col-md-6">
                <label>Id</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    v-model.lazy="command.command.identificator" 
                    placeholder="Default"
                >
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
    methods: {
        searchFileSave(id, extensions, default_extension){
            this.loading = true
            app.searchFileSave(null, extensions, default_extension).then((ret)=>{
                this.$set(this.command.command, id, ret)
                this.loading = false
            })
        },
        searchFile(id, extensions, default_extension){
            this.loading = true
            app.searchFile(null,extensions).then((ret)=>{
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
                    identificator: ''
                }
            }
            return command;
        }
    }
})
Vue.component('files-count-elements', {
    template:`
    <div class="container">
        <div class="row">
            <div class="col">
                <label >{{ app.texts.assign_result }}</label>
                <input 
                    type="text" 
                    class="form-control accept_vars" 
                    v-model.lazy="command.var"
                    placeholder="{variable}"
                >    
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
    methods: {
        
    },
    computed:{
        command: function(){
            var command = this.commandData
            return command;
        }
    }
})
Vue.component('files-set-cell', {
    template:`
    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <label >{{ app.texts.cell }}</label>
                <input 
                    id="input-cell"
                    type="text" 
                    class="form-control accept_vars" 
                    v-model.lazy="cell"
                >    
            </div>
            <div class="col-md-2 d-flex align-items-center justify-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48zm0 192c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48z"/></svg>
            </div>
            <div class="col-md-5">
                <label >{{ app.texts.text }}</label>
                <input 
                    id="input-text" 
                    type="text"
                    class="form-control accept_vars" 
                    v-model.lazy="text"
                >    
            </div>
        </div>
    </div>
    `,
    props:['commandData', 'commandFather'],
    data() {
        return {
            cell: '',
            text: ''
        }
    },
    watch:{
        cell: function(newVal, oldVal){
            this.$set(this.command, 'command', this.cell + '=' + this.text)
        },
        text: function(newVal, oldVal){
            this.$set(this.command, 'command', this.cell + '=' + this.text)
        }
    },
    mounted(){
        const that = this
        this.cell = this.commandData.command.split('=')[0]
        this.text = this.commandData.command.split('=')[1]

    },
    computed:{
        command: function(){
            var command = this.commandData
            return command;
        }
    }
})
