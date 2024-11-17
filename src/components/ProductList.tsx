"use client";

import { useProducts } from "@/hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { ProductCard } from "./ProductCard";

const ProductList: FC = () => {
  const { data } = useProducts(undefined, {
    limit: 100,
    sortBy: "ASC",
    page: 1,
  });
  const queryClient = useQueryClient();

  return (
    <div>
      {data?.products.map((product) => (
        <ProductCard
          product={product}
          queryClient={queryClient}
          key={product.id}
        />
      ))}
    </div>
  );
};

export { ProductList };
