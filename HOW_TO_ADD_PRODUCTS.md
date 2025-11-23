# How to Add New Products

Adding new products to your Kirana store is easy! Follow these simple steps:

## 1. Add the Product Image
1.  Get your product image (JPG, PNG, or WebP format).
2.  Rename it to something descriptive, e.g., `My New Product.jpg`.
3.  Place the image file in the `public/images/New folder/` directory.
    *   *Note: You can create new folders inside `public/images` if you want to organize them differently, just make sure to update the path in the next step.*

## 2. Update the Product Data
1.  Open the file `data/products.ts`.
2.  Scroll to the `products` array.
3.  Add a new entry for your product. You can copy an existing one and modify it.

**Example:**
```typescript
{
  id: 'my-new-product',           // Unique ID (use hyphens, no spaces)
  name: 'My New Product Name',    // Display name
  price: 99,                      // Price in Rupees
  image: '/images/New folder/My New Product.jpg', // Path to your image
  category: 'groceries'           // Category ID (must match one of the categories below)
},
```

## 3. Verify Categories
Ensure the `category` field matches one of the valid category IDs defined at the bottom of `data/products.ts`:
*   `groceries`
*   `vegetables`
*   `dairy`
*   `snacks`
*   `beverages`
*   `cleaning`
*   `personalcare`
*   `baby`
*   `kitchen`
*   `petcare`
*   `health`

## 4. Save and Test
1.  Save the `data/products.ts` file.
2.  If your development server is running (`pnpm dev`), the changes will appear properly.
3.  Go to the relevant category page to see your new product!
