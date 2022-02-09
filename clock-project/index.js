let mySpan, currDate, currTime
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}
setInterval(() => {
  currDate = new Date()
  currTime = currDate.toLocaleTimeString('en-US')
  mySpan = document.getElementById('mySpan')
  mySpan.innerHTML = `
    <h2> ${currDate.toLocaleDateString(undefined, options)} </h2>
    <h2> ${currTime} </h2>
    `
}, 1000)
