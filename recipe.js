const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") {
    alert("Please enter a recipe name");
    return;
  }

  resultsContainer.innerHTML = "<p>Loading...</p>";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      resultsContainer.innerHTML = "";
      if (!data.meals) {
        resultsContainer.innerHTML = "<p>No recipe found.</p>";
        return;
      }
      data.meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <p>${meal.strInstructions ? meal.strInstructions.slice(0, 100) + '...' : ''}</p>
          <a href="${meal.strSource || '#'}" target="_blank">View Full Recipe</a>
        `;
        resultsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error(error);
      resultsContainer.innerHTML = "<p>Something went wrong. Try again.</p>";
    });
});

document.getElementById("recipeForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("recipeName").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const steps = document.getElementById("steps").value.trim();

  if (!name || !ingredients || !steps) {
    alert("Please enter the reciepe.");
    return;
  }

  const recipeCard = document.createElement("div");
  recipeCard.className = "recipe-card";
  recipeCard.innerHTML = `
<strong><h3>name:</h3></strong><p>${name}</strong><br><br>
    <strong>Ingredients:</strong><p>${ingredients}</p>
    <strong>Steps:</strong><p>${steps}</p>
    <button class="delete-btn">Delete</button>
  `;
  recipeCard.querySelector(".delete-btn").addEventListener("click", function () {
  recipeCard.remove();
});

  document.getElementById("recipeList").appendChild(recipeCard);

  // Clear form
  document.getElementById("recipeForm").reset();
});