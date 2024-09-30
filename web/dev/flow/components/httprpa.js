Vue.component('http-simple', {
    template:`
<div class="container">
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{app.texts.server_config_title}}</label>
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
Vue.component('http-advanced', {
    template:`
<div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label>{{app.texts.server_config_title}}</label>
                <input 
                    class="form-control accept_vars" 
                    type="text"
                    :placeholder="'https://rocketbot.cl'"
                    v-model="command.command.url" 
                >
            </div>
        </div>
        <div class="col-md-6">
            <label>{{app.texts.request_method}}</label>
            <div class="form-check">
                <input class="form-check-input" v-model="command.command.method" type="radio" id="GET" value="get">
                <label class="form-check-label" for="GET">
                    GET
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="command.command.method" type="radio" id="POST" value="post">
                <label class="form-check-label" for="POST">
                    POST
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="command.command.method" type="radio" id="PUT" value="put">
                <label class="form-check-label" for="PUT">
                    PUT
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" v-model="command.command.method" type="radio" id="DELETE" value="delete">
                <label class="form-check-label" for="DELETE">
                    DELETE
                </label>
            </div>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="header-tab" data-toggle="tab" data-target="#header" type="button" role="tab" aria-controls="header" aria-selected="true">{{app.texts.headers}}</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="profile-tab" data-toggle="tab" data-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">{{app.texts.profile}}</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="content-params-tab" data-toggle="tab" data-target="#content-params" type="button" role="tab" aria-controls="content-params" aria-selected="false">{{app.texts.content_params}}</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="content-json-tab" data-toggle="tab" data-target="#content-json" type="button" role="tab" aria-controls="content-json" aria-selected="false">{{app.texts.content_json}}</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="raw-tab" data-toggle="tab" data-target="#raw" type="button" role="tab" aria-controls="raw" aria-selected="false">{{app.texts.raw}}</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="proxy-tab" data-toggle="tab" data-target="#proxy" type="button" role="tab" aria-controls="proxy" aria-selected="false">Proxy</button>
                </li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane active" id="header" role="tabpanel" aria-labelledby="header-tab">
                    <div class="form-group">
                        <label>{{app.texts.headers}}</label>
                        <textarea 
                            class="form-control" 
                            :placeholder="JSON.stringify({header1:'header 1 data', header2: 'header 2 data' })"
                            v-model="command.command.header"
                        ></textarea>  
                    </div>
                </div>
                <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div class="form-group">
                        <label>{{app.texts.profile}}</label>
                        <textarea 
                            class="form-control" 
                            :placeholder="JSON.stringify({input1:'dato de input', input2: 'datos input2' })"
                            v-model="command.command.form"
                        ></textarea>  
                    </div>
                </div>
                <div class="tab-pane" id="content-params" role="tabpanel" aria-labelledby="content-params-tab">
                    <div class="form-group">
                        <label>{{app.texts.content_params}}</label>
                        <textarea 
                            class="form-control" 
                            :placeholder="JSON.stringify({params1:'params 1 data', params2: 'params 2 data' })"
                            v-model="command.command.params"
                        ></textarea>  
                    </div>
                </div>
                <div class="tab-pane" id="raw" role="tabpanel" aria-labelledby="raw-tab">
                    <div class="form-group">
                        <label>{{app.texts.raw}}</label>
                        <textarea 
                            class="form-control" 
                            v-model="command.command.raw"
                        ></textarea>  
                    </div>
                </div>
                <div class="tab-pane" id="proxy" role="tabpanel" aria-labelledby="proxy-tab">
                    <div class="form-group">
                        <label>Proxy</label>
                        <input 
                            class="form-control accept_vars" 
                            type="text"
                            :placeholder="JSON.stringify({http:'1.1.1.1:1234',https:'2.2.2.2:1234'})"
                            v-model="command.command.proxy" 
                        > 
                    </div>
                </div>
            </div>
        </div>
    </div>




    <hr>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <label>{{app.texts.path}}</label>
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
            <div class="form-group form-check">
                <input style="{{input.style}}" 
                    type="checkbox" 
                    class="form-check-input" 
                    v-model="command.command.ssl"
                >
                    <label>{{app.texts.ignore_ssl}}</label>
            </div>
        </div>
    </div









   
</div>
    `,
    props:['commandData', 'commandFather'],
    data () {
        return {
            loading: false
        }
    },
    mounted(){
        var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
        triggerTabList.forEach(function (triggerEl) {
        var tabTrigger = new bootstrap.Tab(triggerEl)

        triggerEl.addEventListener('click', function (event) {
            event.preventDefault()
            tabTrigger.show()
        })
        })
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
                    method: 'get',
                    header: '',
                    url: '',
                    json: '',
                    params: '',
                    form: '',
                    proxy: '',
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