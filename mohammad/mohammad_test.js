//#اولین کامیت حاج ممد
//#region variables
var EventSource = require("eventsource");
var request = require('requestretry');
var express = require('express');
var bodyParser = require('body-parser');
var NodeWebSocket = require("ws");
const ReconnectingWebsocket = require('reconnecting-websocket');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mysql = require('mysql');
var fs = require('fs');
var https = require('https');
var key = {};
var wait_bale = [];

//#endregion
//#region Error Handling...
// process.stdin.resume();
// function exitHandler(e){
// 	console.log(e);
//  }

// process.on('exit', function(e) {
// exitHandler(e)
//   });
process.on('uncaughtException', function(e) {
	console.log(e);
	fs.appendFile('/root/node/Error.txt', (JSON.stringify(e) + "\r\n") , function (err) {
		if (err) console.log(err);
		process.exit();
	});
	});
	//test change
//#endregion
//#region main token...
// const ttoken = '686260796:AAHf5GTSQBLTDGu-POkQTliA_NCfbEga814';
// const gtoken = '5d82f9a31d2371743e015cf8d4095a861569a48b57e625a08e6411e643e54e01'
// const btoken = 'wss://api.bale.ai/v1/bots/34ee5d5573c7371338b34c3c6e6d07af2c8ccfe8'
// const stoken = "https://bot.sapp.ir/piKBXezlook7Evje1bCOzgsp3_pnPKKCa077j3rl_Pf8_htFcHAujrj5eGLRrOXpUyG9f297uuHO6QNxkNOhOkCfB7K-LLhh9SgheCQDFqXcaKmNHfxy18L8GglU8dteoFF7LLfJQhp9REln";
// const s2token = "https://bot.sapp.ir/iZVYt6vAeA9XPR1rAgM6oUMDM8u7TJoHb8Luyyh4iUQJlcqNgpHIMe1sULtKM438FRGZ0xKVIM5k92-6dhuw3_Dej7set2eICq6l5ET2AWB7hCJPgm-LCHR2uidQ9jFC6df79blZx-WekhtR";
//#endregion
//#region test token...
const ttoken = '662419635:AAH-Oi0jr3GZPB0vNZSCVZ8NB1zH49Y4sXU';
const gtoken = '73f0bc691e635189577ade8eab87eaf2cfad413e642453b4858f334569e14446';
const btoken = 'wss://api.bale.ai/v1/bots/56b035d4df0f5350b448485827503fda26e6378f';
const stoken = "https://bot.sapp.ir/tbpkkKuiex7GJiNEaennstVYK1s16_yGaiHWQOUCFkAuzxNrpdTVZ56uJmw82M40foT2p4zTbWkIA5r24ijQXnE8SpJOnYWfdnTfrXglXy2qcxazqfOJmvveZFTy6Km-scpYEmSCCmhvNyRR";
const s2token = "https://bot.sapp.ir/9VHRKjA5AfkYu8Lsvhe88TevaIapjWdQxLPNCkd_3QvIcH62bwJQfuunU0nLPCLuwt-ID6OuNlu8HArZjcwzd1DyXfUMGfl5TTkYQuV2Qy4g-HGLfBchXt6ZmjY-1Q9sma6aFB0hG_U8eH8K";
//#endregion
//#region Connect to Bots and Messages...
//#region Button Definition...
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
  constructor(button){
  this.b = buttunmaker(button,'b');
	this.s = buttunmaker(button,'s');
	this.g = buttunmaker(button,'g');
	this.t = buttunmaker(button,'t');
	this.gi = buttunmaker(button,'gi');
	this.ti = buttunmaker(button,'ti');
  }
}
 key.start = new buttonclass([[["شروع چت تصادفی","/runcommand"],["تنظیمات و راهنما","/setting"]]]);
 key.startgap = new buttonclass([["✅شروع چت تصادفی","/runcommand"]]);
 key.stop = new buttonclass([["انصراف","/backcommand"]]);
 key.command = new buttonclass([[["چت جدید","/runcommand"],["بازگشت","/backcommand"]]]);
 key.setting = new buttonclass([[["بلاک کردن","/blocking"],["راهنما","/help"]],[["بلاک و گزارش تخلف","/report"],["بازگشت","/backcommand"]]]);
 key.yon = new buttonclass([[["بله","/yes"],["خیر","/no"]]]);
//#endregion
const RECONNECTING_OPTIONS = {
  connectionTimeout: 5000,
  constructor: typeof window !== 'undefined' ? WebSocket : NodeWebSocket,
  debug: true,
  maxReconnectionDelay: 4000,
  maxRetries: Infinity,
  minReconnectionDelay: 10,
  reconnectionDelayGrowFactor: 1.3,
};
RECONNECTING_OPTIONS.WebSocket = require('ws');
const socket = new ReconnectingWebsocket(
  () => btoken,
  undefined,
  RECONNECTING_OPTIONS
);
socket.addEventListener('open', () => {
    console.log('connected');
});
socket.addEventListener('close', (e) => {
    console.log(e);
});
socket.addEventListener('error', (e) => {
	console.log(e);
});
var evtSource = new EventSource((stoken + "/getMessage"), { Header: {"Content-Type": "application/stream+json", "Accept": "application/stream+json",'Connection': 'keep-alive'}});
var evtSource2 = new EventSource((s2token + "/getMessage"), { Header: {"Content-Type": "application/stream+json", "Accept": "application/stream+json",'Connection': 'keep-alive'}});
var tmp = {};
var atmp = {};
var queue = new Set();

const Slimbot = require('slimbot');
const bot = new Slimbot(ttoken);
var notsupportsmg = '⚡️پیام ربات: ارسال پیام های غیر متنی صرفا در پیام رسان های همسان پشتیبانی می شود.'
var blocktitle = "شما به دلیل نقض قوانین بلاک شده اید! لطفا به اصلاح خود بپردازید."
var counttitle = "در هر ساعت تنها 10 چت می توانید انجام دهید!\nلطفا یک ساعت دیگر وارد بات شوید یا با ادمین (@Orotat) جهت اعتبار سنجی تماس حاصل فرمایید."
var	waittitle = "⚠️تا زمان ورود شخص دیگر لطفا منتظر بمانید!";
var starttitle = "👥 هم اکنون می توانید چت را شروع کنید!\n📩 لازم به ذکر است ارسال پیام های غیر متنی مانند تصویر و ویدئو در پیام رسان غیر همسان و تلگرام پشتیبانی نمی شود."
var welcometitle = `🌺به بات چت تصادفی خوش آمدید.🌺
💫برای شروع چت با شخص دیگر به طور تصادفی بر روی "شروع چت تصادفی" کلیک کنید.
💫مشخصات شما بطور کامل ناشناس است و بات نیز به ذخیره مشخصات شما نمی پردازد.🕶
💫شما با استفاده از بات چت تصادفی می توانید با کاربران پیام رسان های دیگر نیز چت کنید.
💫بات چت تصادفی در پیام رسان های سروش(برترین پیام رسان ایرانی)، بله، گپ و تلگرام با نام @ChanceChatBot قابل استفاده است.
💫ارتباط با ما: @Orotat`
var helptitle = `💫شما در هر ساعت می توانید 10 چت را انجام دهید.
💫مشخصات شما بطور کامل ناشناس است و بات نیز به ذخیره مشخصات شما نمی پردازد.🕶
💫برای بلاک کردن آخرین فردی که چت کرده اید یا در حال چت هستید، از گزینه "بلاک کردن" استفاده کنید.
💫آدرس چت تصادفی در پیام رسان های مختلف:
سروش: @ChanceChatBot
تلگرام: @ChanceChatBot
گپ: @ChanceChatBot
بله: @ChanceChatBot
💫ارتباط با ما: @Orotat`
var settingtitle = "لطفا یکی از گزینه ها را  انتخاب کنید."
var isbloctitle = "آیا مایل به بلاک کردن آخرین فردی که با آن چت کرده اید یا هم اکنون چت می کنید هستید؟"
var isreptitle = `
آیا مایل به گزارش تخلف آخرین فردی که با آن چت کرده اید یا هم اکنون چت می کنید هستید؟
عملکرد گزارش به نحوی است که اگر شخصی توسط 3 نفر گزارش داده شود، از سمت بات برای همیشه بلاک می گردد. (بات امکان امکان پایش بر روی محتوای پیام ها را ندارد!)`
var canceltitle = "🌑 متاسفانه شخص مقابل شما از ادامه چت انصراف داده است."
// const SDK = require("balebot");
// const BaleBot = SDK.BaleBot;
// const TextMessage = SDK.TextMessage;
// const User = SDK.User;
// const SimpleTemplate = SDK.SimpleTemplate;
// const TemplateMessage = SDK.TemplateMessage;
// const Button = SDK.ButtonElement;

