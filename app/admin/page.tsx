"use client";

import React, { useState, useEffect } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface Category {
    id: string;
    name: string;
    image: string;
    href: string;
}

export default function AdminPage() {
    // Tab state
    const [activeTab, setActiveTab] = useState<"products" | "categories">("products");

    // Products state
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);
    const [productFormData, setProductFormData] = useState<Partial<Product>>({});
    const [filterCategory, setFilterCategory] = useState<string>("");
    const [productSearchQuery, setProductSearchQuery] = useState("");

    // Categories state
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
    const [categoryFormData, setCategoryFormData] = useState<Partial<Category>>({});
    const [categorySearchQuery, setCategorySearchQuery] = useState("");

    // Shared state
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>("");

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Product functions
    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // Category functions
    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            const data = await res.json();
            setCategories(data.categories || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                if (activeTab === "products") {
                    setProductFormData((prev) => ({ ...prev, image: data.path }));
                } else {
                    setCategoryFormData((prev) => ({ ...prev, image: data.path }));
                }
                setImagePreview(data.path);
            } else {
                alert(data.error || "Failed to upload image");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    // Product CRUD operations
    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingProduct) {
                const res = await fetch("/api/products", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...editingProduct, ...productFormData }),
                });

                if (res.ok) {
                    await fetchProducts();
                    setEditingProduct(null);
                    setProductFormData({});
                    setImagePreview("");
                }
            } else {
                const res = await fetch("/api/products", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(productFormData),
                });

                if (res.ok) {
                    await fetchProducts();
                    setIsAddingNewProduct(false);
                    setProductFormData({});
                    setImagePreview("");
                }
            }
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleProductDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                await fetchProducts();
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const startProductEdit = (product: Product) => {
        setEditingProduct(product);
        setProductFormData(product);
        setImagePreview(product.image);
        setIsAddingNewProduct(false);
    };

    const startProductAdd = () => {
        setIsAddingNewProduct(true);
        setEditingProduct(null);
        setProductFormData({
            id: "",
            name: "",
            price: 0,
            image: "/images/placeholder.jpg",
            category: categories[0]?.id || "groceries",
        });
        setImagePreview("");
    };

    const cancelProductEdit = () => {
        setEditingProduct(null);
        setIsAddingNewProduct(false);
        setProductFormData({});
        setImagePreview("");
    };

    // Category CRUD operations
    const handleCategorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingCategory) {
                const res = await fetch("/api/categories", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...editingCategory, ...categoryFormData }),
                });

                if (res.ok) {
                    await fetchCategories();
                    setEditingCategory(null);
                    setCategoryFormData({});
                    setImagePreview("");
                } else {
                    const data = await res.json();
                    alert(data.error || "Failed to update category");
                }
            } else {
                const res = await fetch("/api/categories", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(categoryFormData),
                });

                if (res.ok) {
                    await fetchCategories();
                    setIsAddingNewCategory(false);
                    setCategoryFormData({});
                    setImagePreview("");
                } else {
                    const data = await res.json();
                    alert(data.error || "Failed to create category");
                }
            }
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleCategoryDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            const res = await fetch(`/api/categories?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                await fetchCategories();
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete category");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const startCategoryEdit = (category: Category) => {
        setEditingCategory(category);
        setCategoryFormData(category);
        setImagePreview(category.image);
        setIsAddingNewCategory(false);
    };

    const startCategoryAdd = () => {
        setIsAddingNewCategory(true);
        setEditingCategory(null);
        setCategoryFormData({
            id: "",
            name: "",
            image: "/images/placeholder.jpg",
            href: "/categories/",
        });
        setImagePreview("");
    };

    const cancelCategoryEdit = () => {
        setEditingCategory(null);
        setIsAddingNewCategory(false);
        setCategoryFormData({});
        setImagePreview("");
    };

    // Filtering
    const filteredProducts = products.filter((p) => {
        const matchesCategory = filterCategory ? p.category === filterCategory : true;
        const matchesSearch = productSearchQuery
            ? p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
              p.id.toLowerCase().includes(productSearchQuery.toLowerCase())
            : true;
        return matchesCategory && matchesSearch;
    });

    const filteredCategories = categories.filter((c) => {
        const matchesSearch = categorySearchQuery
            ? c.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
              c.id.toLowerCase().includes(categorySearchQuery.toLowerCase())
            : true;
        return matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-mint border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-mint to-mint-700 bg-clip-text text-transparent">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600 text-lg">Manage your inventory and categories</p>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 mb-8 flex gap-2">
                    <button
                        onClick={() => setActiveTab("products")}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                            activeTab === "products"
                                ? "bg-gradient-to-r from-mint to-mint-700 text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        📦 Products
                    </button>
                    <button
                        onClick={() => setActiveTab("categories")}
                        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                            activeTab === "categories"
                                ? "bg-gradient-to-r from-mint to-mint-700 text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        🏷️ Categories
                    </button>
                </div>

                {/* Products Tab */}
                {activeTab === "products" && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Total Products</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">{products.length}</p>
                                    </div>
                                    <div className="bg-mint-50 p-4 rounded-xl">
                                        <svg
                                            className="w-8 h-8 text-mint"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Categories</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">{categories.length}</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <svg
                                            className="w-8 h-8 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">Filtered Results</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">
                                            {filteredProducts.length}
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl">
                                        <svg
                                            className="w-8 h-8 text-purple-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="flex-1 w-full md:w-auto">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={productSearchQuery}
                                            onChange={(e) => setProductSearchQuery(e.target.value)}
                                            className="input pl-12 w-full"
                                        />
                                        <svg
                                            className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="input w-full md:w-64"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {!isAddingNewProduct && !editingProduct && (
                                    <button
                                        onClick={startProductAdd}
                                        className="btn w-full md:w-auto whitespace-nowrap"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, var(--mint), var(--mint-700))",
                                            color: "#fff",
                                        }}
                                    >
                                        <svg
                                            className="w-5 h-5 inline-block mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        Add Product
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Product Form */}
                        {(isAddingNewProduct || editingProduct) && (
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8 animate-fadeIn">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}
                                    </h2>
                                    <button
                                        onClick={cancelProductEdit}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <form
                                    onSubmit={handleProductSubmit}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div>
                                        <label className="label">Product ID</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={productFormData.id || ""}
                                            onChange={(e) =>
                                                setProductFormData({
                                                    ...productFormData,
                                                    id: e.target.value,
                                                })
                                            }
                                            required
                                            disabled={!!editingProduct}
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Product Name</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={productFormData.name || ""}
                                            onChange={(e) =>
                                                setProductFormData({
                                                    ...productFormData,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Price (₹)</label>
                                        <input
                                            type="number"
                                            className="input"
                                            value={productFormData.price || ""}
                                            onChange={(e) =>
                                                setProductFormData({
                                                    ...productFormData,
                                                    price: Number(e.target.value),
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Category</label>
                                        <select
                                            className="input"
                                            value={productFormData.category || ""}
                                            onChange={(e) =>
                                                setProductFormData({
                                                    ...productFormData,
                                                    category: e.target.value,
                                                })
                                            }
                                            required
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="label">Product Image</label>
                                        <div className="space-y-4">
                                            {(imagePreview || productFormData.image) && (
                                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                                    <img
                                                        src={imagePreview || productFormData.image}
                                                        alt="Preview"
                                                        className="h-24 w-24 object-cover rounded-lg shadow-md"
                                                    />
                                                    <div className="text-sm text-gray-600">
                                                        <p className="font-medium">Current Image</p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {productFormData.image}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                <label
                                                    className="btn cursor-pointer"
                                                    style={{
                                                        background: uploading
                                                            ? "#ccc"
                                                            : "linear-gradient(135deg, var(--mint), var(--mint-700))",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    <svg
                                                        className="w-5 h-5 inline-block mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        />
                                                    </svg>
                                                    {uploading ? "Uploading..." : "Upload Image"}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        disabled={uploading}
                                                        className="hidden"
                                                    />
                                                </label>
                                                <span className="text-sm text-gray-500">
                                                    or enter path manually below
                                                </span>
                                            </div>

                                            <input
                                                type="text"
                                                className="input"
                                                value={productFormData.image || ""}
                                                onChange={(e) =>
                                                    setProductFormData({
                                                        ...productFormData,
                                                        image: e.target.value,
                                                    })
                                                }
                                                placeholder="/images/product.jpg"
                                            />
                                            <p className="text-xs text-gray-500">
                                                📁 Supported: JPEG, PNG, WEBP, GIF • Max 5MB
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 flex gap-4">
                                        <button
                                            type="submit"
                                            className="btn flex-1"
                                            disabled={uploading}
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, var(--mint), var(--mint-700))",
                                                color: "#fff",
                                            }}
                                        >
                                            {editingProduct
                                                ? "💾 Update Product"
                                                : "➕ Add Product"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelProductEdit}
                                            className="btn flex-1"
                                            style={{ background: "#f3f4f6", color: "#374151" }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Products List (Minimal Clean List) */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            {/* Header Row */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                <div className="col-span-4">Product</div>
                                <div className="col-span-2 text-center">Price</div>
                                <div className="col-span-3 text-center">Category</div>
                                <div className="col-span-3 text-center">Actions</div>
                            </div>

                            {/* List Rows */}
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b hover:bg-gray-50 transition"
                                >
                                    {/* Product Name + Image */}
                                    <div className="col-span-4 flex items-center gap-4">
                                        <img
                                            src={product.image}
                                            className="h-14 w-14 rounded-xl object-cover shadow-sm border"
                                            alt={product.name}
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                ID: {product.id}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-span-2 flex items-center justify-center">
                                        <span className="font-medium text-gray-800">
                                            ₹{product.price}
                                        </span>
                                    </div>

                                    {/* Category */}
                                    <div className="col-span-3 flex items-center justify-center">
                                        <span className="text-mint font-medium">
                                            {
                                                categories.find(
                                                    (c) => c.id === product.category
                                                )?.name
                                            }
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-3 flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => startProductEdit(product)}
                                            className="px-4 py-2 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleProductDelete(product.id)
                                            }
                                            className="px-4 py-2 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12 text-gray-500 text-sm">
                                    No products found.
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Categories Tab */}
                {activeTab === "categories" && (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">
                                            Total Categories
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">
                                            {categories.length}
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <svg
                                            className="w-8 h-8 text-blue-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">
                                            Filtered Results
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 mt-1">
                                            {filteredCategories.length}
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-xl">
                                        <svg
                                            className="w-8 h-8 text-purple-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="flex-1 w-full md:w-auto">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search categories..."
                                            value={categorySearchQuery}
                                            onChange={(e) =>
                                                setCategorySearchQuery(e.target.value)
                                            }
                                            className="input pl-12 w-full"
                                        />
                                        <svg
                                            className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {!isAddingNewCategory && !editingCategory && (
                                    <button
                                        onClick={startCategoryAdd}
                                        className="btn w-full md:w-auto whitespace-nowrap"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, var(--mint), var(--mint-700))",
                                            color: "#fff",
                                        }}
                                    >
                                        <svg
                                            className="w-5 h-5 inline-block mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        Add Category
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Category Form */}
                        {(isAddingNewCategory || editingCategory) && (
                            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8 animate-fadeIn">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {editingCategory ? "✏️ Edit Category" : "➕ Add New Category"}
                                    </h2>
                                    <button
                                        onClick={cancelCategoryEdit}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <form
                                    onSubmit={handleCategorySubmit}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <div>
                                        <label className="label">Category ID</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={categoryFormData.id || ""}
                                            onChange={(e) =>
                                                setCategoryFormData({
                                                    ...categoryFormData,
                                                    id: e.target.value
                                                        .toLowerCase()
                                                        .replace(/\s+/g, "-"),
                                                })
                                            }
                                            required
                                            disabled={!!editingCategory}
                                            placeholder="groceries"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Lowercase letters, numbers, and hyphens only
                                        </p>
                                    </div>
                                    <div>
                                        <label className="label">Category Name</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={categoryFormData.name || ""}
                                            onChange={(e) =>
                                                setCategoryFormData({
                                                    ...categoryFormData,
                                                    name: e.target.value,
                                                })
                                            }
                                            required
                                            placeholder="Groceries & Staples"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="label">URL Path</label>
                                        <input
                                            type="text"
                                            className="input"
                                            value={categoryFormData.href || ""}
                                            onChange={(e) =>
                                                setCategoryFormData({
                                                    ...categoryFormData,
                                                    href: e.target.value,
                                                })
                                            }
                                            required
                                            placeholder="/categories/groceries"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="label">Category Image</label>
                                        <div className="space-y-4">
                                            {(imagePreview || categoryFormData.image) && (
                                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                                    <img
                                                        src={imagePreview || categoryFormData.image}
                                                        alt="Preview"
                                                        className="h-24 w-24 object-cover rounded-lg shadow-md"
                                                    />
                                                    <div className="text-sm text-gray-600">
                                                        <p className="font-medium">
                                                            Current Image
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            {categoryFormData.image}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                <label
                                                    className="btn cursor-pointer"
                                                    style={{
                                                        background: uploading
                                                            ? "#ccc"
                                                            : "linear-gradient(135deg, var(--mint), var(--mint-700))",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    <svg
                                                        className="w-5 h-5 inline-block mr-2"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        />
                                                    </svg>
                                                    {uploading ? "Uploading..." : "Upload Image"}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        disabled={uploading}
                                                        className="hidden"
                                                    />
                                                </label>
                                                <span className="text-sm text-gray-500">
                                                    or enter path manually below
                                                </span>
                                            </div>

                                            <input
                                                type="text"
                                                className="input"
                                                value={categoryFormData.image || ""}
                                                onChange={(e) =>
                                                    setCategoryFormData({
                                                        ...categoryFormData,
                                                        image: e.target.value,
                                                    })
                                                }
                                                placeholder="/images/categories/category.jpg"
                                            />
                                            <p className="text-xs text-gray-500">
                                                📁 Supported: JPEG, PNG, WEBP, GIF • Max 5MB
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 flex gap-4">
                                        <button
                                            type="submit"
                                            className="btn flex-1"
                                            disabled={uploading}
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, var(--mint), var(--mint-700))",
                                                color: "#fff",
                                            }}
                                        >
                                            {editingCategory
                                                ? "💾 Update Category"
                                                : "➕ Add Category"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelCategoryEdit}
                                            className="btn flex-1"
                                            style={{ background: "#f3f4f6", color: "#374151" }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Categories List (Minimal Clean List) */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            {/* Header Row */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                <div className="col-span-4">Category</div>
                                <div className="col-span-4 text-center">URL</div>
                                <div className="col-span-4 text-center">Actions</div>
                            </div>

                            {filteredCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b hover:bg-gray-50 transition"
                                >
                                    {/* Category Image + Name */}
                                    <div className="col-span-4 flex items-center gap-4">
                                        <img
                                            src={category.image}
                                            className="h-14 w-14 rounded-xl object-cover shadow-sm border"
                                            alt={category.name}
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900">
                                                {category.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                ID: {category.id}
                                            </p>
                                        </div>
                                    </div>

                                    {/* URL */}
                                    <div className="col-span-4 flex items-center justify-center">
                                        <span className="text-mint font-medium">
                                            {category.href}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-4 flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => startCategoryEdit(category)}
                                            className="px-4 py-2 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleCategoryDelete(category.id)
                                            }
                                            className="px-4 py-2 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {filteredCategories.length === 0 && (
                                <div className="text-center py-12 text-gray-500 text-sm">
                                    No categories found.
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </main>
    );
}
