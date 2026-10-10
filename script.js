const menu = window.AAHAA_MENU || [];
const searchInput = document.getElementById("menuSearch");
const categorySelect = document.getElementById("menuCategory");
const results = document.getElementById("menuResults");
const count = document.getElementById("menuCount");

function renderMenu() {
  if (!searchInput || !categorySelect || !results) return;

  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  let total = 0;

  results.innerHTML = "";

  menu.forEach(group => {
    if (category !== "All" && group.category !== category) return;

    const dishes = group.items.filter(([name]) =>
      name.toLowerCase().includes(query)
    );

    if (!dishes.length) return;
    total += dishes.length;

    const card = document.createElement("article");
    card.className = "menu-card";

    const heading = document.createElement("h3");
    heading.textContent = group.category;
    card.appendChild(heading);

    const list = document.createElement("ul");

    dishes.forEach(([name, price]) => {
      const item = document.createElement("li");
      const dishName = document.createElement("span");
      const dishPrice = document.createElement("strong");

      dishName.textContent = name;
      dishPrice.textContent = "₹" + Number(price).toLocaleString("en-IN");

      item.append(dishName, dishPrice);
      list.appendChild(item);
    });

    card.appendChild(list);
    results.appendChild(card);
  });

  if (count) {
    count.textContent = total
      ? total + " dishes found"
      : "No matching dishes found";
  }
}

if (searchInput && categorySelect && results) {
  menu.forEach(group => {
    const option = document.createElement("option");
    option.value = group.category;
    option.textContent = group.category;
    categorySelect.appendChild(option);
  });

  searchInput.addEventListener("input", renderMenu);
  categorySelect.addEventListener("change", renderMenu);
  renderMenu();
}