//count : chat counts per hour : maximum number to chat in an hour is 10.
//wait : 
//bloc : tocken of blocked people , if a person block someone will add his token to this string
//state : 0 : block, 1 = normal , 2 : plus
//lastchat : the last user tocken whom he/she chat with
class tmpclass {
  constructor(){
  this.count = 0;
	this.wait = '';
	this.bloc = '';
	this.state = 1;
	this.lastchat = '';
  }
}
//sample JSON 
class balejs {
  constructor(text, usertocken, keyboard){
		var x = usertocken.slice(2).split('|');
  this.$type = "Request";
	this.body = {
		"$type": "SendMessage",
		"randomId": (Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString()),
		"peer": {
			"$type": "User",
			"accessHash": x[1],
			"id": x[0]
		},
		"message": {
			"$type": "TemplateMessage",
			"templateMessageId": "0",
			"generalMessage": {
			"text": text,
			"$type": "Text"
			},
			"btnList": keyboard
		},
		"quotedMessage": null
	};
	this.service = 'messaging';
	this.id = '0';
  }
}
class balesenphoto {
  constructor(fileId,accessHash,size, usertocken,prop){
		var x = usertocken.slice(2).split('|');
  this.$type = "Request";
	this.body = {
		"$type": "SendMessage",
		"randomId": (Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString()),
		"peer": {
			"$type": "User",
			"accessHash": x[1],
			"id": x[0]
		},
		"message": {
			"$type": "TemplateMessage",
			"templateMessageId": "0",
			"generalMessage": {
			"mimeType":"image/jpeg",
			"fileSize": size.toString(),
			"fileId": fileId,
			"name": prop.n,
			"accessHash": accessHash.toString(),
			"$type": "Document",
			"fileStorageVersion": 1,
			"caption": {
				"$type": "Text",
				"text": ''
			 },
			 "thumb": {
				"height": prop.h,
				"thumb": "None",
				"width": prop.w
			 },
			 "ext": {
				"$type": "Photo",
				"height": prop.h,
				"width": prop.w
			 },
			 "checkSum": "checkSum",
			 "algorithm": "algorithm"
			},
			"btnList": key.stop.b
		},
		"quotedMessage": null
	};
	this.service = 'messaging';
	this.id = '0';
  }
}
class balesend_doc {
  constructor(fileId,accessHash,size, usertocken,prop){
		var x = usertocken.slice(2).split('|');
  this.$type = "Request";
	this.body = {
		"$type": "SendMessage",
		"randomId": (Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString()),
		"peer": {
			"$type": "User",
			"accessHash": x[1],
			"id": x[0]
		},
		//"message": {
			//"$type": "TemplateMessage",
			//"templateMessageId": "0",
			"message": {
			"mimeType":"?/?",
			"fileSize": size.toString(),
			"fileId": fileId,
			"name": prop.n,
			"accessHash": accessHash.toString(),
			"$type": "Document",
			"fileStorageVersion": 1,
			"caption": {
				"$type": "Text",
				"text": ''
			 },
			 thumb: null,
			 ext: null,
			 "checkSum": "checkSum",
			 "algorithm": "algorithm"
		//	},
			//"btnList": key.stop.b
		},
		"quotedMessage": null
	};
	this.service = 'messaging';
	this.id = '0';
  }
}
class baleurljs {
  constructor(fileType,fileId, userId,id){
  this.$type = "Request";
	this.body = {
		"$type": "GetFileDownloadUrl",
		"fileId" : fileId,
		"userId" : userId.toString(),
		"fileVersion" : 1,
		"isServer" : false,
		"isResumeUpload" : false,
		"fileType" : fileType
		};
	this.service = 'files';
	this.id = id;
  }
}
class baleserverjs {
  constructor(fileType,size,id){
  this.$type = "Request";
	this.body = {
		"$type": "GetFileUploadUrl",
		"size" : size,
		"crc" : id,
		"isServer" : false,
		"fileType" : fileType
		};
	this.service = 'files';
	this.id = id;
  }
}
function myRetryStrategy(err, response, body, options){
	return (typeof body == 'undefined' || (err != null));
}
evtSource.onerror = function(err) {
	if (err) console.log(err);
 }
evtSource2.onerror = function(err) {
	if (err) console.log(err);
 }
 //conection string mysql
 var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!@#123qweQWE",
  database: "chat2",
  multipleStatements: true
  });
//connect to mysql 
con.connect(function(err) {
  if (err) console.log(err);
  })
con.on('error', function(err) {
  if (err) console.log(err);
});
//#endregion
//#region  Commands...
//run commands
function get_tmp(){
	request({
		url: ("https://api.github.com/repos/bossm/chancechat/contents/mig.txt"),
		method: "GET",
		headers: {
		"Authorization": "Bearer 7103c1eba87ca6dc1365716f80a4b0b21a62abf8",
		'user-agent': 'node.js'
		},
	json: true,
	maxAttempts: 50,
	retryDelay: 5000,  
	retryStrategy: myRetryStrategy
	}, function (error, response, body){
		console.log(body)
	if(error){console.log(error);}
	let tq = JSON.parse(Buffer.from(body.content, 'base64').toString('ascii'))
	queue = new Set(tq.queue);
	atmp = tq.atmp
	console.log(atmp)
	});
	}
	get_tmp()
	function save_tmp(){
		request({
				url: ("https://api.github.com/repos/bossm/chancechat/contents/mig.txt"),
				method: "GET",
				headers: {
				"Authorization": "Bearer 7103c1eba87ca6dc1365716f80a4b0b21a62abf8",
				'user-agent': 'node.js'
				},
			json: true,
			maxAttempts: 50,
			retryDelay: 5000,  
			retryStrategy: myRetryStrategy
		}, function (error, response, body){
			if(error){console.log(error);}
			request({
				url: ("https://api.github.com/repos/bossm/chancechat/contents/mig.txt"),
				method: "put",
				headers: {
				"Authorization": "Bearer 7103c1eba87ca6dc1365716f80a4b0b21a62abf8",
				'user-agent': 'node.js',
				'Content-Type':'application/json'
				},
		 json: true,
				body: {
				"message": "test",
				"content": (Buffer.from(JSON.stringify({'atmp':atmp,'queue':Array.from(queue)})).toString('base64')),
				"sha": (body.sha)
			},
			maxAttempts: 50,
			retryDelay: 5000,  
			retryStrategy: myRetryStrategy
		}, function (error, response, body){
			if(error){console.log(error);}
		});
		});
		}
		//test change
	// setInterval(function(){save_tmp()} ,1500)
	//com_define : check if a usertocken id duplicated or not , if not added to tmp and db for future use.
