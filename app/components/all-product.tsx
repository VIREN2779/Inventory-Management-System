"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/app/components/dataTable";

const cols = ["ID", "Title", "Description", "Price"];

const AllProducts = () => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const res = await fetch("/api/");
        if (!res.ok) {
          throw new Error("Error fetching products");
        }

        const { products } = await res.json();
        setRows(products);
      } catch (error) {
        console.log("Error fetching products");
      }
    }
    getAllProducts();
  }, []);
  return <DataTable cols={cols} rows={rows} />;
};

export default AllProducts;
