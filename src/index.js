import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const ref = {
    selector: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const { selector, catInfo, loader, error } = ref;

ref.selector.style.visibility = "hidden";
ref.error.style.visibility = "hidden";
ref.catInfo.style.visibility = "hidden";

fetchBreeds()
  .then((response) => {
    loader.style.visibility = "hidden";
    selector.style.visibility = "visible";

    const cats = response.data;
    for (const cat of cats) {
      const option = document.createElement("option");
      option.value = cat.id;
      option.innerHTML = cat.name;
      selector.appendChild(option); 
    }
  })
  .catch(() => {
    loader.style.visibility = "hidden"; 
    error.style.visibility = "visible";
  });