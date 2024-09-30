
Vue.component('view-expose', {
    
    template: /*html*/`
    <div class="view-vars">
        <div class="dsd"  style="position: absolute;top: 0px;z-index: 100;height: 100%;width: 100%;max-width: 50%;">
            <div class="close_vars" @click="app.$data.viewExpose=false;"><i class="fas fa-times"></i></div>
                <div class="var-modal">
                    <div class="modal-header">

                        <h5 class="modal-title mr-3">
                            Expose
                        </h5>
                        <button
                            @click="showingAdvanced=!showingAdvanced" 
                            class="btn btn-secondary"
                        >
                            Advanced
                        </button>

                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div v-show="showingAdvanced" class="row">
                                <div class="col">
                                    <textarea 
                                        id="exposed-json"
                                        type="text"
                                    > 
                                    </textarea>
                                    <small v-if="errorInJSON" class="text-danger">
                                        There is an error on the exposed code, closing the exposed window 
                                        will revert the JSON to it's last
                                        correct content.
                                    </small>
                                    <small v-if="editingLabel" class="text-secondary">
                                        Editing temporarily disabled, one or more input label are on edition mode.
                                    </small>    
                                    </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="expose_title">{{ app.$data.texts.change_expose_title }}</label>
                                        <input 
                                            v-model="app.$data.bot.project.expose.title[app.$data.language]" 
                                            class="form-control" 
                                            id="expose_title" 
                                            rows="3"
                                            @input="updateCodemirror()"
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group">
                                        <label for="expose_description">{{ app.$data.texts.change_expose_description }}</label>
                                        <textarea 
                                            v-model="app.$data.bot.project.expose.description[app.$data.language]" 
                                            id="expose_description" 
                                            class="form-control" 
                                            rows="3"
                                            @input="updateCodemirror()"
                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col d-flex flex-row align-items-end">
                                    <div class="form-group" style="flex-basis: 50%;">
                                        <label for="robot_description">{{ app.$data.texts.select_type_input }}</label>
                                        <select v-model="inputSelected" class="form-control">
                                            <option disabled selected :value="null"> -- select an input type -- </option>
                                            <option v-for="item in inputOptions" :value="item.value">{{item.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group" style="flex-basis: 50%;">
                                        <label for="robot_description">{{ app.$data.texts.assign_input_to_variable }}</label>
                                        <div class="input-group">
                                            <select v-model="variableSelected" class="form-control">
                                                <option disabled selected :value="null"> -- select a variable -- </option>
                                                <option v-for="item in unusedVars" :value="item">{{item}}</option>
                                            </select>
                                            <div class="input-group-append">
                                                <button 
                                                    @click="addInput()" 
                                                    class="btn btn-sm btn-success"
                                                    :disabled="!(inputSelected && variableSelected)"
                                                >+</button>
                                            </div>
                                        </div>   
                                    </div>
                                </div>
                            </div>
                            <hr>                          
                        </div>

                        <div class="container-fluid">
                            <div id="items" class="row">
                               
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
`,
props: ['expose'],
data(){
    return {
        errorInJSON: false,
        editingLabel: false,
        editableCodeMirror: null,
        showingAdvanced: false,
        inputSelected: null,
        variableSelected: null,
        typeOfInputs: {
            input: {
              type: 'input',
              title: {
                en: 'Enter variable value ',
                es: 'Ingrese valor de la variable ',
                pr: 'Introduzir valor variável '
              },
              help: {
                en: '',
                es: '',
                pr: ''
              },
              placeholder: {
                en: '',
                es: '',
                pr: ''
              },
              css: 'col-md-12'
            },
            select: {
              type: 'select',
              title: {
                en: 'Enter variable value ',
                es: 'Ingrese valor de la variable ',
                pr: 'Introduzir valor variável '
              },
              help: {
                en: '',
                es: '',
                pr: ''
              },
              css: 'col-md-12',
              options: []
            },
            textarea: {
              type: 'textarea',
              title: {
                en: 'Enter variable value ',
                es: 'Ingrese valor de la variable ',
                pr: 'Introduzir valor variável '
              },
              help: {
                en: '',
                es: '',
                pr: ''
              },
              css: 'col-md-12'
            },
            checkbox: {
              type: 'checkbox',
              title: {
                en: 'Enter variable value ',
                es: 'Ingrese valor de la variable ',
                pr: 'Ingrese valor de la variable '
              },
              help: {
                en: '',
                es: '',
                pr: ''
              },
              css: 'col-md-3'
            },
            file_select: {
              type: 'file_select',
              placeholder: {
                en: '',
                es: '',
                pr: ''
              },
              title: {
                en: 'Enter variable value ',
                es: 'Ingrese valor de la variable ',
                pr: 'Introduzir valor variável '
              },
              help: {
                en: '',
                es: '',
                pr: ''
              },
              css: 'col-md-12'
            },
            file_new: {
              type: 'file_new',
              placeholder: {
                es: '',
                en: '',
                pr: ''
              },
              title: {
                en: 'Enter variable value ',
                es: 'Ingrese valor de la variable ',
                pr: 'Introduzir valor variável '
              },
              help: {
                en: '',
                es: '',
                pr: ''
              },
              css: 'col-md-12'
            },
            folder_select: {
              type: 'folder_select',
              placeholder: {
                es: '',
                en: '',
                pr: ''
    
              },
              title: {
                en: 'Enter variable value ',
                es: 'Ingrese valor de la variable ',
                pr: 'Introduzir valor variável '
              },
              help: {
                en: '',
                es: '',
                pr: ''
              },
              css: 'col-md-12'
            }
        },
        inputOptions: [
            { value: 'input', name: 'Input' },
            { value: 'select', name: 'Select' },
            { value: 'textarea', name: 'Textarea' },
            { value: 'checkbox', name: 'Checkbox' },
            { value: 'file_select', name: 'File Select' },
            { value: 'file_new', name: 'File New' },
            { value: 'folder_select', name: 'Folder Select' }
          ]
    }
},
watch: {
    editingLabel: function(val) {
        if(val === false) {
            var codeMirrorElement = document.querySelector('.CodeMirror');
            if (codeMirrorElement.classList.contains('readOnly')) {
                codeMirrorElement.classList.remove('readOnly')
                this.editableCodeMirror.setOption("readOnly", false);
            }
        }
    },
    showingAdvanced: function (val) {
        if (val){
            setTimeout(()=> {
                this.editableCodeMirror.refresh();
            },1);
        } 
    }
},
mounted() {
    const ul = document.getElementById('items');
    this.expose.form.forEach((item, index) => {
        li = this.createExposeElement(item, index)
        ul.appendChild(li);
    });
    var sortable = Sortable.create(ul, {
        handle: '.handle',
        onUpdate: (evt)=> {
            const updatedOrder = sortable.toArray();
            const temp = updatedOrder.map(id => app.$data.bot.project.expose.form.find(item => item.id == id));
            app.$data.bot.project.expose.form = temp
            this.editableCodeMirror.setValue(JSON.stringify(app.$data.bot.project.expose, null, 5))
            this.editingLabel = false
          }
    });

    let text = document.getElementById('exposed-json')
    text.value = JSON.stringify(this.expose, null, 5)
    this.editableCodeMirror = CodeMirror.fromTextArea(document.getElementById('exposed-json'), {
        mode: "application/json",
        theme: "paraiso-light",
        lineNumbers: true,
        smartIndent: true,
        autocorrect: true        
    }); 
    //onchange event on codemirror
    this.editableCodeMirror.on("change", (cm, change) => {
        let codemirror = document.getElementsByClassName('CodeMirror')[0]
        try {
            const json = JSON.parse(cm.getValue())
            app.$data.bot.project.expose = json
            this.deleteExposeList()
            this.createExposeList()
            codemirror.classList.remove('bg-danger')
            this.errorInJSON = false
        } catch (error) {
            codemirror.classList.add('bg-danger')
            this.errorInJSON = true
        }
    });
},        
    computed: {
        arrayFromVars () {
            return app.$data.vars.map((vari) => {
            return vari.name
            })
        },
        unusedVars () {
            const usedVars = app.$data.bot.project.expose.form.map((input) => {
            return input.id
            })
            return this.arrayFromVars.filter(x => !usedVars.includes(x))
        }
    },
    filters: {

    },
    methods: {
        updateCodemirror() {
            this.editableCodeMirror.setValue(JSON.stringify(app.$data.bot.project.expose, null, 5))
            this.editingLabel = false
        },
        notRepeatedVariableOnInput (id) {
            return app.$data.bot.project.expose.form.filter((input) => { return input.id === id }).length === 1
        },
        deleteExposeList() {
            const ul = document.getElementById('items');
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
        },
        createExposeList() {
            const ul = document.getElementById('items');
            app.$data.bot.project.expose.form.forEach((item, index) => {
                li = this.createExposeElement(item, index)
                ul.appendChild(li);
            });
        },
        createExposeElement (item) {
            const li = document.createElement('li');
            li.classList.add('exposedInputBox')
            li.classList.add(item.css)
            Object.keys(item).forEach((key) => {
                li.dataset[key] = item[key];
            });
         
            const div = document.createElement('div');
            div.classList.add('form-group');

            const inputGroup = this.createInputLabel(item);

            div.appendChild(inputGroup);
            const input = this.createInput(item);

            let hoveredDiv = this.createHoveredDiv(item);
            li.addEventListener('mouseenter', () => {
                hoveredDiv.classList.remove('d-none');
            });
                
            li.addEventListener('mouseleave', () => {
                hoveredDiv.classList.add('d-none');
            });
            li.appendChild(hoveredDiv);

            div.appendChild(input);
            li.appendChild(div);
            if (!this.notRepeatedVariableOnInput(item.id)){
                //create a small text below the input
                const small = document.createElement('small');
                small.classList.add('form-text');
                small.classList.add('text-danger');
                small.innerText = 'Variable already in use';
                li.appendChild(small);

            }
            return li
        },
        createInputLabel (item) {
            const inputGroup = document.createElement('div');
            inputGroup.classList.add('input-group');
            inputGroup.classList.add('mt-1');
            inputGroup.classList.add('d-flex');
            inputGroup.classList.add('flex-row');
            inputGroup.classList.add('align-items-center');
            const hamburguer = document.createElement('i');
            hamburguer.classList.add('fa');
            hamburguer.classList.add('fa-bars');
            hamburguer.classList.add('handle');
            inputGroup.prepend(hamburguer);
            inputGroup.role = 'group';

            const labelInput = document.createElement('input');
            labelInput.type = 'text';
            labelInput.classList.add('form-control-plaintext');
            labelInput.classList.add('plainText');
            labelInput.value =  item.title[app.$data.language];
            labelInput.readOnly = true;
            labelInput.oninput = (event) => {
                item.title[app.$data.language] = event.target.value
            }
            //create a button on the input group append, the button has a pencil icon

            const inputGroupAppend = document.createElement('div');
            inputGroupAppend.classList.add('input-group-append');

            const button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add('btn-sm');
            button.classList.add('btn-outline-none');
            button.onclick = () => {
                //check if the input is in plain text mode, if it is, change to edit mode
                var codeMirrorElement = document.querySelector('.CodeMirror');

                if(labelInput.readOnly){
                    this.editableCodeMirror.setOption("readOnly", true);
                    codeMirrorElement.classList.add('readOnly');
                    this.editingLabel = true
                    labelInput.classList.remove('form-control-plaintext');
                    labelInput.classList.add('form-control');
                    labelInput.readOnly = false;
                    labelInput.focus();

                } else {
                    this.editableCodeMirror.setOption("readOnly", false);
                    codeMirrorElement.classList.remove('readOnly');
                    this.editingLabel = false
                    labelInput.classList.remove('form-control');
                    labelInput.classList.add('form-control-plaintext');
                    labelInput.readOnly = true;
                    this.editableCodeMirror.setValue(JSON.stringify(app.$data.bot.project.expose, null, 5))
                }
            }

            const icon = document.createElement('i');
            icon.classList.add('fa');
            icon.classList.add('fa-pencil');
            button.appendChild(icon);
            inputGroup.appendChild(labelInput);
            inputGroupAppend.appendChild(button);
            inputGroup.appendChild(inputGroupAppend);
            return inputGroup
        },
        createInput (item) {
            let input
            if(item.type == 'input'){
                input = document.createElement('input');
                input.id = item.id;
                input.classList.add('form-control');
                input.type = 'text';
                input.placeholder = item.placeholder[app.$data.language];
                input.disabled = true;
            }
            if(item.type == 'select'){
                input = document.createElement('select');
                input.id = item.id;
                input.classList.add('form-control');
                input.disabled = true;
            }
            if(item.type == 'textarea'){
                input = document.createElement('textarea');
                input.id = item.id;
                input.classList.add('form-control');
                input.name = 'textarea';
                input.rows = 2;
                input.disabled = true;
            }
            if(item.type == 'checkbox'){
                input = document.createElement('input');
                input.id = item.id;
                input.type = 'checkbox';
                input.disabled = true;
            }
            if(['file_select', 'file_new', 'folder_select'].includes(item.type)){
                input = document.createElement('input');
                input.id = item.id;
                input.classList.add('form-control');
                input.type = 'file';
                input.disabled = true;
                input.placeholder = item.placeholder[app.$data.language];
            }
            return input
        },
        createHoveredDiv (item) {
            let hoveredDiv = document.createElement('div');
            hoveredDiv.classList.add('hovered');
            hoveredDiv.classList.add('d-none');
            hoveredDiv.style.zIndex = 1000;
            let button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add('btn-sm');
            button.classList.add('btn-danger');
            button.onclick = () => this.deleteExposeElement(item)
            let icon = document.createElement('i');
            icon.classList.add('fa-solid');
            icon.classList.add('fa-trash-can');
            button.appendChild(icon);
            hoveredDiv.appendChild(button);
            return hoveredDiv;
        },
        deleteExposeElement(item) {
            const index = app.$data.bot.project.expose.form.findIndex(input => input.id == item.id);
            app.$data.bot.project.expose.form.splice(index, 1);
            const ul = document.getElementById('items');
            const li = ul.children[index];
            li.remove();
            this.editableCodeMirror.setValue(JSON.stringify(this.expose, null, 5))
            this.editingLabel = false

        },
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
        },
        addInput () {
            const inputToAdd = JSON.parse(JSON.stringify(this.typeOfInputs[this.inputSelected]))
            inputToAdd.title = {
                en: inputToAdd.title?.en + "'" + (this.variableSelected + "' ") || '',
                es: inputToAdd.title?.es + "'" + (this.variableSelected + "' ") || '',
                pr: inputToAdd.title?.pr + "'" + (this.variableSelected + "' ") || ''
            }
            inputToAdd.id = this.variableSelected
            app.addInputToExpose(inputToAdd)
            const ul = document.getElementById('items');
            li = this.createExposeElement(inputToAdd)
            ul.appendChild(li);
            this.editableCodeMirror.setValue(JSON.stringify(this.expose, null, 5))
            this.editingLabel = false
            
            this.inputSelected = null
            this.variableSelected = null
        }
    }
})