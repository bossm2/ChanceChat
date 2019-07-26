function buttunmaker(buttun,plt){
    //bale
    if(plt == 'b'){
        var returns = [];
    for (var i = 0, len = buttun.length; i < len; i++) {
            var ort = {};
              ort.action = 0;
        if(buttun[i].length == 1){
        ort.text = buttun[i][0];
        ort.value = buttun[i][0];
            returns.push(ort);
        }
        else if(typeof buttun[i][0] != 'object'){
            ort.text = buttun[i][0];
            ort.value = buttun[i][1];
            returns.push(ort);
        }
        else{
        for (var j = 0, len2 = buttun[i].length; j < len2; j++) {
            var ort2 = {};
            ort2.action = 0;
        if(buttun[i][j].length == 1){
            ort2.text = buttun[i][j][0];
            ort2.value = buttun[i][j][0];
        }
        else{
            ort2.text = buttun[i][j][0];
            ort2.value = buttun[i][j][1];
        }
        returns.push(ort2);
        }
        }
            
    }
    return returns
    }
    //soroush
    else if(plt == 's' || plt == 'q'){
        var returns = [];
    for (var i = 0, len = buttun.length; i < len; i++) {
            var ort = {};
        if(buttun[i].length == 1){
            ort.text = buttun[i][0];
            ort.command = buttun[i][0];
            returns[i] = [ort];
        }
        else if(typeof buttun[i][0] != 'object'){
            ort.text = buttun[i][0];
            ort.command = buttun[i][1];
            returns[i] = [ort];
        }
        else{
        var ort3 = []; 
        
        for (var j = 0, len2 = buttun[i].length; j < len2; j++) {
            var ort2 = {};
        if(buttun[i][j].length == 1){
            ort2.text = buttun[i][j][0];
            ort2.command = buttun[i][j][0];
        }
        else{
            ort2.text = buttun[i][j][0];
            ort2.command = buttun[i][j][1];
        }
        ort3[j] = ort2
        }
        ort = ort3
        returns[i] = ort;
        }
    }
    return returns
    }
    //telegram
    else if(plt == 't'){
        var returns = [];
    for (var i = 0, len = buttun.length; i < len; i++) {
        if(buttun[i].length == 1){
            returns.push(['✅' + buttun[i]]);
        }
        else if(typeof buttun[i][0] != 'object'){
            returns.push(['✅' + buttun[i][0]]);
        }
        else{
        ret2 = [];
        for (var j = 0, len2 = buttun[i].length; j < len2; j++) {
        if(buttun[i][j].length == 1){
            ret2.push('✅' + buttun[i][j]);
        }
        else{
            ret2.push('✅' + buttun[i][j][0]);
        }
        }
        returns.push(ret2);
        }
    }
    // console.log(returns)
    return {reply_markup: JSON.stringify({keyboard:returns,resize_keyboard: true})};
    }
    //gap
    else if(plt == 'g'){
        var returns = [];
    for (var i = 0, len = buttun.length; i < len; i++) {
            var ort = {};
        if(buttun[i].length == 1){
            ort[buttun[i][0]] = buttun[i][0];
            returns[i] = [ort];
        }
        else if(typeof buttun[i][0] != 'object'){
            ort[buttun[i][1]] = buttun[i][0];
            returns[i] = [ort];
        }
        else{
        var ort3 = []; 
        
        for (var j = 0, len2 = buttun[i].length; j < len2; j++) {
            var ort2 = {};
        if(buttun[i][j].length == 1){
            ort2[buttun[i][j][0]] = buttun[i][j][0];
        }
        else{
            ort2[buttun[i][j][1]] = buttun[i][j][0];
        }
        ort3[j] = ort2
        }
        ort = ort3
        returns[i] = ort;
        }
    }
    return JSON.stringify({"keyboard":returns,"once":false})
    }
    //gap inline
    else if(plt == 'gi'){
        var returns = [];
    for (var i = 0, len = buttun.length; i < len; i++) {
            var ort = {};
        if(buttun[i].length == 1){
            ort.text = buttun[i][0];
            ort.cb_data = buttun[i][0];
            returns[i] = [ort];
        }
        else if(typeof buttun[i][0] != 'object'){
            ort.text = buttun[i][0];
            ort.cb_data = buttun[i][1];
            returns[i] = [ort];
        }
        else{
        var ort3 = []; 
        
        for (var j = 0, len2 = buttun[i].length; j < len2; j++) {
            var ort2 = {};
        if(buttun[i][j].length == 1){
            ort2.text = buttun[i][j][0];
            ort2.cb_data = buttun[i][j][0];
        }
        else{
            ort2.text = buttun[i][j][0];
            ort2.cb_data = buttun[i][j][1];
        }
        ort3[j] = ort2
        }
        ort = ort3
        returns[i] = ort;
        }
    }
    return JSON.stringify(returns)
    }
    //telegram inline
    else if(plt == 'ti'){
        var returns = [];
    for (var i = 0, len = buttun.length; i < len; i++) {
            var ort = {};
        if(buttun[i].length == 1){
            ort.text = buttun[i][0];
            ort.callback_data = buttun[i][0];
            returns[i] = [ort];
        }
        else if(typeof buttun[i][0] != 'object'){
            ort.text = buttun[i][0];
            ort.callback_data = buttun[i][1];
            returns[i] = [ort];
        }
        else{
        var ort3 = []; 
        
        for (var j = 0, len2 = buttun[i].length; j < len2; j++) {
            var ort2 = {};
        if(buttun[i][j].length == 1){
            ort2.text = buttun[i][j][0];
            ort2.callback_data = buttun[i][j][0];
        }
        else{
            ort2.text = buttun[i][j][0];
            ort2.callback_data = buttun[i][j][1];
        }
        ort3[j] = ort2
        }
        ort = ort3
        returns[i] = ort;
        }
    }
    return {reply_markup:JSON.stringify({keyboard:returns,resize_keyboard: true})};
    }
    
    }


class buttonclass {
	constructor(button) {
		this.b = buttunmaker(button, 'b');
		this.s = buttunmaker(button, 's');
		this.g = buttunmaker(button, 'g');
		this.t = buttunmaker(button, 't');
		this.gi = buttunmaker(button, 'gi');
		this.ti = buttunmaker(button, 'ti');
	}
}

exports.buttonclass = buttonclass;
