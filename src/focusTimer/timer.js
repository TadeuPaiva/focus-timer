import state from "./state.js"
import * as elem from "./elements.js"
import { reset } from "./actions.js"
import { kichenTimer } from "./sounds.js"

export function updatDisplay(minutes, seconds) {
    minutes = minutes ?? state.minutes
    seconds = seconds ?? state.seconds

    elem.minutes.textContent = String(minutes).padStart(2, "0")
    elem.seconds.textContent = String(seconds).padStart(2, "0")
}

export function countdown() {

    clearInterval(state.countdownId)

    if(!state.isRunning) {
        return
    }
    
    let minutes = Number(elem.minutes.textContent)
    let seconds = Number(elem.seconds.textContent)

    seconds--

    if(seconds < 0) {
        seconds = 59
        minutes--
    }

    if(minutes < 0) {
        reset()
        kichenTimer.play()
        return
    }

    updatDisplay(minutes, seconds)
    state.countdownId = setTimeout(() => countdown(), 1000)
}