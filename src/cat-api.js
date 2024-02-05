import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_6skovHJVQnFDXmYIlCIbcYCkjBmq7Kg8xK2GZ4A57P6bjaSaH1goUWUHkoKi8RWs";

function fetchBreeds() {
    return new Promise((resolve, reject) => {
      axios
        .get("https://api.thecatapi.com/v1/breeds")
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
}


function fetchCatByBreed(breedId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }
  
  export { fetchBreeds, fetchCatByBreed };