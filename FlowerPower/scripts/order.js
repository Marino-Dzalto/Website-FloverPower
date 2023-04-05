if (localStorage.getItem("cart") && localStorage.getItem("count")) {
	var cart = JSON.parse(localStorage.getItem("cart"));
	var count = JSON.parse(localStorage.getItem("count"));
}
else {
	var cart = {};
	var count = 0;
	localStorage.setItem("cart", JSON.stringify(cart));
	localStorage.setItem("count", JSON.stringify(count));
}
function addToCart(id) {
	// INSERT CODE HERE --> PRIPREMA

	cart[id]["count"] = cart[id]["count"] + 1;
	count++;

	localStorage.setItem("cart", JSON.stringify(cart));
	localStorage.setItem("count", JSON.stringify(count));
	// END INSERT --> PRIPREMA
	refreshCartItems();
}

let getData = async function () {
	let response = await fetch("data/lab2.json");
	let data = await response.json();
	addCategories(data);
}

let addCategories = async function (data) {
	let categories = data.categories;
	let main = document.querySelector('main');
	let categoryTemplate = document.querySelector('#category-template');

	for (let index = 0; index < categories.length; index++) {
		let category = categoryTemplate.content.cloneNode(true);
		let categoryTitleElement = category.querySelector('.decorated-title > span');
		categoryTitleElement.textContent = categories[index].name;

		let products = data.products.filter(p => p.categoryId ==  categories[index].id);

		// INSERT CODE HERE --> PRIPREMA
		let productTemplate = document.querySelector('#product-template');
		let categoryGallery = category.querySelector(".gallery");

		if(products.length > 0) {
			for(item of products) {
				let product = productTemplate.content.cloneNode(true);
				let id = item.id.toString();
				let itemInCart = cart[id] = {};
				itemInCart["count"] = 0;

				product.querySelector(".photo-box-image").src = item.imageUrl;
				product.querySelector(".photo-box-title").innerHTML = item.name;
				product.querySelector(".photo-box").setAttribute("data-id", item.id);
				product.querySelector(".cart-btn").addEventListener("click", (event) => {
					let id = event.target.parentNode.getAttribute("data-id");
					addToCart(id);
				});

				categoryGallery.appendChild(product);
			}
		}
		// END INSERT --> PRIPREMA

		main.appendChild(category);
	}
};

getData();