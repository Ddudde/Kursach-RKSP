import {changeCL} from "../../store/actions";

let reg, vxod, logr, r, v, pasr, logv, pasv, warnev, warner, warnew, regb, vxodb, ch1, ch2, ch3, wt, butr, warnc, warncr, posform, over, g_id, g_text_id_1, g_text_id_2, g_text_id_3, g_text_id_4;

export function ini(clss) {
	reg = document.getElementById("reg");
	vxod = document.getElementById("vxod");
	r = document.getElementById("r");
	v = document.getElementById("v");
	warnc = document.getElementById("warnc");
	warncr = document.getElementById("warncr");
	warnev = document.getElementsByClassName("warnev")[0];
	warner = document.getElementsByClassName("warner")[0];
	warnew = document.getElementsByClassName("warnew")[0];
	logr = document.getElementById("logr");
	pasr = document.getElementById("pasr");
	logv = document.getElementById("logv");
	pasv = document.getElementById("pasv");
	ch1 = document.getElementById("ch1");
	ch2 = document.getElementById("ch2");
	ch3 = document.getElementById("ch3");
	wt = document.getElementById("wt");
	butr = document.getElementById("butr");
	posform = document.getElementById("posform");
	over = document.getElementById("over");
	g_id = document.getElementById("g_id");
	g_text_id_1 = document.getElementById("g_text_id_1");
	g_text_id_2 = document.getElementById("g_text_id_2");
	g_text_id_3 = document.getElementById("g_text_id_3");
	g_text_id_4 = document.getElementById("g_text_id_4");
	window.addEventListener('click', checkCaps);
	window.addEventListener('keydown', checkCaps);
	logv.addEventListener('input', inpchr);
	pasv.addEventListener('input', inpchr);
	logr.addEventListener('input', inpchr);
	pasr.addEventListener('input', inpchr);
	g_id.addEventListener('mouseover', onsetText);
	g_id.addEventListener('mouseout', unsetText);
	regb = false;
	vxodb = false;
	for(let el of document.querySelectorAll("." + clss + " *"))
		el.style.cssText += "background-color:" + window.getComputedStyle(el).backgroundColor + "; color:" + window.getComputedStyle(el).color + "; border-color:" + window.getComputedStyle(el).borderColor;
	// var clonedNode = document.querySelector("#but1"), crNode = document.createElement("div");
	// crNode.innerHtml = 'df';
	// document.body.appendChild(crNode);
	// const styles = window.getComputedStyle(clonedNode), styles1 = window.getComputedStyle(crNode);
	// var s = '', s1 = '';
	// for(var i = 0; i < styles.length; i++){
	// 	s1=styles[i] + ':' + styles.getPropertyValue(styles[i])+';';
	// 	var s2=styles[i] + ':' + styles1.getPropertyValue(styles[i])+';';
	// 	console.log(s1);
	// 	console.log(s2);
	// 	if(styles.getPropertyValue(styles[i]) != styles1.getPropertyValue(styles[i])) s += s1;
	// }
	// console.log(s);
	// clonedNode.style.cssText = s;
}

function onsetText() {
	g_text_id_1.innerHTML = "Немного информации об портале для завучей";
	g_text_id_2.innerHTML = "Немного информации об портале для педагогов";
	g_text_id_3.innerHTML = "Немного информации об портале для родителей";
	g_text_id_4.innerHTML = "Немного информации об портале для детей";
}

export function destroy() {
	warnew.style.display = "none";
	warnev.style.display = "none";
	warner.style.display = "none";
}

function unsetText() {
	g_text_id_1.innerHTML = "Завучам";
	g_text_id_2.innerHTML = "Педагогам";
	g_text_id_3.innerHTML = "Родителям";
	g_text_id_4.innerHTML = "Детям";
}

export function gen_pas(){
    var password = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 15; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));     
    }
    pasr.value = password;
	navigator.clipboard.writeText(password);
	wt.innerHTML = `Сгенерирован пароль: ${password}. Он скопирован в буфер обмена`;
	warner.style.display = "inline";
	setTimeout(function (){
		warner.style.display = "none";
		wt.innerHTML = `Допустимы только латинница и цифры`;
	}, 10000);
}

