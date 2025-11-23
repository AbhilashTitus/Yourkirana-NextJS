
function addToCart(name, price){
  const cart = JSON.parse(localStorage.getItem('yk_cart')||'[]');
  cart.push({name, price}); localStorage.setItem('yk_cart', JSON.stringify(cart));
  alert(name + ' added to cart!');
}
