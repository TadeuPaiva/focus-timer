import { controls } from "./elements.js";
import * as actions from "./actions.js";
import * as elem from './elements.js';
import state from "./state.js";
import { updatDisplay } from "./timer.js";

export function registerConstrols() {
    controls.addEventListener('click', (event) => {
        const action = event.target.dataset.action
        if(typeof actions[action] != "function") {
            return
        }

        actions[action]()
    })
}

export function setMinutes() {
    elem.minutes.addEventListener('focus', () => {
        elem.minutes.textContent = ''
    })

    elem.minutes.onkeypress = (event) => /\d/.test(event.key)

    elem.minutes.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent
        time = time > 60 ? 60 : time

        state.minutes = time
        state.seconds = 0

        updatDisplay()
        elem.minutes.removeAttribute('contenteditable')
    })
}