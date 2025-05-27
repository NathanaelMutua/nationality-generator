const nameInput = document.getElementById("name-input");
const submitSearchBtn = document.getElementById("submit-search-btn");
const searchInformation = document.querySelector(".search-information");

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
  console.log(outputData);
});
