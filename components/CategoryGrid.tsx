import Link from 'next/link';
import Image from 'next/image';

const categories = [
    { n: 'Groceries & Staples', img: '/images/categories/groceries-staples.jpg', href: '/categories/groceries' },
    { n: 'Vegetables & Fruits', img: '/images/categories/vegetables-fruits.jpg', href: '/categories/vegetables' },
    { n: 'Dairy & Bakery', img: '/images/categories/dairy-bakery.jpg', href: '/categories/dairy' },
    { n: 'Snacks & Foods', img: '/images/categories/snacks-foods.jpg', href: '/categories/snacks' },
    { n: 'Beverages', img: '/images/categories/beverages.jpg', href: '/categories/beverages' },
    { n: 'Cleaning & Household', img: '/images/categories/cleaning-household.jpg', href: '/categories/cleaning' },
    { n: 'Personal Care', img: '/images/categories/personal-care.jpg', href: '/categories/personalcare' },
    { n: 'Baby Essentials', img: '/images/categories/baby-essentials.jpg', href: '/categories/baby' },
    { n: 'Kitchen & Home Needs', img: '/images/categories/house.jpg', href: '/categories/kitchen' },
    { n: 'Pet Care', img: '/images/categories/petscare.jpg', href: '/categories/petcare' },
    { n: 'Health', img: '/images/categories/health.jpg', href: '/categories/health' },
    { n: 'Vehicle Parts', img: '/images/categories/top-automotive-parts-manufacturers.webp', href: '/categories/vehicle-parts' },
];

export default function CategoryGrid() {
    return (
        <div className="grid" id="catGrid">
            {categories.map((c, index) => (
                <Link key={index} href={c.href} className="cat">
                    {/* Using standard img tag for now to match legacy behavior exactly, or Next.js Image if we want optimization. 
              Legacy CSS expects img tag structure. Next.js Image renders an img but with wrapper.
              Let's use standard img to ensure CSS compatibility for now.
          */}
                    <img src={c.img} alt={c.n} />
                    <span>{c.n}</span>
                </Link>
            ))}
        </div>
    );
}
