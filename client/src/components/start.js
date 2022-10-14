let reg, logr, pasr, warnev, warner, warnew, regb, vxodb, ch1, ch2, ch3, wt, butr, warncr, posform, over;

export function ini() {
	reg = document.getElementById("reg");
	warncr = document.getElementById("warncr");
	warnev = document.getElementById("warnev");
	warner = document.getElementById("warner");
	warnew = document.getElementById("warnew");
	logr = document.getElementById("logr");
	pasr = document.getElementById("pasr");
	ch1 = document.getElementById("ch1");
	ch2 = document.getElementById("ch2");
	ch3 = document.getElementById("ch3");
	wt = document.getElementById("wt");
	butr = document.getElementById("butr");
	posform = document.getElementById("posform");
	over = document.getElementById("over");
	window.addEventListener('keydown', checkCaps);
	logr.addEventListener('input', inpchr);
	pasr.addEventListener('input', inpchr);
	regb = false;
	vxodb = false;
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

export function rego(){
	console.log("sdf");
	if(regb && pasr.value && logr.value){
		let ch = ch1.checked ? 1 : ch2.checked ? 2 : 3;
		window.location.hash = `login=${logr.value};pas=${pasr.value};ch=${ch}`;
		onvxod();
	}
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
		warncr.style.display = "inline";
	}else{
		warncr.style.display = "none";
	}
}

export function onvxod(){
	reg.style.transform = "rotateX(90deg)";
	reg.addEventListener('transitionend', chreg);
}

function chreg(){
	reg.style.position = "absolute";
	reg.removeEventListener('transitionend', chreg);
}