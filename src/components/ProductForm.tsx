"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Product, ProductSchema } from "../types/product";
import { useAddProduct, useEditProduct } from "../hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Space } from "antd";
import Title from "antd/es/typography/Title";

type ProductFormProps = {
  product?: Product;
  onClose: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState<Product>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price ? +product?.price : 0,
    discountedPrice: product?.discountedPrice ? +product?.discountedPrice : 0,
    sku: product?.sku || "",
    photo: product?.photo || "",
  });
  const queryClient = useQueryClient();

  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>(
    {}
  );

  const addProduct = useAddProduct(queryClient);
  const editProduct = useEditProduct(queryClient);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "discountedPrice"
          ? parseInt(value)
          : value,
    }));
  };

  const validate = (): boolean => {
    try {
      ProductSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const validationErrors: Partial<Record<keyof Product, string>> = {};
      error.errors.forEach((err: any) => {
        const key = err.path[0] as keyof Product;
        validationErrors[key] = err.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    if (product) {
      editProduct.mutate({ ...product, ...formData });
    } else {
      addProduct.mutate(formData);
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Space>
        <div>
          <Title level={5}>Название</Title>
          <Input name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <Title level={5}>Описание</Title>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div>
          <Title level={5}>Цена</Title>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          {errors.price && <p>{errors.price}</p>}
        </div>

        <div>
          <Title level={5}>Цена скидкой</Title>
          <Input
            type="number"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={handleChange}
          />

          {errors.discountedPrice && <p>{errors.discountedPrice}</p>}
        </div>

        <div>
          <Title level={5}>Артикул</Title>
          <Input
            type="number"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />

          {errors.sku && <p>{errors.sku}</p>}
        </div>
      </Space>
      <div>
        <Button htmlType="submit">
          {product ? "Редактировать" : "Добавить"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
