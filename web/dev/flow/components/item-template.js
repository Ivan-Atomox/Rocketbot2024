Vue.component('item-template', {
  template:`
    <div>
      <input type="text" class="form-control accept_vars" v-model.lazy="command" @change="ch">
    </div>
  `,
  
      props: ['modelVar'],
      
      computed:{
        command: function(){
            var command = this.modelVar
            return command;
        }
      },
      watch:{
        'command': function(e){
          console.log(e)
        }
      }, methods: {
        'ch': function(e,c){
          app.$emit('change', this)
        }
      },
    })
  