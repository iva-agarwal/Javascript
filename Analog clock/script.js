const secondHand=document.querySelector('.sec')
const minHand=document.querySelector('.min')
const hourHand=document.querySelector('.hour')

function setDate(){
    const now=new Date();

const seconds=now.getSeconds();
const secondsDegrees=((seconds/60)*360)+90;
secondHand.style.transform=`rotate(${secondsDegrees}deg)`;

const minutes=now.getMinutes();
const minutesDegrees=((minutes/60)*360)+((seconds/60)*6)+90;
minHand.style.transform=`rotate(${minutesDegrees}deg)`;

const hour=now.getHours();
const hourDegrees=((hour/12)*360)+((minutes/60)*30)+90;
hourHand.style.transform=`rotate(${hourDegrees}deg)`;
}
setInterval(setDate,1000)
setDate()