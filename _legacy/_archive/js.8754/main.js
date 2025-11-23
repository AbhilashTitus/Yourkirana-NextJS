
// Drawer
const hamb = document.querySelector('.hamb');
const drawer = document.querySelector('.drawer');
if(hamb && drawer){ hamb.addEventListener('click', ()=> drawer.classList.toggle('show')); }

// Carousel
const slides = document.querySelectorAll('.slide'); let i=0;
if(slides.length){ setInterval(()=>{ slides[i].classList.remove('active'); i=(i+1)%slides.length; slides[i].classList.add('active'); }, 4000); }

// Categories on homepage
const catGrid = document.getElementById('catGrid');
if (catGrid){
  const cats = [
    {n:'Groceries & Staples', img:'images/categories/cat_01.jpg', href:'categories/groceries.html'},
    {n:'Vegetables & Fruits', img:'images/categories/cat_02.jpg', href:'categories/vegetables.html'},
    {n:'Dairy & Bakery', img:'images/categories/cat_03.jpg', href:'categories/dairy.html'},
    {n:'Snacks & Foods', img:'images/categories/cat_04.jpg', href:'categories/snacks.html'},
    {n:'Beverages', img:'images/categories/cat_05.jpg', href:'categories/beverages.html'},
    {n:'Cleaning & Household', img:'images/categories/cat_06.jpg', href:'categories/cleaning.html'},
    {n:'Personal Care', img:'images/categories/cat_07.jpg', href:'categories/personalcare.html'},
    {n:'Baby Essentials', img:'images/categories/cat_08.jpg', href:'categories/baby.html'},
    {n:'Kitchen & Home Needs', img:'images/categories/cat_09.jpg', href:'categories/kitchen.html'},
    {n:'Pet Care', img:'images/categories/cat_10.jpg', href:'categories/petcare.html'}
  ];
  catGrid.innerHTML = cats.map(c=>`<a class="cat" href="${c.href}"><img src="${c.img}" alt="${c.n}"><span>${c.n}</span></a>`).join('');
}
