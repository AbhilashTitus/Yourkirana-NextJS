// Drawer open/close
const hamb = document.querySelector('.hamb');
const drawer = document.querySelector('.drawer');

if (hamb && drawer) {
  hamb.addEventListener('click', () => {
    drawer.classList.toggle('show');
  });

  // Close drawer if user clicks outside
  document.addEventListener('click', (e) => {
    if (!drawer.contains(e.target) && !hamb.contains(e.target)) {
      drawer.classList.remove('show');
    }
  });
}

// Floating Navigation Scroll Effect
const header = document.querySelector('.header.floating-nav');
if (header) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Categories
const catGrid = document.getElementById('catGrid');
if (catGrid) {
    const v = '?v=621';
    const cats = [
        { n: 'Groceries & Staples', img: './images/categories/groceries-staples.jpg' + v, href: 'categories/groceries.html' },
        { n: 'Vegetables & Fruits', img: './images/categories/vegetables-fruits.jpg' + v, href: 'categories/vegetables.html' },
        { n: 'Dairy & Bakery', img: './images/categories/dairy-bakery.jpg' + v, href: 'categories/dairy.html' },
        { n: 'Snacks & Foods', img: './images/categories/snacks-foods.jpg' + v, href: 'categories/snacks.html' },
        { n: 'Beverages', img: './images/categories/beverages.jpg' + v, href: 'categories/beverages.html' },
        { n: 'Cleaning & Household', img: './images/categories/cleaning-household.jpg' + v, href: 'categories/cleaning.html' },
        { n: 'Personal Care', img: './images/categories/personal-care.jpg' + v, href: 'categories/personalcare.html' },
        { n: 'Baby Essentials', img: './images/categories/baby-essentials.jpg' + v, href: 'categories/baby.html' },
        { n: 'Kitchen & Home Needs', img: './images/categories/house.jpg' + v, href: 'categories/kitchen.html' },
        { n: 'Pet Care', img: './images/categories/petscare.jpg' + v, href: 'categories/petcare.html' },
        { n: 'Health', img: './images/categories/health.jpg' + v, href: 'categories/health.html' },
        { n: 'Vehicle Parts', img: './images/categories/top-automotive-parts-manufacturers.webp' + v, href: '' },
    ];


    catGrid.innerHTML = cats
        .map(
            c => `
      <a class="cat" href="${c.href}">
        <img src="${c.img}" alt="${c.n}" />
        <span>${c.n}</span>
      </a>`
        )
        .join('');
}

// Carousel functionality
const carousel = document.querySelector('.carousel');
if (carousel) {
    const slides = carousel.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize carousel - show first slide
    if (slides.length > 0) {
        showSlide(0);
        
        // Auto-advance carousel every 4 seconds
        setInterval(nextSlide, 4000);
    }
}
