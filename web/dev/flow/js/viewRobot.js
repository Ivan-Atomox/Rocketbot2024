Vue.component('view-robot',{
    template: `
    <div class="view-robot">
        <div class="dsd"  style="position: absolute;top: 0px;z-index: 100;height: 100%;width: 100%;max-width: 50%;">
            <div class="close_vars" @click="app.$data.viewRobot=false;"><i class="fas fa-times"></i></div>
            <div class="var-modal">
                
                <div class="modal-header">   
                    <h5 class="modal-title mr-3">
                        {{app.$data.texts.robot}}
                    </h5>
                    <button @click="app.downloadJSON()" class="btn btn-primary mr-1 btn-sm float-right mt-1 mb-1 rounded">
                        {{app.$data.texts.export}}
                    </button>
                </div>

                <div class="modal-body">
                    <div class="container">

                        <div class="row">
                            <div class="col-6">
                                <div class="form-group">
                                    <label for="robot_name">{{app.$data.texts.robot_name}}</label>
                                    <input v-model="robotName" @input="changeRobotName()" type="text" class="form-control" id="robot_name">
                                    <small class="text-danger" v-show="!validName">
                                        {{app.texts.invalid_bot_name}} | {{app.texts.invalid_name}}
                                    </small>
                                </div>
                            </div>

                            <div class="col-2">
                                <div class="form-group">
                                    <label for="robot_version">{{app.$data.texts.module_version}}</label>
                                    <input v-model="robotVersion" @input="changeRobotVersion()" type="text" class="form-control" id="robot_version" placeholder="0.0.1">
                                </div>
                            </div>

                            <div class="col-4">
                                <div class="form-group">
                                    <label for="robot_type">{{app.$data.texts.variable_type}}</label>
                                    <select v-model="robotType" @change="changeRobotType()" v-model="robotType" class="form-control" id="robot_type">
                                        <option value="process">{{app.$data.texts.process}}</option>
                                        <option value="main">{{app.$data.texts.main_robot}}</option>
                                        <option value="function">{{app.$data.texts.function}}</option>
                                        <option value="flow">Flow</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="robot_description">{{app.$data.texts.description}}</label>
                                    <textarea v-model="robotDescription" @input="changeRobotDescription()" class="form-control" id="robot_description" rows="3"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <p>
                                    {{app.$data.texts.path}} 
                                    <b>{{app?.$data?.bot_folder || ''}}</b>
                                </p>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <h6>{{app.$data.texts.robots_in}} <b> robot </b> </h6>
                                <hr class="hr-rocket">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-sm table-ellipsis">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>{{app.$data.texts.name}}</th>
                                                <th> 
                                                    {{app.$data.texts.variable_type}}
                                                </th>
                                                <th> {{app.$data.texts.module_version}}</th>
                                                <th>
                                                    {{app.$data.texts.last_update}}
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(robot, index) in app.$data.project" :key="robot.data.id">  
                                                <td>{{index + 1}}</td>
                                                <td>
                                                    <a :href="robotUrl(robot)" target="_blank" class="rocket-text">
                                                        <span> <i class="fa fa-solid fa-rocket"></i>  {{ robot.name }} </span>
                                                    </a>
                                                    <small class="text-muted d-block text-break" style="max-width:400px"> {{ robot.data?.description || "" }} </small>
                                                </td>
                                                <td>
                                                    {{ robot.data?.father || "" }}
                                                </td>
                                                <td>
                                                    {{robot.data?.version || ""}}
                                                </td>
                                                <td>
                                                    {{robot.data?.created_at || ""}}
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>

                            </div>

                        </div>
                        <div class="row">
                            <div class="col">
                                <h6>{{app.$data.texts.modules_in_robot}} <b> robot </b> </h6>
                                <hr class="hr-rocket">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-sm table-ellipsis">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th>#</th>
                                                <th>{{app.$data.texts.name}}</th>
                                                <th> {{app.$data.texts.module_version}} ({{app.$data.texts.installed}}) </th>
                                                <th> {{app.$data.texts.module_version}} </th>
                                                <th>
                                                    {{app.$data.texts.status}}
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(module, index) in app.$data.robotModules" :key="module.name">
                                                <td>{{index + 1}}</td> 
                                                <td>
                                                    {{module.name}}
                                                </td>
                                                <td>
                                                    {{module.version}}
                                                </td>
                                                <td>
                                                    {{module.last_version}}
                                                </td>
                                                <td>
                                                    <button 
                                                        @click="installModule(module.name, index)"
                                                        class="btn btn-sm badge" 
                                                        :disabled="module.status === 'Installed' || installingModules[module.name]"
                                                        :class="module.status === 'Installed' ? 'badge-success' : 'badge-warning'"

                                                    >
                                                        {{module.status}} 
                                                        <i v-if="installingModules[module.name]" class="fa fa-spinner"></i>
                                                    </button>
                                                </td>


                                            </tr>   
                                        </tbody>

                                      
                                    </table>
                                </div>
                             

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
    `,
    data: function(){
        return {
            robotName: '',
            robotVersion: '',
            robotType: '',
            robotDescription: '',
            // modules: [],
            installingModules: {}
            
        }
    },
    computed: {
        validName () {
            return /^[-a-zA-Z0-9.+_]+$/.test(this.robotName)
        }
    },
    mounted () {
        this.robotName = app.$data.robot_name;
        this.robotVersion = app.$data.robot_version;
        this.robotType = app.$data.robot_type;
        this.robotDescription = app.$data.project_description;
        // this.modules = app.$data.project?.[0]?.modules || []
    },
    methods: {
        changeRobotName: function(){
            app.changeRobotName(this.robotName);
        },
        changeRobotVersion: function(){
            app.changeRobotVersion(this.robotVersion);
        },
        changeRobotType: function(){
            app.changeRobotType(this.robotType);
        },
        changeRobotDescription: function(){
            app.changeRobotDescription(this.robotDescription);
        },
        robotUrl(robot) {
            return `flow?r=${robot.name}&d=${app.$data.path_encode}`
        },
        installModule: async function(moduleName, index){
            this.$set(this.installingModules, moduleName, true);
            await app.updateModule(moduleName, index);
            this.$set(this.installingModules, moduleName, false);
            app.getProject();
           
        }
    }
})