function com_define(usertocken){
		if (typeof tmp[usertocken] === 'undefined') {
			tmp[usertocken] = new tmpclass();
			qinsert(usertocken);
			}
			// else if(atmp[atmp[usertocken]]){
			// atmp[atmp[usertocken]] = new tmpclass();
			// }
	}
function smg_log(tobody){
	fs.appendFile('/root/node/messages.txt', (JSON.stringify(tobody) + "\r\n"), function (err) {
		if (err) console.log(err);
	});
}
function com_run(usertocken){
	if(usertocken[0] == 'q'){
	sendMessage2(usertocken,welcometitle,"TEXT",key.start.s);
 }
	else if(usertocken[0] == 's'){
	sendMessage(usertocken,welcometitle,"TEXT",key.start.s);
 }
	else if(usertocken[0] == 't'){
	bot.sendMessage(usertocken.slice(2), welcometitle, key.start.t);
	}
	else if(usertocken[0] == 'g'){
	sendgap(usertocken,welcometitle,'text',key.start.g);
	}
	else if(usertocken[0] == 'b'){
	sendbale(welcometitle,usertocken,key.start.b);
	}
	//  zeroobject(usertocken);
}
//remove commands 
function com_remove(usertocken){
	if(usertocken[0] == 'q'){
		sendMessage2(usertocken,canceltitle,"TEXT")
	 }
	 else if(usertocken[0] == 's'){
		sendMessage(usertocken,canceltitle,"TEXT")
	 }
	else if(usertocken[0] == 't'){
		bot.sendMessage(usertocken.slice(2), canceltitle);
	}
	else if(usertocken[0] == 'g'){
		sendgap(usertocken,canceltitle,'text',key.startgap.g);
	}
	else if(usertocken[0] == 'b'){
		sendbale(canceltitle,usertocken,key.startgap.b);
	}
}
//the commands
function thecommand(usertocken,title,from){
if (typeof from !== 'undefined') {
switch (from) {
  case 'b':
	title += "\n شما با شخصی در پیام رسان 👈بله👉 چت می کنید.";
    break;
  case 'g':
    title += "\n شما با شخصی در پیام رسان 👈گپ👉 چت می کنید.";
    break;
  case 's':
    title += "\n شما با شخصی در پیام رسان 👈سروش👉 چت می کنید.";
    break;
  case 'q':
    title += "\n شما با شخصی در پیام رسان 👈سروش👉 چت می کنید.";
    break;
  case 't':
    title += "\n شما با شخصی در پیام رسان 👈تلگرام👉 چت می کنید.";
    break;
}
}
	if(usertocken[0] == 'q'){
	sendMessage2(usertocken,title,"TEXT",key.command.s)	
	}
	else if(usertocken[0] == 's'){
	sendMessage(usertocken,title,"TEXT",key.command.s)	
	}
	else if(usertocken[0] == 't'){
	bot.sendMessage(usertocken.slice(2),title, key.command.t);
   }
	else if(usertocken[0] == 'g'){
		sendgap(usertocken,title,'text');
		// ,'{"keyboard":[[{"runcommand": "✅چت جدید"},{"backcommand":"✅بازگشت"}]],"once":false,"selective":false}'
	}
	else if(usertocken[0] == 'b'){
		sendbale(title,usertocken,key.command.b);
	}
 }
