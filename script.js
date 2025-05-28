const nameInput = document.getElementById("name-input");
const submitSearchBtn = document.getElementById("submit-search-btn");
const searchInformation = document.querySelector(".search-information");

function findMostProbableCountry(object) {
  let maxProbability = 0;
  let mostProbableCountry = null;
  for (let i = 0; i < object.length; i++) {
    let countryObject = object[i];
    if (countryObject.probability > maxProbability) {
      maxProbability = countryObject.probability;
      mostProbableCountry = countryObject;
    }
  }
  return mostProbableCountry;
}

submitSearchBtn.addEventListener("click", async (e) => {
  searchInformation.innerHTML = `<p>....</p>`;
  let searchName = nameInput.value;
  if (searchName === "") {
    searchInformation.innerHTML = `<span class="no-name">Please Enter A Name</span>`;
    return;
  }
  submitSearchBtn.innerHTML = `<p>Loading...</p>`;
  submitSearchBtn.setAttribute("disabled", true);

  try {
    const response = await fetch(
      `https://api.nationalize.io/?name=${searchName}`,
    );
    const outputData = await response.json();

    if (outputData.count === 0) {
      // my personalized message for missing name in API (test name = Indumba)
      searchInformation.innerHTML = `<span class="name-unidentified">Unfortunately, <span>${outputData.name}</span> is not yet identified😥</span>`;
      return;
    }

    const { name, country } = outputData;

    const probableCountry = findMostProbableCountry(country);

    let probableCountryValue = probableCountry.country_id;
    const countryProbability =
      Math.trunc(probableCountry.probability * 1000) / 10;
    // wanted it in 1 decimal place

    let probableCountryName = new Intl.DisplayNames(["en"], { type: "region" });
    const countryName = probableCountryName.of(probableCountryValue); // gives the full name

    searchInformation.innerHTML = `<span class="found-result"><span class="name">${name}</span> is from <span>${countryName}</span> with <span>${countryProbability}%</span> certainty</span>`;
  } catch (e) {
    searchInformation.innerHTML = `<span class="no-name">Yoo, something went wrong, please try again later😊</span>`;
  } finally {
    submitSearchBtn.removeAttribute("disabled");
    submitSearchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i><p class="button-text">Search</p>`;
  }
});
