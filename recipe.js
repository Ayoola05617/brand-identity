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