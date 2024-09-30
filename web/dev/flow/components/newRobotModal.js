Vue.component('new-robot-modal', {
    template:`
    <div>
        <div class="modal fade" id="modal-new-robot" tabindex="-1" role="dialog" aria-labelledby="newRobotModal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title w-100" id="exampleModalLabel">
                {{app.texts.new_bot}}
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                
                <div class='modal-body'>                            
                        <p> {{ app.texts.new_robot }} <strong>{{robotFolder()}}</strong>  </p>
                        <div class="form-group">
                            <label for="new_robot_name">{{app.texts.name}}</label>
                            <div class="input-group">
                                <input 
                                    id="new_robot_name"  
                                    class="form-control" 
                                    type="text"
                                    v-model="robot_name"
                                >

                            </div>
                            <small class="text-danger" v-show="!validName && validName !== null">
                                {{app.texts.invalid_bot_name}} | {{app.texts.invalid_name}}
                            </small>
                        </div>
                        
                        <div class="form-group">
                            <label for="new_robot_description">{{app.texts.description}}</label>
                            <div class="input-group">
                                <textarea
                                    id="new_robot_description" 
                                    class="form-control" 
                                    v-model="robot_description"
                                ></textarea>
                            </div>
                        </div>
                        <p class="mb-1">{{app.texts.open_new_robot_in}} </p>
                        <div class="form-check-inline">
                            <input class="form-check-input" type="radio" name="robot_type" id="flow_type" value="flow" v-model="robot_type" checked>
                            <label class="form-check-label" for="flow_type">
                                Flow
                            </label>
                        </div>
                        <div class="form-check-inline">
                            <input class="form-check-input" type="radio" name="robot_type" id="studio_type" value="studio" v-model="robot_type">
                            <label class="form-check-label" for="studio_type">
                                Studio
                            </label>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="createRobot()" :disabled="!validName">{{app.texts.create}}</button>
                        <button type="button" class="btn btn-secondary" @click="close()">{{app.texts.cancel}}</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    `,
    mounted: function() {
        try {
            const that = this;
            $('#modal-new-robot').on('hide.bs.modal', function (e) {
              that.robot_name = null;
              that.robot_description = '';
              that.robot_type = 'flow';
            })
        } catch (e) {
            console.log(e);
        }
    },
    data: function() {
        return {
            robot_name: null,
            robot_description: '',
            robot_type: 'flow'
        }
    },
    computed: {
        validName () {
          if (this.robot_name === null) {
            return null
          } else {
            return /^[-a-zA-Z0-9.+_]+$/.test(this.robot_name)
          }
        }
    },
    methods: {
        robotFolder: function(){
            return app?.$data?.bot_folder || 'folder not found';
        },
        close: function(){
            app.closeNewRobotModal();
        },
        createRobot: function(){
            app.createNewRobot(this.robot_name, this.robot_description, this.robot_type);
        },
        changeRobotType (type) {
        }

    }
})