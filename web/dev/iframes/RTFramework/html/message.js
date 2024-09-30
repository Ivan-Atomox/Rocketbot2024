function dataHandler(e) {
    var t = new FormData;
    t.append("db", db_name)


    fetch(`http://localhost:${port}/getbots`, {
        method: 'POST',
        body: t
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    }).then(responseJson => {
        if ('bots' in responseJson){
            bots = responseJson.bots;
            // console.log("*** BOTS ***")
            // console.log(bots);
            
            for (let i = 0; i <= 4; i++) {
                const selectRobot = document.getElementById(`selectRobot${i}`);

                bots.map(robot => {
                    const option = document.createElement('option');
                    option.value = robot.name;
                    option.text = robot.name;
                    selectRobot.appendChild(option);
                })
            }

            bots.map(robot => {
                robot.exposed.form.map(form => {
                    
                    let formValue = '';
                    // console.log("MESSAGE: ", message)
                    let command = message.commands;
                    // console.log("FULL COMMAND: ", command)
                    if (command && command[robot.name]) {
                        // console.log("COMMAND: ", command[robot.name])
                        let formValueId = command[robot.name].find(function(el) {
                            // console.log("EL FOUND: ", el.id, form.id)
                            return el.id === form.id;
                        });
                        if (formValueId) {
                            formValue = formValueId.value;
                        }
                    }

                    inputsHtml.push(`<tr style="display: none;">
                                    <td style="width: 33%; text-align: right;">${form.title.en}</td>
                                    <td><input type="text" id="${form.id}" class="${robot.name}" name="${form.id}" style="width: 80%;" value="${formValue}" onchange="saveValue('${robot.name}', this)"></td>
                                    </tr>`)
                });
            })

            // console.log("*** INPUTS ***");
            // console.log(inputsHtml);

            
        } else {
            throw new Error('Something went wrong');
        }
    }).catch(error => {
        console.log('An error occurred')
        console.log(error);
    });

    let selectRobot0 = document.getElementById('selectRobot0')
    let selectRobot1 = document.getElementById('selectRobot1')
    let selectRobot2 = document.getElementById('selectRobot2')
    let selectRobot3 = document.getElementById('selectRobot3')
    let selectRobot4 = document.getElementById('selectRobot4')

    
    message.commands = e.data

    // console.log('Parent received message!: ', e.data)
    if (e.data && e.data.selectRobot0) {
        selectRobotWhenAvailable(selectRobot0, e.data.selectRobot0, 'selectRobot0')
    }
    if (e.data && e.data.selectRobot1) {
        selectRobotWhenAvailable(selectRobot1, e.data.selectRobot1, 'selectRobot1')
    } 
    if (e.data && e.data.selectRobot2) {
        selectRobotWhenAvailable(selectRobot2, e.data.selectRobot2, 'selectRobot2')
    }
    if (e.data && e.data.selectRobot3) {
        selectRobotWhenAvailable(selectRobot3, e.data.selectRobot3, 'selectRobot3')
    }
    if (e.data && e.data.selectRobot4) {
        selectRobotWhenAvailable(selectRobot4, e.data.selectRobot4, 'selectRobot4')
    }
    if (e.data && e.data.maxRetries) {
        selectMaxRetries(e.data.maxRetries)
    }

    return
}

function selectRobotWhenAvailable(selectElement, value, name) {
    let checkExist = setInterval(function() {
        let option = selectElement.querySelector(`option[value="${value}"]`);
        if (option) {
            //console.log('option: ', option)
            selectElement.value = value;
            message.commands[name] = value;
            SendMessage();
            clearInterval(checkExist);
        }
    }, 100); // check every 100ms

    setTimeout(function() {
        clearInterval(checkExist);
    }, 5000);
}

function selectMaxRetries(value) {
    let checkExist = setInterval(function() {
        let maxRetries = document.getElementById('maxRetries');
        if (maxRetries) {
            maxRetries.value = value;
            message.commands.maxRetries = value;
            SendMessage();
            clearInterval(checkExist);
        }
    }, 100); // check every 100ms

    setTimeout(function() {
        clearInterval(checkExist);
    }, 5000);

}

var message = {
    type: 'iframe',
    commands: {}
}

var SendMessage = function() {
    parent.postMessage(message, '*')
}

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"
var eventer = window[eventMethod]
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message"

eventer(messageEvent, dataHandler)

