let isDragging = false;
let zoomLevel = 1;
let startMouseX;
let startMouseY;
let startContentLeft;
let startContentTop;
let firstTime = true;
var resetButtons = false;
var message = {
    type: 'iframe',
    commands: {}
}


const content = document.getElementById('content');
const restoreButton = document.getElementById('restoreButton');


function zoomIn() {
    zoomLevel += 0.1;
    content.style.transform = `scale(${zoomLevel})`;
}


function zoomOut() {
    zoomLevel -= 0.1;
    content.style.transform = `scale(${zoomLevel})`;
}


function closeVars() {
    document.getElementById('vars').style.display = 'none';
    document.getElementById('vars').style.visibility = 'hidden';

    // Reset buttons position
    if (resetButtons) {
        var buttons = document.querySelectorAll('button:not(#closeVars)');
        buttons.forEach(button => {
            var bottomStyle = window.getComputedStyle(button).bottom;
            bottomStyle = Number(bottomStyle.slice(0, -2));
            bottomStyle -= 220;
            button.style.bottom = bottomStyle + 'px';
        });
        resetButtons = false;
    }
}



document.addEventListener('mousedown', (event) => {
    isDragging = true;
    startMouseX = event.clientX;
    startMouseY = event.clientY;
    startContentLeft = content.offsetLeft;
    startContentTop = content.offsetTop;
    content.style.cursor = 'grabbing';

    restoreButton.style.display = 'block';
});

document.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - startMouseX;
    const deltaY = event.clientY - startMouseY;

    content.style.left = startContentLeft + deltaX + 'px';
    content.style.top = startContentTop + deltaY + 'px';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    content.style.cursor = 'grab';
});

document.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        content.style.cursor = 'grab';
    }
});

function restorePosition() {
    content.style.left = '0';
    content.style.top = '0';
    restoreButton.style.display = 'none';
    zoomLevel = 1;
    content.style.transform = `scale(${zoomLevel})`;
}

const urlFather = window.parent.location.href;

const url = new URL(urlFather);

const port = url.port;


const sub_url = url.hash.substring(1).split("/")

const db_name = sub_url[sub_url.length - 1];

const selectors = ['selectRobot0', 'selectRobot1', 'selectRobot2', 'selectRobot3', 'selectRobot4'];

for (const selector of selectors) {
    const selectRobot = document.getElementById(selector);

    selectRobot.addEventListener('change', () => {
        if (!message.commands) {
            message.commands = {};
        }
        message.commands[selector] = selectRobot.value;
        SendMessage();
    });

}


const maxRetries = document.getElementById('maxRetries');

maxRetries.addEventListener('change', () => {
    if (!message.commands) {
        message.commands = {};
    }
    message.commands['maxRetries'] = maxRetries.value;
    SendMessage();
});

let varsRobot = {};
let savedValues = {};

function saveValue(robotName, input) {
    var actualValue = input.value;
    var valueToSave = {id: input.id, value: actualValue};
    if (savedValues[robotName] === undefined) {
        savedValues[robotName] = [];
    }

    savedValues[robotName] = [...savedValues[robotName], valueToSave];

    input.setAttribute('value', actualValue);

    if (varsRobot[robotName] === undefined) {
            varsRobot[robotName] = [];
    }

    let varIndex = varsRobot[robotName].findIndex(function(el) {
        return el.id === input.id;
    });

    if (varIndex !== -1) {
        varsRobot[robotName][varIndex].value = actualValue;
    } else {
        varsRobot[robotName].push(valueToSave);
    }

    message.commands[robotName] = varsRobot[robotName];
    SendMessage();
}


let inputsHtml = [];
let bots = null;

function toggleRowsByInputClass(className, displayValue) {
    var rows = document.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
        var input = rows[i].querySelectorAll('input.' + className);
        if (input) {
            rows[i].style.display = displayValue;
        }
    }
}



var contentContainer = document.getElementById('vars');
var closeButton = '<button id="closeVars" onclick="closeVars()"><i class="fas fa-times"></i></button>';
var buttons = document.querySelectorAll('button:not(#closeVars)');





