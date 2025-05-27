const nameInput = document.getElementById("name-input");
const submitSearchBtn = document.getElementById("submit-search-btn");
const searchInformation = document.querySelector(".search-information");

function findMostProbableCountry(object){
    let maxProbability = 0;
    let mostProbableCountry = null;
    for (let i = 0; i < object.length; i++) {
      let countryObject = object[i];
      if (countryObject.probability > maxProbability) {
      maxProbability = countryObject.probability;
      mostProbableCountry = countryObject;
      }
  }
  return mostProbableCountry
}

submitSearchBtn.addEventListener("click", async (e) => {
  let searchName = nameInput.value;
  if (searchName === "") {
    searchInformation.innerHTML = `<span class="no-name">Please Enter A Name</span>`;
    return;
  }

  const response = await fetch(
    `https://api.nationalize.io/?name=${searchName}`,
  );
  const outputData = await response.json();
  const {name, country} = outputData;

  const probableCountry = findMostProbableCountry(country);

  let probableCountryValue = probableCountry.country_id;
  const countryProbability = (Math.trunc(probableCountry.probability*1000))/10;

  let probableCountryName = new Intl.DisplayNames(['en'], {type: 'region'});
  const countryName = probableCountryName.of(probableCountryValue);  // gives the full name

  searchInformation.innerHTML = `<span class="found-result">${name} is from ${countryName} with ${countryProbability}% certainty</span>`
});
