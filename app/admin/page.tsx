"use client";

import { useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

const categories = [
    { id: 'groceries', name: 'Groceries & Staples' },
    { id: 'vegetables', name: 'Vegetables & Fruits' },
    { id: 'dairy', name: 'Dairy & Bakery' },
    { id: 'snacks', name: 'Snacks & Foods' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'cleaning', name: 'Cleaning & Household' },
    { id: 'personalcare', name: 'Personal Care' },
    { id: 'baby', name: 'Baby Essentials' },
    { id: 'kitchen', name: 'Kitchen & Home Needs' },
    { id: 'petcare', name: 'Pet Care' },
    { id: 'health', name: 'Health' },
];

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [formData, setFormData] = useState<Partial<Product>>({});
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setFormData(prev => ({ ...prev, image: data.path }));
                setImagePreview(data.path);
            } else {
                alert(data.error || 'Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editingProduct) {
                const res = await fetch('/api/products', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...editingProduct, ...formData }),
                });

                if (res.ok) {
                    await fetchProducts();
                    setEditingProduct(null);
                    setFormData({});
                    setImagePreview('');
                }
            } else {
                const res = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (res.ok) {
                    await fetchProducts();
                    setIsAddingNew(false);
                    setFormData({});
                    setImagePreview('');
                }
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const res = await fetch(`/api/products?id=${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                await fetchProducts();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const startEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData(product);
        setImagePreview(product.image);
        setIsAddingNew(false);
    };

    const startAdd = () => {
        setIsAddingNew(true);
        setEditingProduct(null);
        setFormData({
            id: '',
            name: '',
            price: 0,
            image: '/images/placeholder.jpg',
            category: 'groceries'
        });
        setImagePreview('');
    };

    const cancelEdit = () => {
        setEditingProduct(null);
        setIsAddingNew(false);
        setFormData({});
        setImagePreview('');
    };

    const filteredProducts = products.filter(p => {
        const matchesCategory = filterCategory ? p.category === filterCategory : true;
        const matchesSearch = searchQuery ?
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.id.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-mint border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
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
                    <p className="text-gray-600 text-lg">Manage your product inventory</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Products</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{products.length}</p>
                            </div>
                            <div className="bg-mint-50 p-4 rounded-xl">
                                <svg className="w-8 h-8 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
                                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Filtered Results</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{filteredProducts.length}</p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-xl">
                                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
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
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input pl-12 w-full"
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="input w-full md:w-64"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {!isAddingNew && !editingProduct && (
                            <button
                                onClick={startAdd}
                                className="btn w-full md:w-auto whitespace-nowrap"
                                style={{ background: 'linear-gradient(135deg, var(--mint), var(--mint-700))', color: '#fff' }}
                            >
                                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Product
                            </button>
                        )}
                    </div>
                </div>

                {/* Product Form */}
                {(isAddingNew || editingProduct) && (
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8 animate-fadeIn">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
                            </h2>
                            <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label">Product ID</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.id || ''}
                                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                                    required
                                    disabled={!!editingProduct}
                                />
                            </div>
                            <div>
                                <label className="label">Product Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">Price (₹)</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={formData.price || ''}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">Category</label>
                                <select
                                    className="input"
                                    value={formData.category || ''}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    required
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="label">Product Image</label>
                                <div className="space-y-4">
                                    {(imagePreview || formData.image) && (
                                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                            <img
                                                src={imagePreview || formData.image}
                                                alt="Preview"
                                                className="h-24 w-24 object-cover rounded-lg shadow-md"
                                            />
                                            <div className="text-sm text-gray-600">
                                                <p className="font-medium">Current Image</p>
                                                <p className="text-xs text-gray-400 mt-1">{formData.image}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        <label className="btn cursor-pointer" style={{ background: uploading ? '#ccc' : 'linear-gradient(135deg, var(--mint), var(--mint-700))', color: '#fff' }}>
                                            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            {uploading ? 'Uploading...' : 'Upload Image'}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                                className="hidden"
                                            />
                                        </label>
                                        <span className="text-sm text-gray-500">or enter path manually below</span>
                                    </div>

                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.image || ''}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="/images/product.jpg"
                                    />
                                    <p className="text-xs text-gray-500">
                                        📁 Supported: JPEG, PNG, WEBP, GIF • Max 5MB
                                    </p>
                                </div>
                            </div>
                            <div className="md:col-span-2 flex gap-4">
                                <button type="submit" className="btn flex-1" disabled={uploading} style={{ background: 'linear-gradient(135deg, var(--mint), var(--mint-700))', color: '#fff' }}>
                                    {editingProduct ? '💾 Update Product' : '➕ Add Product'}
                                </button>
                                <button type="button" onClick={cancelEdit} className="btn flex-1" style={{ background: '#f3f4f6', color: '#374151' }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="card group hover:shadow-2xl transition-all duration-300">
                            <div className="pic relative overflow-hidden">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute top-2 right-2 bg-mint text-white px-3 py-1 rounded-full text-xs font-bold">
                                    ₹{product.price}
                                </div>
                            </div>
                            <div className="body">
                                <h3 className="font-bold text-gray-900">{product.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">ID: {product.id}</p>
                                <p className="text-sm text-mint font-medium mt-2">
                                    {categories.find(c => c.id === product.category)?.name}
                                </p>
                            </div>
                            <div className="flex gap-2 p-4">
                                <button
                                    onClick={() => startEdit(product)}
                                    className="flex-1 btn text-sm"
                                    style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff' }}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="flex-1 btn text-sm"
                                    style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff' }}
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500">Try adjusting your filters or add a new product</p>
                    </div>
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