//the settings
function thesetting(usertocken,title){
	if(usertocken[0] == 'q'){
		sendMessage2(usertocken,title,"TEXT",key.setting.s)	
	}
	else if(usertocken[0] == 's'){
		sendMessage(usertocken,title,"TEXT",key.setting.s)	
	}
	else if(usertocken[0] == 't'){
		bot.sendMessage(usertocken.slice(2),title,key.setting.t);
	}
	else if(usertocken[0] == 'g'){
		sendgap(usertocken,title,'text',key.setting.g);
		// ,'{"keyboard":[[{"runcommand": "✅چت جدید"},{"backcommand":"✅بازگشت"}]],"once":false,"selective":false}'
	}
	else if(usertocken[0] == 'b'){
		sendbale(title,usertocken,key.setting.b);
	}
}
//the block confirmition
function theblock(usertocken,title){
	if(usertocken[0] == 'q'){
		sendMessage2(usertocken,title,"TEXT",key.yon.s)	
		}
		else if(usertocken[0] == 's'){
		sendMessage(usertocken,title,"TEXT",key.yon.s)
		}
		else if(usertocken[0] == 't'){
		bot.sendMessage(usertocken.slice(2),title, key.yon.t);
	   }
		else if(usertocken[0] == 'g'){
			sendgap(usertocken,title,'text',key.yon.g);
			// ,'{"keyboard":[[{"runcommand": "✅چت جدید"},{"backcommand":"✅بازگشت"}]],"once":false,"selective":false}'
		}
		else if(usertocken[0] == 'b'){
			sendbale(title,usertocken,key.yon.b);
		}
}
//massage sender function
function sendMessage(usertocken,title,type,keyboard){
request({
    url: (stoken + "/sendMessage"),
    method: "POST",
    headers: {
		"Content-Type": "Application/json",
		"Accept": "Application/json"
    },
	json: true,
    body: {
    "to": usertocken.slice(2),
    "type": type,
    "body": title,
	"keyboard": keyboard
	},
	maxAttempts: 50,
	retryDelay: 5000,  
	retryStrategy: myRetryStrategy
}, function (error, response, body){
console.log(body);
});
}
//massage sender function
function sendMessage2(usertocken,title,type,keyboard){
request({
    url: (s2token + "/sendMessage"),
    method: "POST",
    headers: {
		"Content-Type": "Application/json",
		"Accept": "Application/json"
    },
	json: true,
    body: {
    "to": usertocken.slice(2),
    "type": type,
    "body": title,
	"keyboard": keyboard
	},
	maxAttempts: 50,
	retryDelay: 5000,  
	retryStrategy: myRetryStrategy
}, function (error, response, body){
console.log(body);
});
}
//zero objects
function zeroobject(usertocken){
	if(queue.has(usertocken)){queue.delete(usertocken);}
	if(atmp[usertocken]){
		if(queue.has(atmp[usertocken])){queue.delete(atmp[usertocken]);}
		com_remove(atmp[usertocken]);
		com_run(atmp[usertocken]);
		delete atmp[atmp[usertocken]];
		delete atmp[usertocken];
	}
}
//run commands functions
function runcommands(usertocken)
{
		// send text to another user
		if(tmp[usertocken].state == 0){
			thecommand(usertocken,blocktitle);
		}
		else if(tmp[usertocken].count > 10 && (tmp[usertocken].state != 2)){
			thecommand(usertocken,counttitle);
		}
		else{
			zeroobject(usertocken);
			 if((queue.size == 0)){
				queue.add(usertocken);
				thecommand(usertocken,waittitle);
			 }
			else if(queue.has(usertocken)){
				thecommand(usertocken,waittitle);
			}
			else{
				var q = ''
				for (var value of queue) {
					if(queue.size != 0){
					if((tmp[value].bloc.indexOf(usertocken) == -1) && !(q)){q = value;queue.delete(q);}
				}
				else{q = value;queue.delete(q);}
			}
				if (q != ''){
					tmp[usertocken].count += 1;
					tmp[q].count += 1;
					atmp[usertocken] = q;
					atmp[q] = usertocken;
					tmp[q].lastchat = usertocken;
					tmp[usertocken].lastchat = q;
					thecommand(usertocken,starttitle,(atmp[usertocken])[0]);
					thecommand(atmp[usertocken],starttitle,usertocken[0]);
					qhistory(usertocken,atmp[usertocken]);
				}
				else{
					queue.add(usertocken);
					thecommand(usertocken,waittitle);
				}
			}
		}
}
//the block confirmition
function acceptdoing(usertocken){
	if(tmp[usertocken].wait == '/blocking'){
		tmp[usertocken].wait = '';
		if(tmp[usertocken].lastchat != ''){
		tmp[usertocken].bloc = tmp[usertocken].bloc + tmp[usertocken].lastchat;
		tmp[tmp[usertocken].lastchat].bloc = tmp[tmp[usertocken].lastchat].bloc + usertocken;
		qblock(usertocken);
		qblock(tmp[usertocken].lastchat);
		tmp[usertocken].lastchat = '';
		}
		zeroobject(usertocken);
	}
	else if(tmp[usertocken].wait == '/report'){
		tobody = {
			'what': 'reportingby',
			'by': usertocken,
			'who': tmp[usertocken].lastchat
		}
		smg_log(tobody);
		tmp[usertocken].wait = '';
		if(tmp[usertocken].lastchat != ''){
		tmp[usertocken].bloc = tmp[usertocken].bloc + tmp[usertocken].lastchat;
		tmp[tmp[usertocken].lastchat].bloc = tmp[tmp[usertocken].lastchat].bloc + usertocken;
		qblock(usertocken);
		qblock(tmp[usertocken].lastchat);
		tmp[usertocken].lastchat = '';
		}
		zeroobject(usertocken);
	}
}
//#endregion
//#region  file stream...
//massage sender function
function smg(usertocken,tobody,plt){
	console.log(tobody);
	var textsmg = '';
	if(plt == 's' || plt == 'q'){
		if( tobody.type == 'TEXT'){textsmg = tobody.body}
		else if(tobody.fileType == 'IMAGE'){simage('p',usertocken,stoken + '/downloadFile/' + tobody.fileUrl,doc_prop('p','s',tobody))}
		else if(tobody.type == 'FILE'){simage('f',usertocken,stoken + '/downloadFile/' + tobody.fileUrl,doc_prop('f','s',tobody))}
		else{textsmg = notsupportsmg}
	}
	else if(plt == 't'){
		if( typeof tobody.text != 'undefined'){textsmg = tobody.text}
		else if(typeof tobody.photo != 'undefined'){gettelf('p',tobody).then(address => simage('p',usertocken,address,doc_prop('p','t',tobody))).catch(	error => {});}
		else if(typeof tobody.document != 'undefined'){gettelf('f',tobody).then(address => simage('f',usertocken,address,doc_prop('f','t',tobody))).catch(	error => {});}
		else if(typeof tobody.audio != 'undefined'){gettelf('a',tobody).then(address => simage('f',usertocken,address,doc_prop('a','t',tobody))).catch(	error => {});}
		else if(typeof tobody.voice != 'undefined'){gettelf('v',tobody).then(address => simage('f',usertocken,address,doc_prop('v','t',tobody))).catch(	error => {});}
		else if(typeof tobody.video_note != 'undefined'){gettelf('vn',tobody).then(address => simage('f',usertocken,address,doc_prop('vn','t',tobody))).catch(	error => {});}
		else if(typeof tobody.video != 'undefined'){gettelf('c',tobody).then(address => simage('f',usertocken,address,doc_prop('c','t',tobody))).catch(	error => {});}
		else{textsmg = notsupportsmg;console.log('a')}
	}
	else if(plt == 'g'){
		if( tobody.type == "text"){textsmg = tobody.data;}
		else if(tobody.type == "image"){simage('p',usertocken,(JSON.parse(tobody.data)).path,doc_prop('p','g',JSON.parse(tobody.data)))}
		else if(tobody.type == "file" || tobody.type == "audio" || tobody.type == "video"){simage('f',usertocken,(JSON.parse(tobody.data)).path,doc_prop('f','g',JSON.parse(tobody.data)))}
		else{textsmg = notsupportsmg}
	}
	else if(plt == 'b'){
		if( typeof tobody.body.message.text != 'undefined'){textsmg = tobody.body.message.text;}
		else if(tobody.body.message.$type == 'Document' && tobody.body.message.mimeType == 'image/jpeg'){wait_bale = [getbalef("photo",tobody.body.message.fileId,tobody.body.message.accessHash),'geturl',usertocken,doc_prop('p','b',tobody),'p']}
		else if(tobody.body.message.$type == 'Document'){wait_bale = [getbalef('file',tobody.body.message.fileId,tobody.body.message.accessHash),'geturl',usertocken,doc_prop('f','b',tobody),'f']}
		else{textsmg = notsupportsmg}
	}
if(textsmg != ''){
	if(usertocken[0] == 's'){
		sendMessage(usertocken,textsmg,'TEXT');
	}
	else if(usertocken[0] == 'q'){
		sendMessage2(usertocken,textsmg,'TEXT');
	}
	else if(usertocken[0] == 'g'){
		sendgap(usertocken,textsmg,'text');
	}
	else if(usertocken[0] == 't'){
		bot.sendMessage(usertocken.slice(2), textsmg);
	}
	else if(usertocken[0] == 'b'){
		sendbale(textsmg,usertocken);
	}
	tobody.from = atmp[usertocken];
	tobody.to = usertocken;
	smg_log(tobody);
}
}
function doc_prop(fileType,plt,jsoncontent){
	var prop = [];
	if(plt == 's'){
		prop.s = jsoncontent.fileSize;
		if(fileType == 'p'){
		prop.w = jsoncontent.imageWidth;
		prop.h = jsoncontent.imageHeight;
		}
		prop.n = jsoncontent.fileName;
	}
	else if(plt == 't'){
		
		if(fileType == 'p'){
		prop.s = (jsoncontent.photo[0]).file_size;
		prop.w = (jsoncontent.photo[0]).width;
		prop.h = (jsoncontent.photo[0]).height;
		prop.n = (jsoncontent.photo[0]).file_id + '.jpeg';
	}
	if(fileType == 'f'){
		prop.s = (jsoncontent.document).file_size;
		prop.w = (jsoncontent.document).width;
		prop.h = (jsoncontent.document).height;
		prop.n = (jsoncontent.document).file_name;
	}
	if(fileType == 'a'){
		prop.s = (jsoncontent.audio).file_size;
		prop.w = (jsoncontent.audio).width;
		prop.h = (jsoncontent.audio).height;
		prop.n = (jsoncontent.audio).file_id + '.mp3';
	}
	if(fileType == 'v'){
		prop.s = (jsoncontent.voice).file_size;
		prop.w = (jsoncontent.voice).width;
		prop.h = (jsoncontent.voice).height;
		prop.n = (jsoncontent.voice).file_id + '.mp3';
	}
	if(fileType == 'vn'){
		prop.s = (jsoncontent.video_note).file_size;
		prop.w = (jsoncontent.video_note).width;
		prop.h = (jsoncontent.video_note).height;
		prop.n = (jsoncontent.video_note).file_id + '.mp4';
	}
	if(fileType == 'c'){
		prop.s = (jsoncontent.video).file_size;
		prop.w = (jsoncontent.video).width;
		prop.h = (jsoncontent.video).height;
		prop.n = (jsoncontent.video).file_id + '.mp4';
	}
}
	else if(plt == 'g'){
		prop.s = jsoncontent.filesize;
		if(fileType == 'p'){
		prop.w = jsoncontent.width;
		prop.h = jsoncontent.height;
		}
		prop.n = jsoncontent.filename;
}
	else if(plt == 'b'){
		prop.s = jsoncontent.body.message.fileSize;
		if(fileType == 'p'){
		prop.w = jsoncontent.body.message.ext.width;
		prop.h = jsoncontent.body.message.ext.height;
		}
		prop.n = jsoncontent.body.message.name;
	}
	return prop
}
function file_s(fileType,usertocken,res,url,prop){
// console.log(fileType);
// console.log(usertocken);
// console.log(url);
  request.post({
    url: url + '/uploadFile',
    formData: {
    file: res
    },
  }, function(error, response, body) {
		console.log(error);
		console.log(body);
		//console.log(response);
		body3 = {
			"to": usertocken.slice(2),
			"type": "FILE",
			"fileType": fileType,
			"fileSize": prop.s,
			"fileName": prop.n,
			"fileUrl": JSON.parse(body).fileUrl
			}
			if(fileType == 'IMAGE'){
				body3.imageWidth= prop.w
				body3.imageHeight= prop.h
				body3.thumbnailUrl= JSON.parse(body).fileUrl
				}
				// console.log(body3);
				//console.log(url);
		request({
			url: (url + "/sendMessage"),
			method: "POST",
			headers: {
			"Content-Type": "Application/json",
			"Accept": "Application/json"
			},
		json: true,
		body:body3,
		maxAttempts: 50,
		retryDelay: 5000,  
		retryStrategy: myRetryStrategy
	}, function (error, response, body2){
	console.log(body2);
	});
  });
}
function file_g(fileType,usertocken,res,prop){
	
	// var tobody = {};
	// tobody.chat_id = usertocken.slice(2);
	// tobody.type = type;
	// tobody.data = title;
request.post({
    url: "https://api.gap.im/upload",
		formData: {
			file: res
	},
    headers: {
		"token": gtoken
    },
  // form: tobody,
	maxAttempts: 1000,
	retryDelay: 100,
	retryStrategy: myRetryStrategy
}, function (error, response, body){
		console.log(body);
		console.log(error);
		console.log(response.attempts);
		body = JSON.parse(body)
		body.filename = prop.n
		picbody = {
	chat_id: usertocken.slice(2),
  type: fileType,
  data: JSON.stringify(body)
		}
		//send
		request({
			url: "https://api.gap.im/sendMessage",
			method: "POST",
			headers: {
			"token": gtoken
			},
		json: true,
		form: picbody,
		maxAttempts: 1000,
		retryDelay: 100,
		retryStrategy: myRetryStrategy
	}, function (error, response, body){
			console.log(body);
			console.log(response.attempts);
	});
});
}
function file_b(server,usertocken,fileId,accessHash,prop,buffer,fileType){
	var options = {
		url: server,
		headers: {
				'filesize': buffer.byteLength
		},
		body: buffer
};
request.put(options, (err, response, body)=>{
	if(err){console.log(err)}else{console.log(response.statusCode)};
	if(fileType == 'photo'){
		socket.send(JSON.stringify(new balesenphoto(fileId,accessHash,buffer.byteLength, usertocken,prop)));
	}
	else{
		socket.send(JSON.stringify(new balesend_doc(fileId,accessHash,buffer.byteLength, usertocken,prop)));
	}
	
});
}
function file_t(fileType,usertocken,res,prop){
	// var tobody = {};
	// tobody.chat_id = usertocken.slice(2);
	// tobody.type = type;
	// tobody.data = title;
	var turl = ''
	var formt = {
		chat_id: usertocken.slice(2)
}
//res.pathname = prop.n
res.path = '/' + prop.n
//console.log(res)
	switch (fileType){
		case 'p':
			turl = 'https://api.telegram.org/bot'+ttoken+'/sendPhoto'
			formt.photo = res
		break;
		default:
			turl = 'https://api.telegram.org/bot'+ttoken+'/sendDocument'
			formt.document = res
	}

	request.post({
		url: turl,
		formData: formt,
  // form: tobody,
	maxAttempts: 1000,
	retryDelay: 100,
	retryStrategy: myRetryStrategy
}, function (error, response, body){
		console.log(body);
		bot.sendDocument
		console.log(error);
});

// bot.sendPhoto(usertocken.slice(2), address).then(message => {
// 	console.log(message.result.photo);
// });
}
function simage(fileType,usertocken,address,prop){
  // console.log(address)
	// console.log(prop)
	// console.log(fileType)
	if(prop.s < 20000000){
	https.get(address, function(res) {
		
	if(usertocken[0] == 's'){
		if(fileType == 'p'){fileType = 'IMAGE'}else{fileType = 'ATTACHMENT'}
		file_s(fileType,usertocken,res,stoken,prop);
	}
	else if(usertocken[0] == 'q'){
		if(fileType == 'p'){fileType = 'IMAGE'}else{fileType = 'ATTACHMENT'}
		file_s(fileType,usertocken,res,s2token,prop);
	}
	else if(usertocken[0] == 't'){
		file_t(fileType,usertocken,res,prop)
	}
	else if(usertocken[0] == 'g'){
		if(fileType == 'p'){fileType = 'image'}else{fileType = 'file'}
		file_g(fileType,usertocken,res,prop);
	}
	else if(usertocken[0] == 'b'){
		if(fileType == 'p'){fileType = 'photo'}else{fileType = 'file'}
			data = [];
    res.on('data', function(chunk) {
			data.push(chunk);
	})
			res.on('end', function() {
			//at this point data is an array of Buffers
			//so Buffer.concat() can make us a new Buffer
			//of all of them together
			var buffer = Buffer.concat(data);
			wait_bale = [getbales(fileType,buffer.byteLength),'getserver',usertocken,prop,buffer,fileType];
	});

	}
});
}
}
function gettelf(filetype,jsoncontent){
//console.log()
	var turl = ''
	switch (filetype){
		case 'p':
		 turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.photo.reverse()[0]).file_id)
		break;
		case 'f':
		 turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.document).file_id)
		break;
		case 'a':
		turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.audio).file_id)
	 break;
	 case 'v':
		turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.voice).file_id)
	 break;
	 case 'vn':
		turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.video_note).file_id)
	 break;
	 case 'c':
		turl = ("https://api.telegram.org/bot" + ttoken + "/getFile?file_id=" + (jsoncontent.video).file_id)
	 break;
	}
	
 return new Promise(function(resolve, reject) {
	request({
		url: turl,
		method: "GET",
	json: true,
	maxAttempts: 50,
	retryDelay: 5000,  
	retryStrategy: myRetryStrategy
}, function (error, response, body){
	//response.setEncoding('utf8');
	if(error){
		console.log(error);
		reject(error)
	}
	resolve('https://api.telegram.org/file/bot' + ttoken + '/' + body.result.file_path)
});
	});
}
function getbales(fileType,size){
	var id = (Math.floor(Math.random() * 55000)).toString()
	 socket.send(JSON.stringify(new baleserverjs(fileType,size,id)))
	 return id;
 }
