import warn from '../../media/up.png';
let scrolling = false;
let d1 = document.createElement('img'), d = document.createElement('div');

export function ini() {
	scr();
	d.innerHTML='© 2020 ООО "Рога и Копыта" Все права защищены. Project on <a href="https://github.com/Ddudde/Kursach-HTML" style="color: rgb(0, 153, 0);">github</a>.';
	d.setAttribute('style', `position: fixed;
	right: 12.5vw;
	font-size: 2vw;
	color: rgb(0, 153, 0);
	bottom: 0;
	font-weight: bold;
	text-shadow: 2px 2px 2px #000;`);
	document.body.appendChild(d);
	d1.src = warn;
	d1.setAttribute('style', `user-select: none;
	cursor: pointer;
	position: fixed;
	bottom: 50px;
	right: 6.25vw;
	display: none;
    box-shadow: rgb(0 0 0) 2px 2px 5px 3px;
    border-radius: 50%;`);
	document.body.appendChild(d1);
	d1.addEventListener('click', onTop);
	window.onscroll = () => {
		scrolling = true;
	};
	setInterval(() => {
		if (scrolling) {
			scrolling = false;
			scr();
		}
	},300);
}

function onTop(){
    window.scrollTo(0, 0);
}

function scr() {
	if (window.pageYOffset >= window.innerHeight * 0.5)
		d1.style.display = "block";
	else
		d1.style.display = "none";
}