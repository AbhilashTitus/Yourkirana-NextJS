// Cart Management System
let cart = [];

// Safety: Reset body overflow to prevent scroll lock on page load
// This ensures scrolling is always enabled when a new page loads
function resetBodyOverflow() {
  if (typeof document !== 'undefined' && document.body) {
    document.body.style.overflow = '';
  }
}

// Sanitize and validate cart item
function sanitizeCartItem(item) {
  if (!item || typeof item !== 'object') return null;
  
  return {
    name: String(item.name || 'Unknown Item'),
    price: parseFloat(item.price) || 0,
    quantity: parseInt(item.quantity) || 1
  };
}

// Clean and validate entire cart
function cleanCart(cartArray) {
  if (!Array.isArray(cartArray)) return [];
  
  return cartArray
    .map(sanitizeCartItem)
    .filter(item => item !== null && item.name && item.price > 0 && item.quantity > 0);
}

// Initialize cart from localStorage
function initCart() {
  try {
    const savedCart = localStorage.getItem('yk_cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      cart = cleanCart(parsedCart);
      // Save cleaned cart back to localStorage
      if (cart.length !== parsedCart.length) {
        localStorage.setItem('yk_cart', JSON.stringify(cart));
      }
    }
  } catch (error) {
    console.error('Error loading cart:', error);
    cart = [];
    localStorage.setItem('yk_cart', '[]');
  }
  updateCartDisplay();
}

// Save cart to localStorage
function saveCart() {
  // Clean cart before saving
  cart = cleanCart(cart);
  localStorage.setItem('yk_cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Get product icon
function getProductIcon(name) {
  const productIcons = {
    "Diapers Small 20pc": "🧷",
    "Diapers Medium 20pc": "🧷",
    "Diapers Large 20pc": "🧷",
    "Baby Wipes 72pc": "🧻",
    "Baby Soap 75g": "🧼",
    "Baby Shampoo 200ml": "🧴",
    "Baby Lotion 200ml": "🧴",
    "Baby Oil 100ml": "🧴",
    "Baby Powder 200g": "🫧",
    "Feeding Bottle 250ml": "🍼",
    "Teether": "🎠",
    "Rattle": "🎵",
    "Sipper Cup": "🥤",
    "Rice Cereal 300g": "🍚",
    "Fruit Puree 100g": "🍎",
    "Baby Blanket": "🧣",
    "Baby Detergent 500ml": "🫧",
    "Diaper Rash Cream": "🧴",
    "Nail Scissors": "✂️"
  };
  return productIcons[name] || "📦";
}

// Add item to cart
function addToCart(name, price) {
  // Validate inputs
  if (!name || name === 'undefined' || name === 'null') {
    console.error('Invalid item name');
    return;
  }
  
  const numPrice = parseFloat(price);
  if (isNaN(numPrice) || numPrice <= 0) {
    console.error('Invalid price:', price);
    return;
  }
  
  const existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity = (parseInt(existingItem.quantity) || 0) + 1;
  } else {
    cart.push({
      name: String(name),
      price: numPrice,
      quantity: 1
    });
  }
  
  saveCart();
  showAddedNotification(name);
  
  // Animate button
  const buttons = document.querySelectorAll(`button[onclick*="${name}"]`);
  buttons.forEach(btn => {
    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 300);
  });
}

// Remove item from cart
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
}

// Update item quantity
function updateQuantity(name, change) {
  const item = cart.find(item => item.name === name);
  if (item) {
    const currentQuantity = parseInt(item.quantity) || 0;
    const newQuantity = currentQuantity + change;
    
    if (newQuantity <= 0) {
      removeFromCart(name);
    } else {
      item.quantity = newQuantity;
      saveCart();
    }
  }
}

// Calculate total
function calculateTotal() {
  return cart.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return total + (price * quantity);
  }, 0);
}

// Get total items count
function getTotalItems() {
  return cart.reduce((total, item) => {
    const quantity = parseInt(item.quantity) || 0;
    return total + quantity;
  }, 0);
}

