console.log('%c HI', 'color: firebrick')
async function loadBreeds() {
    const breedList = document.getElementById("dog-breeds");
    const dropdown = document.getElementById("breed-dropdown");
    const allBreeds = await fetchBreeds();
    function renderBreeds(breeds) {
      for (const key in breeds) {
        const dogBreed = document.createElement("li");
        dogBreed.innerText = key;
        dogBreed.addEventListener("click", textColor);
        if (Array.isArray(breeds[key]) && breeds[key].length) {
          const breedSubList = document.createElement("ul");
          breeds[key].forEach(subBreed => {
            const dogSubBreed = document.createElement("li");
            dogSubBreed.innerText = subBreed;
            dogSubBreed.style.color = "#000000";
            dogSubBreed.addEventListener("click", textColor);
            breedSubList.appendChild(dogSubBreed);
          });
          dogBreed.appendChild(breedSubList);
        }
        breedList.appendChild(dogBreed);
      }
    }
  
    function emptyBreedList() {
      const liCollection = document.querySelectorAll("#dog-breeds li");
      for (let i = 0; (li = liCollection[i]); i++) {
        li.parentNode.removeChild(li);
      }
    }
  
    dropdown.addEventListener("change", event => {
      let filteredBreeds = {};
      let letter = event.target.value;
      let filtered = Object.keys(allBreeds).filter(mainBreed =>
        mainBreed.startsWith(letter)
      );
      for (const key of filtered) {
        filteredBreeds[key] = allBreeds[key];
      }
      emptyBreedList();
      renderBreeds(filteredBreeds);
    });
  
    function textColor(event) {
      event.target.style.color = "#009AE4";
    }
    renderBreeds(allBreeds);
  }
  
  async function fetchBreeds() {
    const resp = await fetch("https://dog.ceo/api/breeds/list/all");
    const imgUrl = await fetch("https://dog.ceo/api/breeds/image/random/4")
    const data = await resp.json();
    return data.message;
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    loadBreeds();
  });
  