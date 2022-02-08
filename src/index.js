import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputCantry: document.querySelector('#search-box')
}

const onInput = refs.inputCantry.addEventListener('click', onInputFind());

function onInputFind() { console.dir(refs.inputCantry) };