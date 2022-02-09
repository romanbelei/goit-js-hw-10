import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputCantry: document.querySelector("#search-box"),
    cantryList: document.querySelector(".country-list"),
    cantryInfo: document.querySelector(".country-info"),}

refs.inputCantry.addEventListener('input', debounce(onInputFind, DEBOUNCE_DELAY));

function onInputFind() {
    CountryList ("");
    CountryInfo ("");
    if (refs.inputCantry.value.length === 0) { return };
    if (refs.inputCantry.value.length === 1) {
        Notify.info(`Too many matches found. Please enter a more specific name.`);
        return
    }
    fetchCountries(refs.inputCantry.value)
    .then((cantry) => renderCantryList(cantry))
    .catch((error) => {Notify.failure(`Oops, there is not country with that name.`);})};

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {return response.json();})
}

function renderCantryList(cantry) {
    const markupList = cantry.map((item) => {
        return `<li style=" display: flex"; margin-down: 5px>
        <img  width="30" height="30" style="margin-right: 10px" src="${item.flags.svg}" />
        <p style="font-size: 24px">${item.name.official}</p>
        </li>`}).join("");
        CountryList(markupList);
    
    if (cantry.length === 1) {
        const markupCantryInfo = `
        <p style="font-size: 24px"><b>Capital:  </b>${cantry[0].capital}</p>
        <p style="font-size: 24px"><b>Population:  </b>${cantry[0].population}</p>
        <p style="font-size: 24px"><b>Languages:  </b>${Object.values(cantry[0].languages)}</p>
        ` 
        CountryInfo (markupCantryInfo); }}

function CountryList(list) {refs.cantryList.innerHTML = list;}
function CountryInfo(info) {refs.cantryInfo.innerHTML = info;}