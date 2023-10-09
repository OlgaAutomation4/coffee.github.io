// script.js

const hotButton = document.getElementById("hotButton");
const icedButton = document.getElementById("icedButton");
const coffeeCards = document.getElementById("coffeeCards");
const loadingIndicator = document.getElementById("loadingIndicator");

function renderCoffeeCards(coffeeData) {
  coffeeCards.innerHTML = "";

  coffeeData.forEach((coffee) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = coffee.image;
    img.alt = coffee.title;

    const title = document.createElement("h2");
    title.textContent = coffee.title;

    const description = document.createElement("p");
    description.textContent = coffee.description;

    const ingredients = document.createElement("p");
    ingredients.textContent = "Ingredients: " + coffee.ingredients.join(", ");

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(ingredients);

    coffeeCards.appendChild(card);
  });

  // Hide loading indicator when content is loaded
  loadingIndicator.style.display = "none";
}

function fetchCoffeeData(url) {
  // Show loading indicator while fetching data
  loadingIndicator.style.display = "block";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      renderCoffeeCards(data);
    })
    .catch((error) => {
      // Handle errors here, e.g., show an error message to the user
      console.error("Error fetching coffee data:", error);
      loadingIndicator.style.display = "none"; // Hide loading indicator on error
    });
}

hotButton.addEventListener("click", () => {
  fetchCoffeeData("https://api.sampleapis.com/coffee/hot");
});

icedButton.addEventListener("click", () => {
  fetchCoffeeData("https://api.sampleapis.com/coffee/iced");
});