function getbalef(fileType,fileId, userId){
 var id = (Math.floor(Math.random() * 55000)).toString()
	socket.send(JSON.stringify(new baleurljs(fileType,fileId, userId,id)))
	return id;
}
//#endregion
//#region get object from mysql
con.query(("SELECT UserID,State,Block FROM chat3.UserProp;"), function (err, result, fields) {
if(result != "" && (typeof result !== 'undefined')){
	result.forEach(function(element) {
	tmp[element.UserID] = new tmpclass();
	tmp[element.UserID].state = element.State;
	tmp[element.UserID].bloc = element.Block || '';
	});}
	});
function qblock(usertocken){
	con.query(("UPDATE chat3.UserProp SET Block = '" + tmp[usertocken].bloc + "' where UserID =  '" + usertocken + "';"), function (err, result, fields) {
if (err){console.log(err);}
});
}
function qhistory(usertocken1,usertocken2){
	con.query(("UPDATE chat3.UserProp SET History = CONCAT(History,'" + '||' + usertocken2 + "') where UserID = '" + usertocken1 + "';UPDATE chat3.UserProp SET History = CONCAT(History,'" + '||' + usertocken1 + "') where UserID = '" + usertocken2 + "';"), function (err, result, fields) {
if (err){console.log(err);}
});
}
function qstate(usertocken,state){
	con.query(("UPDATE chat3.UserProp SET State = '" + state + "' where UserID = '" + usertocken + "';"), function (err, result, fields) {
if (err){console.log(err);}
});
}
function qinsert(usertocken){
	con.query(("INSERT INTO chat3.UserProp (UserID) VALUES( '" + usertocken + "');"), function (err, result, fields) {
 	if (err){console.log(err);}
 });
}
//#endregion
//#region Intervals...
setInterval(function(){Object.keys(tmp).forEach(function(key){tmp[key].count = 0}); console.log(atmp);} ,3800000);
setInterval(function(){
	fs.readFile('/root/node/blocker.txt', function(err, contents) {
	if(contents != '' && contents){
	contents.toString().split(/\r?\n/).forEach(function(element) {
		if(typeof tmp[element] != 'undefined'){
			tmp[element].state = 0;
			qstate(element,0);
			console.log(element);
		}
	});
	fs.truncate('/root/node/blocker.txt',0, function(err){});
	};
	});
} ,60000);
setInterval(function(){
	fs.readFile('/root/node/prof.txt', function(err, contents) {
	if(contents != '' && contents){
		
	contents.toString().split(/\r?\n/).forEach(function(element) {
		if(typeof tmp[element] != 'undefined'){
			tmp[element].state = 2;
			qstate(element,2);
		}
	});

	fs.truncate('/root/node/prof.txt',0, function(err){});
	};
	});
} ,500000);
setInterval(function(){
	fs.readFile('/root/node/atmp.txt', function(err, contents) {
	if(contents != '' && contents){
	contents.toString().split(/\r?\n/).forEach(function(element) {
		var ta = element.split('||')
		if(typeof tmp[ta[0]] != 'undefined' && typeof tmp[ta[1]] != 'undefined'){
            zeroobject(ta[0]);
            zeroobject(ta[1]);
			atmp[ta[0]] = ta[1];
			atmp[ta[1]] = ta[0];
			console.log(element);
		}
		else{console.log('noooooooo :   ' + element);}
	});
	fs.truncate('/root/node/atmp.txt',0, function(err){});
	};
	});
} ,60000);
//#endregion
//#region on sorosh massage -------------------------------------------------------------------------------soroush------------------------------------------------------------
evtSource.onmessage = function(e) {
var jsoncontent = JSON.parse(e.data);
// console.log(jsoncontent);
//definition objects
var allowsend = 0;
var usertocken = 's' + ',' + jsoncontent.from;
com_define(usertocken);
	if(tmp[usertocken].wait != ''){

		if(jsoncontent.body == "/yes"){
			acceptdoing(usertocken);
		}
		else if(jsoncontent.body == "/no"){
			tmp[usertocken].wait = '';
		}
		// else{
		//	jsoncontent.body = tmp[usertocken].wait;
		// }
	}
if((jsoncontent.body) && (jsoncontent.body)[0] == "/"){
//run the game
if(jsoncontent.body == "/runcommand"){
	runcommands(usertocken);
}
//Back command
else if(jsoncontent.body == "/backcommand"){
	com_run(usertocken);
	zeroobject(usertocken);
}
//se
else if(jsoncontent.body == "/setting"){
	thesetting(usertocken,settingtitle);
}
else if(jsoncontent.body == "/report"){
	theblock(usertocken,isreptitle);
	tmp[usertocken].wait = '/report'
}
else if(jsoncontent.body == "/blocking"){
	theblock(usertocken,isbloctitle);
	tmp[usertocken].wait = '/blocking'
}
else if(jsoncontent.body == "/help"){
	thecommand(usertocken,helptitle);
}
else{allowsend = 1;}
// else if(jsoncontent.body == "/yes" || jsoncontent.body == "/no"){}
}
else{allowsend = 1;}
//start bot
if(jsoncontent.type == "START"){
	com_run(usertocken);
	zeroobject(usertocken);
	tmp[usertocken].wait = '';
}
//stop bot
else if(jsoncontent.type == "STOP"){
	zeroobject(usertocken);
}
//no command
else if(allowsend == 1) {
// send text to another user
 if(typeof atmp[usertocken] == 'undefined' || !(atmp[usertocken])){
	com_run(usertocken);
	zeroobject(usertocken);
 }
 else if((atmp[usertocken])[0] == 's' || (atmp[usertocken])[0] == 'q'){
	jsoncontent.to = atmp[usertocken].slice(2);
	if(atmp[usertocken][0] == 's'){
		var token = stoken
	}
	else{
		var token = s2token
	}
		request({
		url: (token + "/sendMessage"),
		method: "POST",
		headers: {
			"Content-Type": "Application/json",
			"Accept": "Application/json"
		},
		json: true,
		body: jsoncontent,
		maxAttempts: 1000,
		retryDelay: 100,
		retryStrategy: myRetryStrategy
	}, function (error, response, body){
		console.log(body);
		console.log(response.attempts);
	});
	jsoncontent.from = usertocken;
	jsoncontent.to = atmp[usertocken];
	smg_log(jsoncontent);
 }
 else{
	smg(atmp[usertocken],jsoncontent,'s')
 }
}
}
//#endregion
//#region on soroush2 -------------------------------------------------------------------------------------soroush2-----------------------------------------------------------
evtSource2.onmessage = function(e) {
	var jsoncontent = JSON.parse(e.data);
	// console.log(jsoncontent.fileUrl);
	//  console.log(jsoncontent);
	//definition objects
	var allowsend = 0;
	var usertocken = 'q' + ',' + jsoncontent.from ;
	com_define(usertocken);
		if(tmp[usertocken].wait != ''){
			if(jsoncontent.body == "/yes"){
				acceptdoing(usertocken);
			}
			else if(jsoncontent.body == "/no"){
				tmp[usertocken].wait = '';
			}
			// else{
			//	jsoncontent.body = tmp[usertocken].wait;
			// }
		}
		
	if((jsoncontent.body) && (jsoncontent.body)[0] == "/"){
	//run the game
		if(jsoncontent.body == "/runcommand"){
			runcommands(usertocken);
		}
	//Back command
	else if(jsoncontent.body == "/backcommand"){
		com_run(usertocken);
		zeroobject(usertocken);
	}
	//setting command
	else if(jsoncontent.body == "/setting"){
		thesetting(usertocken,settingtitle);
	}
	//blocking command
	else if(jsoncontent.body == "/blocking"){
		theblock(usertocken,isbloctitle);
		tmp[usertocken].wait = '/blocking'
	}
	else if(jsoncontent.body == "/report"){
		theblock(usertocken,isreptitle);
		tmp[usertocken].wait = '/report'
	}
	//help command
	else if(jsoncontent.body == "/help"){
		thecommand(usertocken,helptitle);
	}
	// else if(jsoncontent.body == "/yes" || jsoncontent.body == "/no"){}
	else{allowsend = 1;}
	}
	else{allowsend = 1;}

	//start bot
	if(jsoncontent.type == "START"){
		com_run(usertocken);
		zeroobject(usertocken);
		tmp[usertocken].wait = '';
	}
	//stop bot
	else if(jsoncontent.type == "STOP"){
		zeroobject(usertocken);
	}
	//no command
	else if(allowsend == 1) {
	// send text to another user
	 if(typeof atmp[usertocken] == 'undefined' || !(atmp[usertocken])){
		com_run(usertocken);
		zeroobject(usertocken);
	 }
	 else if((atmp[usertocken])[0] == 's' || (atmp[usertocken])[0] == 'q'){
		jsoncontent.to = atmp[usertocken].slice(2);
		if(atmp[usertocken][0] == 's'){
			var token = stoken
		}
		else{
			var token = s2token
		}
			request({
			url: (token + "/sendMessage"),
			method: "POST",
			headers: {
				"Content-Type": "Application/json",
				"Accept": "Application/json"
			},
			json: true,
			body: jsoncontent,
			maxAttempts: 1000,
			retryDelay: 100,
			retryStrategy: myRetryStrategy
		}, function (error, response, body){
			console.log(body);
			console.log(response.attempts);
		});
		jsoncontent.from = usertocken;
		jsoncontent.to = atmp[usertocken];
		smg_log(jsoncontent);
	 }
	 else{
		smg(atmp[usertocken],jsoncontent,'q')
	 }
	}
}
//#endregion
//#region on telegram -------------------------------------------------------------------------------------telegram------------------------------------------------------------
bot.on('message', jsoncontent => {
	//  console.log(jsoncontent);
	//definition objects
	var allowsend = 0;
	var usertocken = 't' + ',' + jsoncontent.chat.id;
	com_define(usertocken);
	if(tmp[usertocken].wait != ''){
		if(jsoncontent.text == "✅بله"){
			acceptdoing(usertocken);
		}
		else if(jsoncontent.text == "✅خیر"){
			tmp[usertocken].wait = '';
		}
			// else{
			//	jsoncontent.text = tmp[usertocken].wait;
			// }
	}
	if((jsoncontent.text) && (jsoncontent.text)[0] == "✅"){
		//run the game
		if(jsoncontent.text == '✅شروع چت تصادفی' || jsoncontent.text == "✅چت جدید"){
			runcommands(usertocken);
		}
		//Back command
		else if(jsoncontent.text == "✅بازگشت"){
			com_run(usertocken);
			zeroobject(usertocken);
		}
		//setting command
		else if(jsoncontent.text == "✅تنظیمات و راهنما"){
			thesetting(usertocken,settingtitle);
		}
		//blocking command
		else if(jsoncontent.text == "✅بلاک کردن"){
			theblock(usertocken,isbloctitle);
			tmp[usertocken].wait = '/blocking'
		}
		else if(jsoncontent.text == "✅بلاک و گزارش تخلف"){
			theblock(usertocken,isreptitle);
			tmp[usertocken].wait = '/report'
		}
		//help command
		else if(jsoncontent.text == "✅راهنما"){
			thecommand(usertocken,helptitle);
		}
		else{allowsend = 1;}
		// else if(jsoncontent.text == "✅بله" || jsoncontent.text == "✅خیر"){}
	}
	else{allowsend = 1;}
	//start bot
	if(jsoncontent.text == "/START"){
		com_run(usertocken);
		zeroobject(usertocken);
		tmp[usertocken].wait = '';
	}
	//no command
	else if(allowsend == 1) {
	// send text to another user
 	if(typeof atmp[usertocken] == 'undefined' || !(atmp[usertocken])){
		com_run(usertocken);
		zeroobject(usertocken);
 	}
 	else{
		smg(atmp[usertocken],jsoncontent,'t');
 	}
	}
});
function callback(err, obj) {
  if (err) {
    // handle error
    console.log(err);
  }
  // handle returned object
   console.log(obj);
};
bot.startPolling(callback);
//#endregion
//#region on GAP --------------------------------------------------------------------------------------------GAP---------------------------------------------------------------
//massage sender gap function
function sendgap(usertocken,title,type,keyboard){
	var tobody = {};
	tobody.chat_id = usertocken.slice(2);
	tobody.type = type;
	tobody.data = title;
	if (typeof keyboard === 'undefined') {
	tobody.inline_keyboard = key.stop.gi;
	}
	else{
	tobody.reply_keyboard = keyboard;
	}
request({
    url: "https://api.gap.im/sendMessage",
    method: "POST",
    headers: {
		"token": gtoken
    },
	json: true,
    form: tobody,
	maxAttempts: 1000,
	retryDelay: 100,
	retryStrategy: myRetryStrategy
}, function (error, response, body){
    console.log(body);
    console.log(response.attempts);
});
}
//get post request from gap
app.post('/', function(req, res){
	var allowsend = 0;
	var jsoncontent = req.body;
	//  console.log(jsoncontent);
	// console.log((JSON.parse(jsoncontent.data)).path);
//definition objects
	var usertocken = 'g' + ',' + jsoncontent.chat_id;
	com_define(usertocken);
		if(tmp[usertocken].wait != ''){
			if(jsoncontent.data == "/yes"){
				acceptdoing(usertocken);
			}
			else if(jsoncontent.data == "/no"){
				tmp[usertocken].wait = '';
			}
			// else{allowsend = 0}
			//	jsoncontent.body = tmp[usertocken].wait;
		}
		if((jsoncontent.data) && (jsoncontent.data)[0] == "/"){
			//run the game
			if(jsoncontent.data == "/runcommand"){
				runcommands(usertocken);
			}
			//Back command
			else if(jsoncontent.data == "/backcommand"){
				com_run(usertocken);
				zeroobject(usertocken);
			}
			//setting command
			else if(jsoncontent.data == "/setting"){
				thesetting(usertocken,settingtitle);
			}
			//blocking command
			else if(jsoncontent.data == "/blocking"){
				theblock(usertocken,isbloctitle);
				tmp[usertocken].wait = '/blocking'
			}
			else if(jsoncontent.data == "/report"){
				theblock(usertocken,isreptitle);
				tmp[usertocken].wait = '/report'
			}
			//help command
			else if(jsoncontent.data == "/help"){
				thecommand(usertocken,helptitle);
			}
			// else if(jsoncontent.data == "/yes" || jsoncontent.data == "/no"){}
			else{allowsend = 1;}
		}
		else{allowsend = 1;}
		//start bot
		if(jsoncontent.type == "join"){
			com_run(usertocken);
			zeroobject(usertocken);
		}
		//stop bot
		else if(jsoncontent.type == "leave"){
			zeroobject(usertocken)
		}
		//Back command
		// else if(jsoncontent.data == "backcommand"){
		// com_run(usertocken);
		// zeroobject(usertocken)
		// }
		else if(jsoncontent.type == "triggerButton"){
			com_run(usertocken);
			zeroobject(usertocken)
		}
		//no command
		else if(allowsend == 1) {
			// send text to another user
 			if(typeof atmp[usertocken] == 'undefined' || !(atmp[usertocken])){
				com_run(usertocken);
				zeroobject(usertocken);
			 }
			 else if((atmp[usertocken])[0] == 'g'){
				jsoncontent.chat_id = atmp[usertocken].slice(2);
				//jsoncontent.reply_keyboard = '{"keyboard":[[{"runcommand": "✅چت جدید"},{"backcommand":"✅بازگشت"}]],"once":false}';
				jsoncontent.inline_keyboard = '[[{"text": "انصراف" , "cb_data": "backcommand"}]]';	
				request({
				url: "https://api.gap.im/sendMessage",
				method: "POST",
				headers: {
					"token": gtoken
				},
				json: true,
				form: jsoncontent,
				maxAttempts: 1000,
				retryDelay: 100,
				retryStrategy: myRetryStrategy
			}, function (error, response, body){
				console.log(body);
				console.log(response.attempts);
			});
			jsoncontent.from = usertocken;
			jsoncontent.to = atmp[usertocken];
			smg_log(jsoncontent);
			 }
 			else{
				smg(atmp[usertocken],jsoncontent,'g');
			}
		}
});
//start listener
//test change
var server = app.listen(801, function(){
        var host = server.address().address;
        var port = server.address().port;
    });
