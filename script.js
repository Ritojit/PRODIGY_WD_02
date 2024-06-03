const playBtn = document.querySelector(".startStopBtn");
const lapBtn = document.querySelector(".lapBtn");
const resetBtn =document.querySelector(".resetBtn");


let seconds = 0;
let minutes = 0;
let hours = 0;


let leadingMinutes = 0;
let leadingHours = 0;


let timerInterval = null;
let timerStatus = "stopped";


const laps = document.querySelector(".laps");
const clearLapsBtn = document.querySelector(".lap-clear-btn"); 
let lapItem = 0;


const bg = document.querySelector(".circle");


const toggleBtn = () => {
	lapBtn.classList.remove("hidden");
	resetBtn.classList.remove("hidden");
	clearLapsBtn.classList.remove("hidden");
}


function stopWatch() {
	seconds++
	if(seconds/100 ===1){
		seconds = 0;
		minutes++;

		if(minutes/60 ===1){
			minutes = 0;
			hours++;
		}
	}

	if(minutes < 10) {
		leadingMinutes = "0" + minutes.toString();
	}
	else{
		leadingMinutes = minutes;
	}
	if(hours < 10) {
		leadingHours = "0" + hours.toString();
	}
	else{
		leadingHours = hours;
	}

	let displayTimer = document.getElementById('timer').innerText = leadingHours + ":" + leadingMinutes + ":" + seconds;
}


playBtn.addEventListener("click", function() {

	if(timerStatus === "stopped"){
		bg.classList.add("animation-bg");
		timerInterval = window.setInterval(stopWatch, 10);
		document.getElementById("play").innerHTML = '<i class="fa-solid fa-pause"></i>';
		timerStatus = "started";
	}
	else{
		bg.classList.remove("animation-bg");
		window.clearInterval(timerInterval);
		document.getElementById("play").innerHTML = '<i class="fa-solid fa-play"></i>';
		timerStatus = "stopped";
	}
	toggleBtn();
});


resetBtn.addEventListener("click", function(){
	window.clearInterval(timerInterval);
	seconds = 0;
	minutes = 0;
	hours = 0;
	document.getElementById("timer").innerHTML = "00:00:00";
	document.getElementById("play").innerHTML = '<i class="fa-solid fa-play"></i>';
	timerStatus = "stopped";
	lapBtn.classList.add("hidden");
	resetBtn.classList.add("hidden");
	clearLapsBtn.classList.add("hidden");
	bg.classList.remove("animation-bg");
	laps.innerHTML = '';
	laps.append(clearLapsBtn);
	lapItem = 0;
});


lapBtn.addEventListener("click", function() {
	const li = document.createElement("li");
	const number = document.createElement("span");
	const timeStamp = document.createElement("span");

	li.setAttribute("class", "lap-item");
	number.setAttribute("class", "number");
	timeStamp.setAttribute("class", "time-stamp");
	lapItem++
	timeStamp.innerText = "#" + lapItem  + " " + leadingHours + ":" + leadingMinutes + ":" + seconds;
	li.append(number, timeStamp);
	laps.append(li);
});


clearLapsBtn.addEventListener("click", function() {
	laps.innerHTML = '';
	laps.append(clearLapsBtn);
	lapItem = 0;
});
