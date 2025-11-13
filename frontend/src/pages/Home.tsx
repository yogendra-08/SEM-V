import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { productsAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getProducts({ limit: 8 });
      if (response.success) {
        setFeaturedProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const categories = [
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop',
      description: 'Traditional & Modern Menswear'
    },
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
      description: 'Elegant Sarees & Contemporary Wear'
    },
    {
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=300&fit=crop',
      description: 'Adorable Traditional Outfits'
    },
    {
      name: 'Traditional',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
      description: 'Authentic Indian Accessories'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&h=1080&fit=crop)'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 animate-fade-in">
            VastraVerse
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-medium animate-slide-up">
            Your Fashion, Your Way — Explore the Universe of Indian Fashion
          </p>
          <p className="text-lg md:text-xl mb-12 opacity-90 animate-slide-up">
            Discover authentic Indian clothing with a modern twist. From traditional sarees to contemporary kurtas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/products" className="btn-primary text-lg px-8 py-4">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/products?category=Traditional" className="btn-outline text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary-600">
              Traditional Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Explore our curated collections of authentic Indian fashion for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="category-card h-80 group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="category-overlay"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Handpicked favorites that celebrate the beauty of Indian craftsmanship
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner w-12 h-12"></div>
            </div>
          ) : (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <div key={product.id} className="card-product">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors">
                        <Heart className="h-5 w-5 text-neutral-600 hover:text-red-500" />
                      </button>
                    </div>
                    {product.stock < 10 && product.stock > 0 && (
                      <div className="absolute top-4 left-4">
                        <span className="badge-warning">Only {product.stock} left</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge-primary">{product.category}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-neutral-600 ml-1">4.5</span>
                      </div>
                    </div>
                    
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2 hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="price-display">₹{product.price.toLocaleString()}</span>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={product.stock === 0}
                        className="btn-primary py-2 px-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline text-lg px-8 py-4">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-indian text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Why Choose VastraVerse?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Experience the perfect blend of tradition and modernity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Authentic Quality</h3>
              <p className="opacity-90">
                Handpicked products from skilled artisans across India, ensuring authenticity and superior quality.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Cultural Heritage</h3>
              <p className="opacity-90">
                Celebrating India's rich textile heritage with modern designs that honor traditional craftsmanship.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Seamless Shopping</h3>
              <p className="opacity-90">
                Easy browsing, secure checkout, and fast delivery to bring Indian fashion to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
