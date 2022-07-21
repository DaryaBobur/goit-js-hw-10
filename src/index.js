import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce((onSearchCountry), DEBOUNCE_DELAY))

function onSearchCountry() {
    fetchCountries(inputEl.value).then((countries) => renderCountryInfo(countries)).catch((error) => console.log(error));
}

function renderCountryInfo(countries) {
const markupCard = countries.map((country) => {
return `
<img src = "${country.flags.svg}" alt = "${country.name}" width="55"/>
<h1 class="country-title">${country.name}</h1>
<p class="country-data">Capital: ${country.capital}</p>
<p class="country-data">Population: ${country.population}</p>
<p class="country-data">Languages: ${country.languages.name}</p>
`}).join('');
countryInfo.innerHTML = markupCard;
}
