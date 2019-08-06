const { stoken, notsupportsmg } = require("./Constant.js");
const { simage, doc_prop, gettelf, wait_bale, getbalef, sendMessage, sendMessage2, sendgap, bot, sendbale, smg_log } = require("./test");
//#endregion
//#region  file stream...
//massage sender function
function smg(usertocken, tobody,frombody, plt) {
	console.log(tobody);
	var textsmg = '';
	if (plt == 's' || plt == 'q') {
		if (tobody.type == 'TEXT') {
			textsmg = tobody.body;
		}
		else if (tobody.fileType == 'IMAGE') {
			simage('p', usertocken, stoken + '/downloadFile/' + tobody.fileUrl, doc_prop('p', 's', tobody));
		}
		else if (tobody.type == 'FILE') {
			simage('f', usertocken, stoken + '/downloadFile/' + tobody.fileUrl, doc_prop('f', 's', tobody));
		}
		else {
			textsmg = notsupportsmg;
		}
	}
	else if (plt == 't') {
		if (typeof tobody.text != 'undefined') {
			textsmg = tobody.text;
		}
		else if (typeof tobody.photo != 'undefined') {
			gettelf('p', tobody).then(address => simage('p', usertocken, address, doc_prop('p', 't', tobody))).catch(error => { });
		}
		else if (typeof tobody.document != 'undefined') {
			gettelf('f', tobody).then(address => simage('f', usertocken, address, doc_prop('f', 't', tobody))).catch(error => { });
		}
		else if (typeof tobody.audio != 'undefined') {
			gettelf('a', tobody).then(address => simage('f', usertocken, address, doc_prop('a', 't', tobody))).catch(error => { });
		}
		else if (typeof tobody.voice != 'undefined') {
			gettelf('v', tobody).then(address => simage('f', usertocken, address, doc_prop('v', 't', tobody))).catch(error => { });
		}
		else if (typeof tobody.video_note != 'undefined') {
			gettelf('vn', tobody).then(address => simage('f', usertocken, address, doc_prop('vn', 't', tobody))).catch(error => { });
		}
		else if (typeof tobody.video != 'undefined') {
			gettelf('c', tobody).then(address => simage('f', usertocken, address, doc_prop('c', 't', tobody))).catch(error => { });
		}
		else {
			textsmg = notsupportsmg;
			console.log('a');
		}
	}
	else if (plt == 'g') {
		if (tobody.type == "text") {
			textsmg = tobody.data;
		}
		else if (tobody.type == "image") {
			simage('p', usertocken, (JSON.parse(tobody.data)).path, doc_prop('p', 'g', JSON.parse(tobody.data)));
		}
		else if (tobody.type == "file" || tobody.type == "audio" || tobody.type == "video") {
			simage('f', usertocken, (JSON.parse(tobody.data)).path, doc_prop('f', 'g', JSON.parse(tobody.data)));
		}
		else {
			textsmg = notsupportsmg;
		}
	}
	else if (plt == 'b') {
		if (typeof tobody.body.message.text != 'undefined') {
			textsmg = tobody.body.message.text;
		}
		else if (tobody.body.message.$type == 'Document' && tobody.body.message.mimeType == 'image/jpeg') {
			wait_bale = [getbalef("photo", tobody.body.message.fileId, tobody.body.message.accessHash), 'geturl', usertocken, doc_prop('p', 'b', tobody), 'p'];
		}
		else if (tobody.body.message.$type == 'Document') {
			wait_bale = [getbalef('file', tobody.body.message.fileId, tobody.body.message.accessHash), 'geturl', usertocken, doc_prop('f', 'b', tobody), 'f'];
		}
		else {
			textsmg = notsupportsmg;
		}
	}
	if (textsmg != '') {
		if (usertocken[0] == 's') {
			sendMessage(usertocken, textsmg, 'TEXT');
		}
		else if (usertocken[0] == 'q') {
			sendMessage2(usertocken, textsmg, 'TEXT');
		}
		else if (usertocken[0] == 'g') {
			sendgap(usertocken, textsmg, 'text');
		}
		else if (usertocken[0] == 't') {
			bot.sendMessage(usertocken.slice(2), textsmg);
		}
		else if (usertocken[0] == 'b') {
			sendbale(textsmg, usertocken);
		}
		tobody.from = frombody;
		tobody.to = usertocken;
		smg_log(tobody);
	}
}
exports.smg = smg;
