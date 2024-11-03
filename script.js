const resetButton = document.querySelector('.reset')
const lapButton = document.querySelector('.lap')
const playButton = document.querySelector('.play')
const lapsList = document.querySelector('.laps')
const clearLapsButton = document.querySelector('.lap-clear-button')

let minutes = 0
let seconds = 0
let milliseconds = 0
let interval


// update the time values

function updateDisplay() {
    document.querySelector('.minute').innerText = `${minutes.toString().padStart(2, '0')} :`;
    document.querySelector('.sec').innerHTML = `&nbsp;${seconds.toString().padStart(2, '0')} .`;
    document.querySelector('.msec').innerHTML = `&nbsp;${milliseconds.toString().padStart(2, '0')}`;
}

// start / pause button 

playButton.addEventListener('click', () => {
    if (playButton.innerText === 'Play') {
        startTimer()
        playButton.innerText = 'Pause'
        resetButton.classList.remove('hidden')
        lapButton.classList.remove('hidden')
    } else {
        clearInterval(interval) 
        playButton.innerText = 'Play'
        lapButton.classList.add('hidden')
    }
})


// start the stopwatch

function startTimer() {
    interval = setInterval(() => {
        milliseconds++
        if (milliseconds === 100) {
            milliseconds = 0
            seconds++
        } 
        if (seconds === 60) {
            seconds = 0
            minutes++
        }
        updateDisplay()
    }, 10)
}


// reset the stopwatch

resetButton.addEventListener('click', resetTimer)


function resetTimer () {
    clearInterval(interval)
    minutes = 0
    seconds = 0
    milliseconds = 0
    updateDisplay()

    playButton.innerText = 'Play'
    lapButton.classList.remove('hidden')

    lapsList.innerHTML = ``
}


// add and remove laps


lapButton.addEventListener('click', () => {
    let lapItem = document.createElement('li')
    lapItem.classList.add('lap-item')
    lapsList.appendChild(lapItem)
    lapItem.innerHTML = `
        <span class="number">#${lapsList.children.length - 1}</span>
        <span class="time-stamp">${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} : ${milliseconds.toString().padStart(2, '0')}</span>
    `
    clearLapsButton.addEventListener('click', () => {
    lapsList.removeChild(lapItem)
    })
})



