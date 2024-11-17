"use client";

import ProductForm from "@/components/ProductForm";
import { Button } from "antd";
import { useState } from "react";

export function ProductAddForm() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm ? (
        <ProductForm onClose={() => setShowForm(false)} />
      ) : (
        <Button onClick={() => setShowForm(true)}>Добавить новый товар</Button>
      )}
    </>
  );
}