document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        var tabId = this.id;
        
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('tab-active');
        });
        this.classList.add('tab-active');

        if (!resetButtons) {
            buttons.forEach(button => {
                var bottomStyle = window.getComputedStyle(button).bottom;
                bottomStyle = Number(bottomStyle.slice(0, -2));
                bottomStyle += 220;
                button.style.bottom = bottomStyle + 'px';
            });
            resetButtons = true;
        }
        if (tabId == 'tab0') {
            contentContainer.className = 'selectRobot0'
        } else {
            let newClass = 'selectRobot' + tabId.charAt(tabId.length - 1);
            contentContainer.className = newClass;
        }
        contentContainer.style.display = 'block';
        contentContainer.style.visibility = 'visible';

        let tableHtml = '<table class="table table-striped">';
        inputsHtml.forEach(input => {
            tableHtml += input;
        });
        tableHtml += '</table>';
        contentContainer.innerHTML = '<h1 id="not-selected">ROBOT NO SELECCIONADO</h1>' + tableHtml + closeButton;

        for (const robotName in savedValues) {
            if (savedValues.hasOwnProperty(robotName)) {
                const robotValues = savedValues[robotName];
                const inputs = document.querySelectorAll('input.' + robotName);
                for (const input of inputs) {
                    for (const robotValue of robotValues) {
                        if (robotValue.id === input.id) {
                            input.value = robotValue.value;
                        }
                    }
                }
            }
        }
        bots.map(robot => {
            switch(tabId) {
                case 'tab0':
                    if (robot.name == document.getElementById('selectRobot0').value) {
                        if (robot.exposed.form.length === 0) {
                            contentContainer.innerHTML = '<h1>NO CONTIENE VARS EXPORTADAS</h1>' + closeButton;
                        } else {
                            document.getElementById('not-selected').style.display = 'none';
                            var rows = document.querySelectorAll('tr');
                            for (var i = 0; i < rows.length; i++) {
                                var input = rows[i].querySelector('input.' + robot.name);
                                if (input) {
                                    rows[i].style.display = '';
                                }
                            }
                            
                        }
                    }
                    break;
                case 'tab1':
                    contentContainer.className = 'selectRobot1';
                    if (robot.name == document.getElementById('selectRobot1').value) {
                        if (robot.exposed.form.length === 0) {
                            contentContainer.innerHTML = '<h1>NO CONTIENE VARS EXPORTADAS</h1>' + closeButton;
                        } else {
                            document.getElementById('not-selected').style.display = 'none';
                            var rows = document.querySelectorAll('tr');
                            for (var i = 0; i < rows.length; i++) {
                                var input = rows[i].querySelector('input.' + robot.name);
                                if (input) {
                                    rows[i].style.display = '';
                                }
                            }
                        }
                    }
                    break;
                case 'tab2':
                    contentContainer.className = 'selectRobot2';
                    if (robot.name == document.getElementById('selectRobot2').value) {
                        if (robot.exposed.form.length === 0) {
                            contentContainer.innerHTML = '<h1>NO CONTIENE VARS EXPORTADAS</h1>' + closeButton;
                        } else {
                            document.getElementById('not-selected').style.display = 'none';
                            var rows = document.querySelectorAll('tr');
                            for (var i = 0; i < rows.length; i++) {
                                var input = rows[i].querySelector('input.' + robot.name);
                                if (input) {
                                    rows[i].style.display = '';
                                }
                            }
                        }
                    }
                    break;
                case 'tab3':
                    contentContainer.className = 'selectRobot3';
                    if (robot.name == document.getElementById('selectRobot3').value) {
                        if (robot.exposed.form.length === 0) {
                            contentContainer.innerHTML = '<h1>NO CONTIENE VARS EXPORTADAS</h1>' + closeButton;
                        } else {
                            document.getElementById('not-selected').style.display = 'none';
                            var rows = document.querySelectorAll('tr');
                            for (var i = 0; i < rows.length; i++) {
                                var input = rows[i].querySelector('input.' + robot.name);
                                if (input) {
                                    rows[i].style.display = '';
                                }
                            }
                        }
                    }
                    break;
                case 'tab4':
                    contentContainer.className = 'selectRobot4';
                    if (robot.name == document.getElementById('selectRobot4').value) {
                        if (robot.exposed.form.length === 0) {
                            contentContainer.innerHTML = '<h1>NO CONTIENE VARS EXPORTADAS</h1>' + closeButton;
                        } else {
                            document.getElementById('not-selected').style.display = 'none';
                            var rows = document.querySelectorAll('tr');
                            for (var i = 0; i < rows.length; i++) {
                                var input = rows[i].querySelector('input.' + robot.name);
                                if (input) {
                                    rows[i].style.display = '';
                                }
                            }
                        }
                    }
                    break;
                
                }
            })
        
        
    });
});


var boxElements = document.querySelectorAll('.custom-row-one-1, .custom-row-one-2, .custom-row-two-1, .custom-row-two-2, .custom-row-three');


boxElements.forEach(function(element) {
    element.addEventListener('click', function() {
        var className = element.className;

        switch(className) {
            case 'custom-row-one-1':
                document.getElementById('tab0').click();
                break;
            case 'custom-row-one-2':
                document.getElementById('tab1').click();
                break;
            case 'custom-row-two-1':
                document.getElementById('tab2').click();
                break;
            case 'custom-row-two-2':
                document.getElementById('tab3').click();rr
                break;
            case 'custom-row-three':
                document.getElementById('tab4').click();
                break;
        }
    });
});