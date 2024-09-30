Vue.component('modal-edit-var', {
    template:`
    <div>
    <div class="modal" tabindex="-1" role="dialog" id="modal_add_var">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header">
                    <h5 class="modal-title"> Robot: {{app.$data.robot_name}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <h3>{{app.$data.texts.add_variable}}</h3>
                    <hr class="hr-rocket">
                    <div class="form-group">
                        <label>{{app.$data.texts.variable_name}}:</label>
                        <input class="form-control" v-model="var_name_clone">
                        <small class="text-danger" v-show="varNameRepeated()===true">
                            Can't repeat a name.
                        </small>
                        <small class="text-danger" v-show="emptyVarName() || !validVarName()">
                            This variable name is invalid.
                        </small>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>{{app.$data.texts.variable_type}}:</label>
                                <select class="form-control" v-model="var_type" id="var_type">
                                    <option value="string" default>General</option>
                                    <option value="password">Password</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mt-3 pt-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="var_disable" id="isDisableVar" >
                                    <label class="form-check-label" for="isDisableVar">
                                        {{app.$data.texts.disable}}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>{{app.$data.texts.group}}:</label>
                                <input class="form-control" v-model="var_group">
                                
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>{{app.$data.texts.variable_data}}:</label>
                        <textarea v-show="var_type=='string'" class="form-control" v-model="var_data"></textarea>
                        <input v-show="var_type=='password'" class="form-control" v-model="var_data" type="password">
                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" @click="addVar()" :disabled="varNameRepeated() || emptyVarName() || !validVarName()" class="btn btn-primary">{{var_index === -1 ? app.$data.texts.add_variable : app.$data.texts.edit}}</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">{{app.$data.texts.cancel}}</button>
                </div>
            </div>
        </div>
    </div>
</div>
`,
    props: ['var_name', 'var_type', 'var_data', 'var_index', 'var_disable', 'var_group'],
    data(){
      return {
        var_exist: false,
        validName: true,
        varNameRegex: /^[-a-zA-Z0-9\.+_]+$/,
        var_name_clone: ''
      }  
    },
    computed: {
       
    },
    methods: {
        varNameRepeated: function(){
           return app.$data.vars.some((variable, index) => {
                if (variable.name === this.var_name_clone && index !== this.var_index) {
                   return true
                }
                return null
            })
        },
        emptyVarName: function() {
            return this.var_name_clone.trim() === ''
        },
        validVarName: function() {
            return this.varNameRegex.test(this.var_name_clone)
        },
        mountModal() {
            this.var_name_clone = this.var_name;
        },
        setVariableObject: function () {
            return   {
                name: this.var_name_clone,
                type: this.var_type,
                data: this.var_data,
                disabled: this.var_disable,
                category: this.var_group
            }
        },
        addVar: function(){
            if(this.var_index>=0 ){
                this.var_exist = true;
                Vue.set(app.$data.vars,this.var_index,this.setVariableObject());
            }else{
                this.var_exist = false;
                app.$data.vars.push(this.setVariableObject())
            }

            $('#modal_add_var').modal('hide');
        }

    }
});