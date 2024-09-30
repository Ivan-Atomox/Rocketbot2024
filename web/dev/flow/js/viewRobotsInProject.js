Vue.component('view-robots-in-project', {
    
    template: `
    <div class="view-vars">
        <div class="dsd"  style="position: absolute;top: 0px;z-index: 100;height: 100%;width: 100%;max-width: 50%;">
            <div class="close_vars" @click="app.$data.viewRobotsInProject=false;"><i class="fas fa-times"></i></div>
                <div class="var-modal">

                    <div class="modal-header">
                        <h5 class="modal-title mr-3">
                            {{app.$data.texts.robots_in}} {{app.$data.texts.project_robot}}
                        </h5>
                    </div>
                    
                    <div class="modal-body">
                        <span>
                            <i class="fa fa-database"></i> DB: {{app?.$data?.bot_folder || ''}}
                        </span>     
                        <div class="form-group mt-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="search_by">
                                        <i class="fa fa-search"></i>
                                    </span>
                                </div>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    v-model="robotFilter" 
                                    aria-label="search by" 
                                    aria-describedby="search_by"
                                >
                            </div>    
                            <small class="form-text text-muted">{{app.$data.texts.search_ex}}</small>
                        </div>   
                        <hr>
                        <table style="word-break: break-word" class="table table-striped table-bordered table-sm table-ellipsis">
                            <thead class="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(bot, index) in filteredRobots" :key="bot.id">  
                                    <td class="text-nowrap">
                                        {{index + 1}}
                                    </td>
                                    <td class="w-100">
                                        <i class="fa fa-code-branch"></i>
                                        <b>{{bot.name}}</b>
                                        <div v-if="bot.description" class="alert alert-info" role="alert mt-1">
                                            {{bot.description}}
                                        </div>
                                        <small class="d-block">
                                            <b> 
                                                {{app.$data.texts.version}}:
                                            </b>
                                            {{bot.counts}} -
                                            <b>
                                                {{app.$data.texts.last_act}}:
                                            </b>
                                                {{bot.created_at}}
                                        </small>
                                    </td>
                                    <td width=120>
                                        <div class="btn-group-vertical">
                                            <button
                                                @click="openRobot(bot)" 
                                                class="btn btn-sm btn-primary text-nowrap"
                                            >
                                                <i class="fa fa-rocket"></i>
                                                Load
                                            </button>
                                            <button 
                                                @click="deleteRobotConfirmation(bot, index)" 
                                                class="btn btn-sm btn-danger text-nowrap"
                                            >
                                                <i class="fa fa-trash"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                        </table>



                    </div>
                
                </div>
            </div>
        </div>
    </div>
`,
data(){
    return {
        robotFilter: ''
    }
},
mounted() {
},        
computed: {
    filteredRobots () {
      return app.$data.bots.filter((bot) => {
        const string = JSON.stringify(bot)
        return string.includes(this.robotFilter)
      })
    }
},
filters: {

},
methods: {
        deleteRobotConfirmation(bot, index) {
            $.confirm({
                title: 'Delete "'+ bot.name +'" ?',
                
                
                content: `
                <div class="row">
                    <div class="col-3">     
                        <img src="flow/img/bots/message.png" alt=""> 
                    </div>
                    <div class="col-9 pt-4">
                        Are you sure to <b>delete</b> this robot? This event cannot be reversed
                    </div>
                    
                </div>
                `,
                icon: 'fas fa-trash-alt',
                theme: 'bootstrap',
                type: 'red',
                columnClass: 'medium',
                closeIcon: true,
                typeAnimated: true,
                
                buttons: {
                    close: {
                        text: 'No, Cancel',
                    },
                    ok: {
                        text: 'Yes, delete it',
                        btnClass: 'btn-danger',
                        action: function () {
                            app.deleteBot(bot, index);
                            
                        }
                    }
                }
            });
        },
        openRobot(bot) {
            window.open('/flow?r=' + bot.name + "&d=" + app.path_encode, '_blank');
        }
    }
})