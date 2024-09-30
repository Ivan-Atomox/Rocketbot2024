Vue.component('footer-info', {
    template:`
    <div class="footer-info">
            <div class="row">
                <div class="col-2 p-0 text-center " title="Git" >
                    <i class="fa fa-code-branch"></i> 
                    {{git?.current_branch}} <small class="text-info">{{git?.git_status?.length > 0 ? '* '+git?.git_status?.length  : ''}}</small>

                     <small v-if="push > 0" class="text-success"> <i class="fa fa-up-long"></i> {{push}}</small>
                    <div class="float-right border pl-2 pr-2 can-click" @click="reloadGit">
                        <i class="fa fa-rotate" :class="{'fa-spin': loading}"></i>
                    </div>
                </div>
                <div class="col-8 border-left text-center">
                    <i class="fa fa-folder"></i> <div class="d-inline">{{folder_}}</div>
                </div>
                <div class="col-1 border-left text-center">
                    <i class="fa fa-code"></i> {{count_commands}}
                </div>
                <div class="col-1 border-left text-center">
                    <i class="fa fa-warning"></i> {{alerts}}
                </div>

            </div>
    </div>
`,
    props: ['editing-command'],
    data(){
      return {
        git: {},
        loading: false,
        folder_: window.atob(app.$data.path_encode),
        count_commands: 0,
        alerts: 0,
        push: 0,


      }  
    },
    mounted() {
        /**
         * Get git info with fech
         */
        var l = this;
        // check every 1 second length of commands
        setInterval(function(){
            try{
            l.count_commands = Object.keys(editor.export().drawflow.Home.data).length
            }catch(e){
                l.count_commands = 0;
            }
        }, 1000);

        this.reloadGit();
    },
    methods: {
        reloadGit: function(){
            this.loading = true;
            var l = this;
            fetch('../gitstatus/' +app.$data.path_encode)
                .then(response => response.json())
                .then(data => {
                    try{
                        l.push = data.log.split('\n').length - 1;
                    }catch(e){
                        l.push = 0;
                    }
                    l.git = data;
                    l.loading = false;
                });
        }

    },
});