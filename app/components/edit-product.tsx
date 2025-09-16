"use client";
import React from "react";
import BreadCrumb from "@/app/components/bread-crumb";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const breadCrumb = [
  { title: "Home", url: "../" },
  { title: "Edit Product", url: "../edit/", active: true },
];

const EditProduct = ({ id }: { id: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const { product } = await getProduct(id);
      return product;
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch(`../api/${id}/`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      const { message } = await res.json();
      alert(message);
      router.push("../");
    } catch (error) {
      console.log("Failed to update product", error);
      alert("Failed to update product");
    }
  };

  const getProduct = async (id: string) => {
    const res = await fetch(`../api/${id}`);
    if (!res.ok) throw new Error("Failed to get product");
    return await res.json();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <BreadCrumb lists={breadCrumb} />
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            className="w-full rounded-md border border-gray-300 p-2"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2 h-24"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              Description is required
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            className="w-full rounded-md border border-gray-300 p-2"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">Price is required</span>
          )}
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;