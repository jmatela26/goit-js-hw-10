import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';

const ref = {
    selector: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
  };
  
  const { selector, catInfo, loader, error } = ref;
  
  ref.selector.classList.visibility = 'hidden';
  ref.error.style.visibility = 'hidden';
  ref.catInfo.style.visibility = 'hidden';
  
  // Fetch and populate cat breeds
  fetchBreeds()
    .then((response) => {
      ref.loader.style.display = 'none';
      ref.selector.style.visibility = 'visible';
  
      const breeds = response.data;
  
      breeds.forEach((breed) => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.text = breed.name;
        selector.appendChild(option);
      });
  
      new SlimSelect({
        select: selector,
    });

      // Add event listener for breed selection change
      selector.addEventListener('change', (event) => {
        const selectedBreedId = event.target.value;
        
        fetchCatByBreed(selectedBreedId)
          .then((catResponse) => {

            // console.log("cat res:", catResponse);
            const cat = catResponse.data[0];
            displayCatInfo(cat);
          })
          .catch((error) => {
            Notify.failure('Failed to fetch cat information.');
            console.error(error);
          });
      });
    })
    .catch(() => {
      ref.loader.style.visibility = 'hidden';
      ref.error.style.visibility = 'visible';
    });
  
  function displayCatInfo(cat) {
    catInfo.style.visibility = 'visible';
    const catName = cat.breeds.length > 0 ? cat.breeds[0].name : 'Unknown Breed';
    const description = cat.breeds.length > 0 ? cat.breeds[0].description : 'No description available';
    const temperament = cat.breeds.length > 0 ? cat.breeds[0].temperament : 'Unknown Temperament';
    const formattedDescription = description.replace(/\. /g, '.<br/>');

  catInfo.innerHTML = `
    <div style="display: flex; align-items: start; justify-content: start;">
      <div">
        <img src="${cat.url}" alt="${catName}" width="500" />
      </div>
      <div style="display: flex; flex-direction: column; font-size: 20px">
        <h2>${catName}</h2>
        <p><b>Description</b>: ${formattedDescription}</p>
        <p><b>Temperament</b>: ${temperament}</p>
      </div>
    </div>
  `;

  catInfo.style.display = "flex"
  catInfo.style.gap = "20px"
  catInfo.style.backgroundColor = "rgba(220,142,50, 22%)";
  }

