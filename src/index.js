import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
const inputEl = document.querySelector('#search-box');

inputEl.addEventListener('input', debounce((onSearchCountry), DEBOUNCE_DELAY))

function onSearchCountry() {
    fetchCountries(inputEl.value).then((countries) => renderCountryInfo(countries)).catch((error) => console.log(error));
}

function renderCountryInfo(countries) {
    clearData();
    clearDataList();
    if (countries.length > 10) {
       Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }

    if (countries.length >= 2 && countries.length <= 10) {
        
  const markup = countries.map((country) => {
        return `
   <li class = "country-item"><img class ="country-flag" src = "${country.flags.svg}" alt = "${country.name}" width="45"/>
    <h2 class="country-subtitle">${country.name}</h2></li>`
    }).join('');
        countryList.innerHTML = markup;
       
    }

    if(countries.length === 1) {
const markupCard = countries.map((country) => {
    return `
<div class ="wrap">
<img class ="country-flag" src = "${country.flags.svg}" alt = "${country.name}" width="55"/>
<h1 class="country-title">${country.name}</h1></div>
<p class="country-data"><b>Capital:</b> ${country.capital}</p>
<p class="country-data"><b>Population:</b> ${country.population}</p>
<p class="country-data"><b>Languages:</b> ${country.languages.name}</p>
`}).join('');
        countryInfo.innerHTML = markupCard;
    }

    // if (inputEl.value !== countries.name) {
    //     Notiflix.Notify.failure('Oops, there is no country with that name');
    // }
}

function clearData() {
   if (inputEl.value === '') {
        return countryInfo.innerHTML = '';
    }
}

function clearDataList() {
   if (inputEl.value === '') {
        return countryList.innerHTML = '';
    }
}