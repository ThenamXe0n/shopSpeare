import { FaShoppingCart, FaStar, FaArrowRight, FaShippingFast, FaShieldAlt, FaHeadset, FaTag } from 'react-icons/fa';
import ProductCard from '../components/cards/ProductCard';
import { useSelector } from 'react-redux';
import {Link} from "react-router"

const categories = [
  { name: 'Fashion', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Electronics', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Home Decor', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop' },
  { name: 'Beauty', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop' },
];

// const featuredProducts = [
//   { name: 'Premium Sneakers', price: '₹2,499', mrp: '₹4,999', discount: '50% OFF', brand: 'Nike', category: 'Footwear', rating: 4.8, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop' },
//   { name: 'Smart Watch', price: '₹3,199', mrp: '₹5,499', discount: '42% OFF', brand: 'Noise', category: 'Electronics', rating: 4.7, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop' },
//   { name: 'Minimal Lamp', price: '₹1,199', mrp: '₹2,099', discount: '43% OFF', brand: 'Philips', category: 'Home Decor', rating: 4.6, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop' },
//   { name: 'Luxury Perfume', price: '₹1,899', mrp: '₹3,299', discount: '41% OFF', brand: 'Bella Vita', category: 'Beauty', rating: 4.9, img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop' },
// ];

export default function HomePage() {

  const featuredProducts  = useSelector((store)=>store.product.productList)

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-[4px] text-sm text-gray-500 mb-4">New Collection 2026</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">Upgrade Your Lifestyle With Premium Shopping</h2>
          <p className="mt-5 text-gray-600 text-base sm:text-lg">Discover trending fashion, smart gadgets, home essentials and premium beauty products crafted for modern customers.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="px-7 py-3 bg-black text-white rounded-full font-medium flex items-center gap-2">Shop Now <FaArrowRight /></button>
            <button className="px-7 py-3 border rounded-full font-medium">Explore Deals</button>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1400&auto=format&fit=crop" alt="hero" className="w-full h-[300px] sm:h-[450px] lg:h-[520px] object-cover rounded-3xl shadow-2xl" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[{icon:<FaShippingFast/>,title:'Fast Delivery',desc:'Lightning fast shipping all over country.'},{icon:<FaShieldAlt/>,title:'Secure Payment',desc:'Trusted and encrypted payment gateway.'},{icon:<FaHeadset/>,title:'24/7 Support',desc:'Customer support whenever you need.'}].map((item,index)=>(
          <div key={index} className="bg-white border border-gray-100 rounded-3xl p-7 shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.1)] transition duration-300 flex gap-5 items-start">
            <div className="text-3xl bg-gray-50 p-4 rounded-2xl shadow-inner">{item.icon}</div>
            <div>
              <h3 className="font-semibold text-xl">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-6">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <button className="text-sm font-medium flex items-center gap-2">View More <FaArrowRight /></button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="rounded-3xl overflow-hidden shadow-xl group cursor-pointer relative">
              <img src={cat.img} alt={cat.name} className="w-full h-72 object-cover group-hover:scale-105 transition duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
                <h3 className="text-white text-2xl font-semibold">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="featured" className="bg-gray-50 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/product" className="text-sm font-medium flex items-center gap-2">Browse All <FaArrowRight /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0,4).map((product, index) => (
           <ProductCard key={index} product={product}/>
            ))}
          </div>
        </div>
      </section>

      <section id="offers" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-black text-white rounded-3xl px-8 sm:px-14 py-12 flex flex-col lg:flex-row justify-between items-center gap-6 shadow-2xl">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Get 30% Discount On First Purchase</h2>
            <p className="text-gray-300 mt-3">Join thousands of happy customers shopping smarter every day.</p>
          </div>
          <button className="px-8 py-3 bg-white text-black rounded-full font-semibold">Claim Offer</button>
        </div>
      </section>

      <footer className="border-t py-8 text-center text-sm text-gray-500 px-4">
        © 2026 ShopSphere. All rights reserved.
      </footer>
    </div>
  );
}