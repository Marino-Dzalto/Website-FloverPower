function refreshCartItems(){
    // INSERT CODE HERE --> PRIPREMA

    let cartItems = document.querySelector('#cart-items');
    cartItems.innerHTML = count;

    // END INSERT --> PRIPREMA
};

refreshCartItems();