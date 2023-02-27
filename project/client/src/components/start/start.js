import {CHANGE_STATE_GL, changeState} from "../../store/actions";
import {addEvent, remEvent, send} from "../main/Main";

let reg, dispatch, vxod, logr, r, v, pasr, logv, pasv, regb, ch1, ch2, warnId, warnEmpId;

export function ini(dispatchS) {
	reg = document.getElementById("reg");
	vxod = document.getElementById("vxod");
	r = document.getElementById("r");
	v = document.getElementById("v");
	dispatch = dispatchS;
	logr = document.getElementById("logr");
	pasr = document.getElementById("pasr");
	logv = document.getElementById("logv");
	pasv = document.getElementById("pasv");
	ch1 = document.getElementById("ch1");
	ch2 = document.getElementById("ch2");
	window.addEventListener('click', checkCaps);
	window.addEventListener('keydown', checkCaps);
	for(let el of document.getElementsByClassName("ic")){
		el.addEventListener('input', inpchr);
	}
	regb = false;
}

export function destroy() {
	if(warnId != undefined) {
		remEvent(warnId);
		warnId = undefined;
	} else if(warnEmpId != undefined) {
		remEvent(warnEmpId);
		warnEmpId = undefined;
	}
}

export function gen_pas(){
    var password = "";
    var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 15; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));     
    }
    pasr.value = password;
	navigator.clipboard.writeText(password);
	addEvent(`Сгенерирован пароль: ${password}. Он скопирован в буфер обмена`, 10);
}

export function rego(){
	if(regb && pasr.value && logr.value){
		let ch = ch1.checked ? 1 : ch2.checked ? 2 : 3;
		window.location.hash = `login=${logr.value};pas=${pasr.value};ch=${ch}`;
		onvxod();
	}
}

export function vxo(){
	let bod = {
		type: "auth",
		body: {
			login: logv.value,
			password: pasv.value
		}
	};
	const checkVx = (data) => {
		if(data.error == false && data.body.auth){
			dispatch(changeState(CHANGE_STATE_GL, undefined, data.body));
		} else {
			addEvent("Неверный логин или пароль", 10);
		}
	};
	send('POST', JSON.stringify(bod), undefined, checkVx);
}

function inpchr(e){
	var dat = e.target;
	if(!e.inputType) return;
	if (dat.validity.patternMismatch || dat.value.length == 0) {
		dat.style.animation = "but 1s ease infinite";
		setTimeout(function () {dat.style.animation = "none"}, 1000);
		dat.style.outline = "solid red";
		if(dat.value.length == 0){
			if(warnEmpId == undefined) {
				warnEmpId = addEvent("Необходимо заполнить поле");
				if(warnId != undefined) {
					remEvent(warnId);
					warnId = undefined;
				}
			}
		} else {
			if(warnId == undefined) {
				warnId = addEvent("Допустимы только латиница или цифры");
				if(warnEmpId != undefined) {
					remEvent(warnEmpId);
					warnEmpId = undefined;
				}
			}
		}
	} else {
		dat.style.outline = "none black";
		if(warnId != undefined) {
			remEvent(warnId);
			warnId = undefined;
		} else if(warnEmpId != undefined) {
			remEvent(warnEmpId);
			warnEmpId = undefined;
		}
	}
}

function checkCaps(event) {
    var caps = event.getModifierState && event.getModifierState('CapsLock');
	for(let el of document.getElementsByClassName("warnc")){
		el.style.opacity = caps ? "1" : "0";
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