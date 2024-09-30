angular.module('rocketstudiowebApp')
    .controller('InitCtrl', function ($window, $scope, $rootScope, $http, Bots, Files, Languages, Config, $timeout, Updater) {
        $scope.files = [];
        $scope.modeAre = getCookie('theme');
        $scope.view_now = 0;
        $scope.file_count = 0;
        $scope.languages = [];
        $scope.lang = getCookie("language")
        $scope.config = {};
        $scope.new_bot_file = "robot.db";
        $scope.new_project_path = ""
        $scope.new_bot_encode = "";
        $scope.videos_youtube = [];
        $scope.validBotName = true;
        $scope.iframe_lang = "es";
        $scope.iframeIsLoaded = false
        $scope.author = ""
        $scope.updates = []
        Config.get(function (data) {
            $scope.config = data.data;
            if (!$scope.config.editor) {
                $scope.config['editor'] = {
                    theme: 'light',
                    lang: 'EN'
                }
                $scope.lang = 'EN';
            } else {
                $scope.lang = $scope.config.editor.lang
            }


            if (!$scope.config.server) {
                $scope.config['server'] = {
                    port: 5000,
                    logs: '/logs'
                }
            } else {
                if (!$scope.config.server['logs']) {
                    $scope.config.server['logs'] = '/logs'
                }
            }

            console.log($scope.lang)
            $scope.iframe_lang = $scope.lang.toLowerCase();
            if ($scope.lang == "pr") {
                $scope.iframe_lang = "en";
            }
            $scope.new_project_path = $scope.config.projects.path;
            // $("#licensepage").attr("src", $rootScope.license_page_url + $scope.iframe_lang + "?token=" + $rootScope.serial);
        })
        Languages.get(function (data) {
            const languages = [...new Set(data.data)];
            $scope.languages = languages;
        })
        $scope.ch = function (l) {
            setCookie("language", l.toLowerCase())
        }


        // $("#licensepage").attr("src", $rootScope.license_page_url + $scope.iframe_lang + "?token=" + $rootScope.serial);

        // $("#licensepage").on('load', function () {
        //     $scope.iframeIsLoaded = true
        //     if (!$scope.$$phase) $scope.$apply();
        // })

        // setTimeout(function(){
        //     let iframe = $("#licensepage");
        //     let iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        //     if (iframeDoc.readyState === 'complete') {
        //         $scope.iframeIsLoaded = true
        //         if (!$scope.$$phase) $scope.$apply();
        //     }
        // }, 100)

        Updater.get(function (data) {
            $scope.updates = data.data.components;
            $scope.readme = data.data.readme;
            // console.log($scope.updates, data)
            if($scope.updates.length > 0){
                $('#updateAlert').modal('show')
                $scope.showReadme()
            }
        })


        Files.get(function (data) {
            $scope.files = data.data.files;
            $scope.db = data.data.db;
            $scope.new_bot_encode = data.data.db;
            $scope.file_count = 0;
            for (var i = 0; i < data.data.files.length; i++) {
                if (data.data.files[i].type != 'filedb') {
                    $scope.file_count++;
                }
            }
        });

        $scope.showReadme = function () {
            Showdown.converter();
            const html = Showdown.makeHtml($scope.readme);
            $("#readme").html(html)
        }

        $scope.updateAll = function () {
            Updater.updateAll(function (data) {
                console.log(data)
            })
        }

        


        $scope.loadBot_ = function (file) {
            $("#modal_list_bots").on('hidden.bs.modal', function (e) {
                window.location.href = '/editor/#/edit/' + file.name + '/db/' + $scope.viewing.encode;
            });
            $("#modal_list_bots").modal('hide');
        }
        $scope.loadBot = function (data, force_type) {
            $rootScope.db = data.path;
            console.log(data)
            if (data.type == 'filedb') {
                $scope.viewing = data;
                Bots.getall(data.encode, function (data) {
                    console.log(data.data.bots)
                    $scope.file_bots = data.data;
                    if (!$scope.$$phase) $scope.$apply();

                    $("#modal_list_bots").modal();
                })
            } else {
                if (force_type == 'db') {
                    $rootScope.bot_type = "db";
                    window.location.href = '/editor/#/edit/' + data.name + '/' + data.type + '/' + data.encode;
                } else if (force_type == 'flow') {
                    window.location.href = '/flow?r=' + data.name + '&d=' + data.encode;
                } else {
                    if (data.type == 'flow') {
                        window.location.href = '/flow?r=' + data.name + '&d=' + data.encode;
                    } else {
                        $rootScope.bot_type = data.type;
                        window.location.href = '/editor/#/edit/' + data.name + '/' + data.type + '/' + data.encode;
                    }
                }
                // if(force_flow){
                //     window.location.href = '/flow?r=' + data.name + '&d=' + data.encode;
                // }
                // //data.type='db';
                // if(data.type == 'db' && !force_flow){

                // }

            }

        };
        $scope.removeFile = function (file) {

            Files.delete(file.id, function (data) {
                $scope.files = data.data.files;
                $scope.db = data.data.db;
                $scope.file_count = 0;
                for (var i = 0; i < data.data.files.length; i++) {
                    if (data.data.files[i].type != 'filedb') {
                        $scope.file_count++;
                    }
                }
            });
        };
        $scope.getBotFile = function () {
            Bots.getFile('', function (data) {
                if (data.data.encode) {
                    window.location.href = '/editor/#/edit/' + data.data.name + '/file/' + data.data.encode;
                }
            });
        };
        $scope.createBot = function () {
            console.log('MISHU', $scope.new_bot_type)
            if (!$rootScope.licensed) {
                window.location.href = "/"
                return
            }
            Bots.add($scope.new_bot_name, "", $scope.new_bot_description, $scope.new_bot_encode, function (data) {
                $("#newRobotModal").modal('hide');
                $("#newRobotModal").on('hidden.bs.modal', function (e) {
                    const url = $scope.new_bot_type === 'flow' ? `flow?r=${$scope.new_bot_name}&d=${$scope.new_bot_encode}` : `editor/#/edit/${$scope.new_bot_name}/db/${$scope.new_bot_encode}`
                    window.location.href = url;
                });
                $scope.new_bot_description = ""
            }, $scope.new_bot_type)
        }

        $scope.createProject = function () {
            if (!$rootScope.licensed) {
                window.location.href = "/"
                return
            }
            Bots.newProject($scope.new_bot_name, $scope.new_project_path, $scope.new_bot_description, $scope.author, function (data) {
                $("#newProjectModal").modal('hide');
                $("#newProjectModal").on('hidden.bs.modal', function (e) {
                    window.location.href = '/editor/#/edit/' + $scope.new_bot_name + '/db/' + data.data.db_path;
                });
                $scope.new_bot_description = ""
            }, function(err){
                console.log(err)
                alert(err.message)
            })

        }

        $scope.getDBFile = function () {
            Bots.getFileDB(false, function (data) {
                console.log(data);
                if (data.data.load) {
                    $scope.new_bot_file = data.data.filename;
                    $scope.new_bot_encode = data.data.encode;
                }

            });
        }
        $scope.getProject = function () {
            Files.getFolder(function (data) {
                console.log(data)
                if (data.data) {
                    $scope.new_project_path = data.data;
                }
            });
        }
        $scope.getNewDBFile = function () {
            Bots.getFileDB(true, function (data) {
                if (data.data.load) {
                    $scope.new_bot_file = data.data.filename;
                    $scope.new_bot_encode = data.data.encode;
                    $("#newDBModal").modal('hide')
                }
            });
        }
        $scope.getDB = function () {
            Bots.getFileDB(false, function (data) {
                if (data.data.load) {
                    data.data.type = "filedb";
                    data.data.path = data.data.filename;
                    $scope.loadBot(data.data);
                    //window.location.href = '#!/edit/'+data.data.name+'/db/' + data.data.encode;
                }
            });
        };
        $scope.mode = function (mode) {
            setCookie('theme', mode);
            $scope.config.editor.theme = mode
        };
        $scope.saveConfig = function () {
            console.log($scope.config);
            //document.location.reload();
            Config.set(JSON.stringify($scope.config), function (data) {
                console.log(data)
                document.location.reload();
            })
        };
        $scope.getFolder = function (d) {
            $http.get("/getfolder").then(function (res) {
                console.log(res, d)
                d = res.data
                $scope.config['server']['logs'] = res.data
                if (!$scope.$$phase) {
                    $scope.$apply()
                }
            })
        }

        $("#newRobotModal").on('shown.bs.modal', function (e) {
            $scope.new_bot_name = ""
            $scope.new_bot_description = ""
            $scope.new_bot_type = "studio"
            $scope.$apply();
        });
        $rootScope.viewLic = function () {
            $rootScope.licensed = false;
            $scope.view_now = 3;
            if (!$scope.$$phase) $scope.$apply();
        }
        $timeout(function () {
            $("body.page-loaded .loader-wrap ").fadeOut(1000);

            var clipboard = new ClipboardJS('.btn-copy');
            clipboard.on('success', function () {
                $("#copy-icon").removeClass('fa-copy').addClass('fa-check');
                $("#copy-token").removeClass('btn-primary').addClass('btn-success');
            })
            $("#checkLicence").on('click', function () {
                $.get(url_server + 'checkLicenseOK/' + $("#licencia").val(), function (data) {
                    console.log("check licence:", data);
                    if (data == "true") {
                        $.toast({
                            heading: 'Success',
                            text: 'La licencia se guardó con exito',
                            showHideTransition: 'slide',
                            icon: 'success',
                            afterHidden: function () {
                                location.href = "/?a=" + Date.now();
                            }
                        });
                    } else {
                        $.toast({
                            heading: 'Error',
                            text: 'La licencia es inválida',
                            showHideTransition: 'slide',
                            icon: 'error'

                        });
                    }
                })
            })
        })
    });