//#endregion
//#region on newBale -------------------------------------------------------------------------------------------newBale-------------------------------------------------------------
function sendbale(text,usertocken,keyboard){
	var templateMessage = new balejs(text,usertocken,key.stop.b);
	if (typeof keyboard !== 'undefined') {
	 templateMessage = new balejs(text,usertocken,keyboard);
	}
	socket.send(JSON.stringify(templateMessage));
}
socket.addEventListener('message', (e) => {
	 var jsoncontent = JSON.parse(e.data);
	//  console.log(jsoncontent);
	if(jsoncontent.body.$type == 'Message'){
		
	// console.log(jsoncontent.body.message.caption);	
	var allowsend = 0;
	var usertocken = 'b' + ',' + jsoncontent.body.peer.id  + '|' + jsoncontent.body.peer.accessHash ;
	com_define(usertocken);
			if(tmp[usertocken].wait != ''){
			if(jsoncontent.body.message.textMessage == "/yes"){
				acceptdoing(usertocken);
			}
			else if(jsoncontent.body.message.textMessage == "/no"){
				tmp[usertocken].wait = '';
			}
			// else{
				// jsoncontent.body = tmp[usertocken].wait;
				// allowsend = 1
			// }
		}
		if(jsoncontent.body.message.$type == "TemplateMessageResponse"){
			
			//run the game
			if(jsoncontent.body.message.textMessage == "/runcommand"){
				runcommands(usertocken);
			}
			//Back command
			else if(jsoncontent.body.message.textMessage == "/backcommand"){
				com_run(usertocken);
				zeroobject(usertocken);
			}
			//setting command
			else if(jsoncontent.body.message.textMessage == "/setting"){
				thesetting(usertocken,settingtitle);
			}
			//blocking command
			else if(jsoncontent.body.message.textMessage == "/blocking"){
				theblock(usertocken,isbloctitle);
				tmp[usertocken].wait = '/blocking'
			}
			else if(jsoncontent.body.message.textMessage == "/report"){
				theblock(usertocken,isreptitle);
				tmp[usertocken].wait = '/report'
			}
			//help command
			else if(jsoncontent.body.message.textMessage == "/help"){
				thecommand(usertocken,helptitle);
			}
			//stop bot
			else if(jsoncontent.body.message.textMessage == "/stop"){
				zeroobject(usertocken)
			}
			//start bot
			else if(jsoncontent.body.message.textMessage == '/start'){
				com_run(usertocken);
				zeroobject(usertocken);
			}
			else{allowsend = 1;}
			// else if(jsoncontent.body.message.text == '/yes' || jsoncontent.body.message.text == '/no'){}
		}
		else{allowsend = 1;}
//no command
// send text to another user

if(allowsend == 1){
	if(typeof atmp[usertocken] == 'undefined' || !(atmp[usertocken])){
	com_run(usertocken);
	zeroobject(usertocken);
 }
 else if((atmp[usertocken])[0] == 'b'){
		var x = (atmp[usertocken]).slice(2).split('|');
		jsoncontent.body.peer.id = x[0];
		jsoncontent.body.peer.accessHash = x[1];
		jsoncontent.$type = 'Request';
		jsoncontent.body.$type = 'SendMessage';
		jsoncontent.service = "messaging";
		jsoncontent.id = "0";
		jsoncontent.body.quotedMessage = null;
		jsoncontent.body.randomId = (Math.floor(Math.random() * 1800000).toString() + Math.floor(Math.random() * 4000000).toString() + Math.floor(Math.random() * 55000).toString());
		jsoncontent.body.message.generalMessage = JSON.parse(JSON.stringify(jsoncontent.body.message));
		jsoncontent.body.message.templateMessageId = '0';
		jsoncontent.body.message.$type = "TemplateMessage";
		jsoncontent.body.message.btnList = key.stop.b;
		socket.send(JSON.stringify(jsoncontent));
		// console.log(JSON.stringify(jsoncontent))
		jsoncontent.from = usertocken;
		jsoncontent.to = atmp[usertocken];
		smg_log(jsoncontent);
	 }
else{
	smg(atmp[usertocken],jsoncontent,'b');
 }
}
}
else if(jsoncontent.$type == 'Response'){
	console.log(jsoncontent.body.url);
	// console.log(jsoncontent);
	// console.log(wait_bale);
	if(wait_bale[0] == jsoncontent.id){
		if(wait_bale[1] == 'geturl'){
			 
			simage(wait_bale[4],wait_bale[2],jsoncontent.body.url,wait_bale[3]);
		}
		else if(wait_bale[1] == 'getserver'){
			file_b(jsoncontent.body.url,wait_bale[2],jsoncontent.body.fileId,jsoncontent.body.userId,wait_bale[3],wait_bale[4],wait_bale[5]);
			// setInterval(function(){
			// 	wait_bale = [getbalef(jsoncontent.body.fileId,jsoncontent.body.userId),'geturl','ggg']

			// } ,20000)
		}
	}
}
});
//#endregion