export function setVisibleOver(vis){
	over.style.display = vis ? "block" : "none";
}

export function get(dispatch) {
	fetch('http://localhost:8080/cts')
		.then((res) => {
			if (!res.ok) {
				throw new Error(
					`This is an HTTP error: The status is ${res.status}`
				);
			}
			return res.json();
		})
		.then((repos) => {
			dispatch(changeCL(repos));
		})
		.catch((err) => {
			console.log(err.message);
		});
}

export function del(idi) {
	fetch(`http://localhost:8080/cts/${idi}`, {method: 'DELETE'})
		.then((res) => {
			if (!res.ok) {
				throw new Error(
					`This is an HTTP error: The status is ${res.status}`
				);
			}
			console.log("Deleted!!!");
		})
		.catch((err) => {
			console.log(err.message);
		});
}

export function post(bod) {
	fetch('http://localhost:8080/cts/', {method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: bod})
		.then((res) => {
			if (!res.ok) {
				throw new Error(
					`This is an HTTP error: The status is ${res.status}`
				);
			}
			console.log("Post!!!");
		})
		.catch((err) => {
			console.log(err.message);
		});
}

function put(id, bod) {
	fetch(`http://localhost:8080/cts/${id}`, {method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: bod})
		.then((res) => {
			if (!res.ok) {
				throw new Error(
					`This is an HTTP error: The status is ${res.status}`
				);
			}
			console.log("Put!!!");
		})
		.catch((err) => {
			console.log(err.message);
		});
}

export function rego(){
	if(regb && pasr.value && logr.value){
		let ch = ch1.checked ? 1 : ch2.checked ? 2 : 3;
		window.location.hash = `login=${logr.value};pas=${pasr.value};ch=${ch}`;
		onvxod();
	}
}

export function vxo(){
	for(let el of window.location.hash.split(";"))
	{
		let al = el.split('=');
		if(al[0] == '#login')
			vxodb = al[1] == logv.value;
		if(al[0] == 'pas')
			vxodb &= al[1] == pasv.value;
	}
	if(vxodb)
	{
		warnew.style.display = 'none';
		console.log('vxod');
		window.location.href = 'home.html' + window.location.hash;
	}
	else
		warnew.style.display = 'inline';
}

function inpchr(event){
	var dat = event.target;
	regb = !(dat.validity.patternMismatch || dat.value.length == 0);
	if (dat.validity.patternMismatch || dat.value.length == 0) {
		dat.style.animation = "but 1s ease infinite";
		setTimeout(function () {dat.style.animation = "none"}, 1000)
		dat.style.outline = "solid red";
		warner.style.display = "inline";
	} else {
		dat.style.outline = "none black";
		warner.style.display = "none";
	}
}

function checkCaps(event) {
    var caps = event.getModifierState && event.getModifierState('CapsLock');
	if (caps){
		warnc.style.opacity = "1";
		warncr.style.opacity = "1";
	}else{
		warnc.style.opacity = "0";
		warncr.style.opacity = "0";
	}
}

export function onvxod(){
	v.style.opacity = "0";
	reg.style.transform = "rotateX(90deg)";
	reg.addEventListener('transitionend', chreg);
}

export function onreg(){
	r.style.opacity = "0";
	vxod.style.transform = "rotateX(90deg)";
	vxod.addEventListener('transitionend', chvxod);
}

function chreg(){
	vxod.style.display = "block";
	reg.style.display = "none";
	vxod.style.transform = "rotateX(0deg)";
	v.style.display = "none";
	r.style.display = "block";
	r.style.opacity = "1";
	reg.removeEventListener('transitionend', chreg);
}

function chvxod(){
	vxod.style.display = "none";
	reg.style.display = "block";
	reg.style.transform = "rotateX(0deg)";
	r.style.display = "none";
	v.style.display = "block";
	v.style.opacity = "1";
	vxod.removeEventListener('transitionend', chvxod);
}