// Update cart display
function updateCartDisplay() {
  // Update badge
  const badge = document.getElementById('cartBadge');
  const badgeMobile = document.getElementById('cartBadgeMobile');
  const totalItems = getTotalItems();
  const validTotalItems = isNaN(totalItems) ? 0 : Math.max(0, totalItems);
  
  if (badge) {
    badge.textContent = validTotalItems;
    if (validTotalItems > 0) {
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }
  
  if (badgeMobile) {
    badgeMobile.textContent = validTotalItems;
    if (validTotalItems > 0) {
      badgeMobile.style.display = 'inline-flex';
    } else {
      badgeMobile.style.display = 'none';
    }
  }
  
  // Update cart sidebar
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  if (cartItems && cartTotal && checkoutBtn) {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <div class="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <small>Add some products to get started!</small>
        </div>
      `;
      checkoutBtn.disabled = true;
    } else {
      cartItems.innerHTML = cart.map(item => {
        const itemName = String(item.name || 'Unknown Item');
        const itemPrice = parseFloat(item.price) || 0;
        const itemQuantity = parseInt(item.quantity) || 1;
        const safeName = itemName.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        
        return `
        <div class="cart-item" data-item="${safeName}">
          <div class="cart-item-image">${getProductIcon(itemName)}</div>
          <div class="cart-item-details">
            <div class="cart-item-name">${itemName}</div>
            <div class="cart-item-price">₹ ${itemPrice.toFixed(0)}</div>
            <div class="cart-item-controls">
              <div class="quantity-control">
                <button class="quantity-btn" onclick="updateQuantity('${safeName}', -1)">−</button>
                <span class="quantity-value">${itemQuantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${safeName}', 1)">+</button>
              </div>
              <button class="remove-item" onclick="removeFromCart('${safeName}')">Remove</button>
            </div>
          </div>
        </div>
      `;
      }).join('');
      
      const total = calculateTotal();
      cartTotal.textContent = `₹ ${(isNaN(total) ? 0 : total).toFixed(0)}`;
      checkoutBtn.disabled = false;
    }
  }
}

// Show added notification
function showAddedNotification(name) {
  // Create toast notification
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #36C199, #249e7f);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(54, 193, 153, 0.4);
    z-index: 3000;
    animation: slideInUp 0.3s ease;
    font-weight: 600;
  `;
  toast.textContent = `✓ ${name} added to cart!`;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutDown 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Add CSS animations for toast
if (!document.getElementById('cart-toast-styles')) {
  const style = document.createElement('style');
  style.id = 'cart-toast-styles';
  style.textContent = `
    @keyframes slideInUp {
      from {
        transform: translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes slideOutDown {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(100px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Cart sidebar controls
function openCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  
  // Only open sidebar if it exists
  if (sidebar && overlay) {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    return true;
  }
  return false;
}

function closeCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  
  // Always reset body overflow
  document.body.style.overflow = '';
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  
  // Cart trigger buttons - only intercept if sidebar exists
  const cartTriggers = document.querySelectorAll('.cart-trigger');
  const sidebarExists = document.getElementById('cartSidebar') !== null;
  
  cartTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Check if the link points to cart.html
      const href = trigger.getAttribute('href');
      const isCartLink = href && (href.includes('cart.html') || href.endsWith('cart.html'));
      
      // If link goes to cart.html, allow normal navigation
      if (isCartLink) {
        // Ensure body overflow is reset before navigation
        document.body.style.overflow = '';
        return; // Allow default navigation to cart.html
      }
      
      // If sidebar doesn't exist, allow normal navigation
      if (!sidebarExists) {
        // Ensure body overflow is reset
        document.body.style.overflow = '';
        return; // Allow default navigation
      }
      
      // Only prevent default and open sidebar if it exists and link is not cart.html
      e.preventDefault();
      openCart();
    });
  });
  
  // Close cart button
  const cartClose = document.getElementById('cartClose');
  if (cartClose) {
    cartClose.addEventListener('click', closeCart);
  }
  
  // Close cart on overlay click
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
  }
  
  // Close cart on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
    }
  });
  
  // Ensure body overflow is reset on page load (in case of previous lock)
  resetBodyOverflow();
});

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.openCart = openCart;
window.closeCart = closeCart;
