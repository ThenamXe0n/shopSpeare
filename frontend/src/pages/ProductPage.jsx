import React, { useEffect, useState } from "react";
import {
  FaFilter,
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import ProductCard from "../components/cards/ProductCard";
import { getAllproductApi } from "../service/apiCollections";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getAllproductAsync } from "../redux/productSlice";
import { useSearchParams } from "react-router";

// const products = [
//   {
//     id: 1,
//     name: "premium sneakers for men",
//     brand: "nike",
//     category: "footwear",
//     price: 2499,
//     mrp: 4999,
//     discount: 50,
//     rating: 4.8,
//     review: 1387,
//     stock: 12,
//     poster:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: 2,
//     name: "smart watch series x",
//     brand: "noise",
//     category: "electronics",
//     price: 3199,
//     mrp: 5499,
//     discount: 42,
//     rating: 4.7,
//     review: 1094,
//     stock: 20,
//     poster:
//       "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: 3,
//     name: "luxury perfume",
//     brand: "bella vita",
//     category: "beauty",
//     price: 1899,
//     mrp: 3299,
//     discount: 41,
//     rating: 4.9,
//     review: 782,
//     stock: 8,
//     poster:
//       "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: 4,
//     name: "minimal desk lamp",
//     brand: "philips",
//     category: "home decor",
//     price: 1199,
//     mrp: 2099,
//     discount: 43,
//     rating: 4.6,
//     review: 566,
//     stock: 15,
//     poster:
//       "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: 5,
//     name: "wireless headphones",
//     brand: "boat",
//     category: "electronics",
//     price: 2299,
//     mrp: 3999,
//     discount: 42,
//     rating: 4.5,
//     review: 934,
//     stock: 11,
//     poster:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     id: 6,
//     name: "casual hoodie",
//     brand: "zara",
//     category: "fashion",
//     price: 1499,
//     mrp: 2799,
//     discount: 46,
//     rating: 4.4,
//     review: 431,
//     stock: 17,
//     poster:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
//   },
// ];

export default function ProductPage() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { isLoading, productList } = useSelector((store) => store.product);
  const products = productList;
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState(1);

  console.log(searchParams.toString());

  const handleSearchPrams = (name, value) => {
    if (value.toLowerCase() === "all") {
      setSearchParams((prev) => {
        let params = new URLSearchParams(prev);
        params.delete(name);
        return params;
      });
      return;
    }
    setSearchParams((prev) => {
      let params = new URLSearchParams(prev);
      params.set(name, value);
      return params;
    });
  };

  async function loadProduct() {
    try {
      let response = await dispatch(
        getAllproductAsync(searchParams.toString()),
      ).unwrap();
      setPages(Math.floor(response.total / response.limit));
      toast.success(response.message);
    } catch (error) {
      toast.error(error?.message || "falid to load products");
    }
  }

  useEffect(() => {
    loadProduct();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center w-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6] px-4 sm:px-6 py-8 text-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[3px] text-gray-500">
              Discover Products
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-1">
              Shop Collection
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white border rounded-full px-4 py-3 text-sm flex items-center gap-3 min-w-[240px]">
              <FaSearch />
              <input
                placeholder="Search products..."
                className="outline-none bg-transparent w-full"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            "All",
            "Fashion",
            "Electronics",
            "Footwear",
            "Beauty",
            "Home Decor",
            "shoes",
          ].map((cat, index) => (
            <button
              key={index}
              onClick={() => {
                (setSelectedCategory(cat), handleSearchPrams("category", cat));
              }}
              className={`px-5 py-2.5 rounded-full text-sm whitespace-nowrap ${selectedCategory === cat ? "bg-black text-white" : "bg-white border"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6 items-start">
          <div className="bg-white rounded-[28px] shadow-[0_10px_25px_rgba(0,0,0,0.04)] p-5 sticky top-20 hidden lg:block">
            <h2 className="font-bold text-lg mb-5">Quick Filters</h2>
            <div className="space-y-5 text-sm">
              <div>
                <p className="font-medium mb-2">Price Range</p>
                <input type="range" className="w-full" />
              </div>
              <div>
                <p className="font-medium mb-2">Customer Rating</p>
                <div className="space-y-2 text-gray-600">
                  <p>4★ & above</p>
                  <p>3★ & above</p>
                  <p>2★ & above</p>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Availability</p>
                <p className="text-gray-600">In Stock Only</p>
              </div>
            </div>
          </div>
          <div>
            {products?.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            ) : (
              <div className="h-[60dvh] w-full flex items-center justify-center ">
                No product found !!
          </div>
            )}
            <div className="mt-6 flex items-center gap-x-3">
              {Array.from({ length: pages }, (item, idx) => (
                <div className="bg-black size-10 flex items-center justify-center rounded-md text-white">{idx + 1}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
