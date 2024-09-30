    let getCommandByParamSearch = function(data,  data_to_search, setdata, iterable){
        
        let iterable_ = [];
        let search = function(data, data_to_search){      
            let ret, tmp_;
            for(let c =0; c < data.length; c++){        
                ret = false;
                var param = data[c];
                if( eval(data_to_search)){
                    if(setdata) {
                        data[c] = setdata;
                    }
                    ret = data[c];
                    
                    if(!iterable) return ret;          
                }
                if(data[c].children ){
                    tmp_ = search(data[c].children, data_to_search)
                    if(tmp_) ret = tmp_;
                    if(!iterable) return ret;
                }
                if(data[c].else){
                    tmp_ = search(data[c].else, data_to_search)
                    if(tmp_) ret = tmp_;
                    if(!iterable) return ret;
                }
                if(iterable){
                    if(ret) iterable_.push(ret);
                }
            }
        }
        let re_ = search(data, data_to_search);
        if(iterable && iterable_.length > 0) return iterable_;
        
        return re_;
    }

    let getStatistics = function(project){

    //Commands disabled
    let dis_ = getCommandByParamSearch(project.commands, "param['disabled']==true", null, true) || [];
    //Commands father alert

    let alert_ = getCommandByParamSearch(project.commands, "param['father']=='alert' ", null, true) || [];
    //Command father IF whth command empty
    let if_ = getCommandByParamSearch(project.commands, "param['father']=='evaluateIf' && param['command']==''", null, true) || [];
    //Command father FOR whth command empty
    let for_ = getCommandByParamSearch(project.commands, "param['father']=='for' && (!param['command'].includes('iterable') || !param['var'])  ", null, true) || [];
    //Command father evaluatewhile whth command empty
    let while_ = getCommandByParamSearch(project.commands, "param['father']=='evaluatewhile' && param['command']==''", null, true) || [];
    // Commands whithout command params
    let commands_ = getCommandByParamSearch(project.commands, "!param['command']  && !param['option']", null, true) || [];
    
    let if_danger = getCommandByParamSearch(project.commands, "param['father'].toLowerCase()=='evaluateif' && (!param['children'] || param['children'].length == 0)", null, true) || [];
    let open_browser = getCommandByParamSearch(project.commands, "param['father'].toLowerCase()=='use' || param['father'].toLowerCase()=='openbrowser' ", null, true)?.length || 0;
    let close_browser = getCommandByParamSearch(project.commands, "param['father'].toLowerCase()=='killdriver' ", null, true)?.length || 0;
    let open_browser_warning = open_browser - close_browser;
    
    let total_ =  getCommandByParamSearch(project.commands, "param['father']", null, true).length;
    let commands_data  ={
        total: total_,
        disabled: dis_.length ,
        warning_by:{
            command_porcent_disabled: Math.round((dis_.length * 100) / total_),
            alerts_command: alert_.length,
            alert_list: alert_.map((item)=>item.id),
            commands_without_command: commands_.length,
            open_browser_warning: open_browser_warning,
            open_browser: open_browser,
            close_browser: close_browser,
        },
        danger_by:{
            if_param_empty: if_?.length || 0,
            if_empty: if_danger?.length || 0,
            for_param_empty: for_?.length || 0,
            while_param_empty: while_?.length || 0,
            if_danger_list: if_danger?.map((item)=>item.id) || [],
            if_param_empty_list: if_?.map((item)=>item.id) || [],
            for_param_empty_list: for_?.map((item)=>item.id) || [],
            while_param_empty_list: while_?.map((item)=>item.id) || [],
        }
    }
     dis_, alert_, if_, for_, while_, total_, commands_ = null;
    return commands_data;
}