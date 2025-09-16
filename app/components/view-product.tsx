"use client";
import React from "react";
import BreadCrumb from "@/app/components/bread-crumb";
import { useForm } from "react-hook-form";

const breadCrumb = [
  { title: "Home", url: "../" },
  { title: "View Product", url: "../view/", active: true },
];

const ViewProduct = ({ id }: { id: string }) => {
  const { register } = useForm({
    defaultValues: async () => {
      const { product } = await getProduct(id);
      return product;
    },
  });

  const getProduct = async (id: string) => {
    const res = await fetch(`../api/${id}`);
    if (!res.ok) throw new Error("Failed to get product");
    return await res.json();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <BreadCrumb lists={breadCrumb} />
      <h2 className="text-xl font-semibold mb-4">View Product</h2>

      <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="w-full rounded-md border border-gray-300 p-2 bg-gray-100"
            {...register("title", { disabled: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2 h-24 bg-gray-100"
            {...register("description", { disabled: true })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            className="w-full rounded-md border border-gray-300 p-2 bg-gray-100"
            {...register("price", { disabled: true })}
          />
        </div>
      </form>
    </div>
  );
};

export default ViewProduct;