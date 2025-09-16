"use client";
import React from "react";
import Link from "next/link";
import AllProducts from "./components/add-product";

const Home = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="../add/"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          ➕ Add Product
        </Link>
      </div>
      <div>
        <AllProducts />
      </div>
    </div>
  );
};

export default Home;