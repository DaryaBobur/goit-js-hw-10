import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY))

function onSearchCountry() {
    const countryName = inputEl.value.trim();
    if (countryName === '') {
        return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
    }

    fetchCountries(countryName).then((countries) => {
        if (countries.length >= 2 && countries.length <= 10) {
    renderCountryList(countries);
    }
        else if (countries.length === 1) {
    renderCountryInfo(countries);
        }
        else {
    renderManyCountries();
         }
    })
        .catch(() => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
        });
}


function renderCountryList(countries) {
  const markup = countries.map((country) => {
    return `
   <li class = "country-item"><img class ="country-flag" src = "${country.flags.svg}" alt = "Flag" width="45"/>
    <h2 class="country-subtitle">${country.name.official}</h2></li>`
    }).join('');
      countryList.innerHTML = markup;
      countryInfo.innerHTML = '';
}

function renderCountryInfo(countries) {
const markupCard = countries.map((country) => {
    return `
<div class ="wrap">
<img class ="country-flag" src = "${country.flags.svg}" alt = "Flag" width="55"/>
<h1 class="country-title">${country.name.official}</h1></div>
<p class="country-data"><b>Capital:</b> ${country.capital}</p>
<p class="country-data"><b>Population:</b> ${country.population}</p>
<p class="country-data"><b>Languages:</b> ${Object.values(country.languages).join(', ')}</p>
`}).join('');
countryInfo.innerHTML = markupCard;
countryList.innerHTML = '';
}

function renderManyCountries() {
       Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}