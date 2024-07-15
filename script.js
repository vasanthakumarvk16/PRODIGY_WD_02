var startTime;
var updatedTime;
var difference;
var interval;
var savedTime=0;
var running = false;
var lapCounter = 0;
//let-change
//var-change
//const-fixed
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');
const time=document.getElementById('time');

startButton.addEventListener('click',start);
pauseButton.addEventListener('click',pause);
resetButton.addEventListener('click',reset);
lapButton.addEventListener('click',lap);
// document.getElementById('start').addEventListener("mouseover",start);

function start() {
    if (!running) {
        running=true;
        startTime=new Date().getTime()-savedTime;
        interval=setInterval(getShowTime,1);
    }
}

function pause() {
    if (running) {
        running=false;
        clearInterval(interval);
        savedTime=new Date().getTime()-startTime;
    }
}
function reset() {
    running=false;
    display.textContent='00:00:00';
    clearInterval(interval);
    savedTime=0;
    lapsContainer.innerHTML='';
    lapCounter=0;
}
function lap() {
    if (running) {
        const lapTime=display.textContent;
        const lapElement=document.createElement('div');
        lapElement.textContent="Lap "+(++lapCounter)+":"+lapTime;
        lapsContainer.appendChild(lapElement);
        lapsContainer.scrollTop = lapsContainer.scrollHeight;
    }
}
function getShowTime() {
    updatedTime=new Date().getTime();
    difference=updatedTime - startTime;
    const hours=Math.floor((difference%(1000*60*60*24))/(1000*60*60));
    const minutes=Math.floor((difference%(1000*60*60))/(1000*60));
    const seconds=Math.floor((difference%(1000*60))/1000);
    display.textContent=(hours<10?"0"+hours:hours)+":"+(minutes<10?"0"+minutes: minutes) + ":" + (seconds < 10 ? "0"+seconds:seconds);
}
//condtion ? val1 : val2;
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2,'0'); // Months are zero-indexed
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    // const currentDate1=year+"-"+month+"-"+day;
    const currentTime = `${hours}:${minutes}:${seconds}`;
    return `${currentDate} | ${currentTime}`;
}

function updateDateTime() {
    time.textContent = getCurrentDateTime();
}
updateDateTime();
setInterval(updateDateTime, 1000);