"use client";

import {
  useDeletePhoto,
  useDeleteProduct,
  useUploadPhoto,
} from "@/hooks/useProducts";
import { QueryClient } from "@tanstack/react-query";
import { Button, Card, Input, Space } from "antd";
import { ChangeEvent, FC, useState } from "react";
import ProductForm from "./ProductForm";
import { Product } from "@/types/product";
import Title from "antd/es/typography/Title";

interface IProps {
  product: Product;
  queryClient: QueryClient;
}

const ProductCard: FC<IProps> = ({ product, queryClient }) => {
  const [showForm, setShowForm] = useState(false);
  const deleteProduct = useDeleteProduct(queryClient);
  const uploadPhoto = useUploadPhoto(queryClient);
  const deletePhoto = useDeletePhoto(queryClient);

  const handlerDelete = (value: number | undefined) => {
    if (!value) return;
    deleteProduct.mutate(value);
  };
  const handlerDeletePhoto = (value: number | undefined) => {
    if (!value) return;
    deletePhoto.mutate(value);
  };
  const handleUpload = (
    e: ChangeEvent<HTMLInputElement>,
    productId?: number
  ) => {
    const { files } = e.target;
    if (!files || files.length === 0 || productId === undefined) {
      return;
    }
    const file = files[0];
    uploadPhoto.mutate(
      { productId, file },
      {
        onSuccess: (data) => {
          console.log("Photo uploaded successfully:", data);
        },
        onError: (error) => {
          console.error("Error uploading photo:", error);
        },
      }
    );
  };
  return (
    <Card>
      {!showForm && (
        <>
          {product.photo && (
            <img
              src={`http://localhost:3000/uploads/${product.photo}`}
              alt={product.name}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          )}
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Discounted price: {product.discountedPrice}</p>
          <p>SKU: {product.sku}</p>
        </>
      )}
      <Space>
        {showForm && (
          <ProductForm product={product} onClose={() => setShowForm(false)} />
        )}
        {!showForm && (
          <Button onClick={() => handlerDelete(product.id)}>
            Удалить товар
          </Button>
        )}
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Изменить товар</Button>
        )}
        {!showForm && (
          <div>
            <Title level={5}>Загрузить фото</Title>
            <Input
              type="file"
              name="photo"
              onChange={(e) => handleUpload(e, product?.id)}
              accept="image/jpeg, image/png"
            />
          </div>
        )}
        {!showForm && (
          <Button onClick={() => handlerDeletePhoto(product.id)}>
            Удалить фото
          </Button>
        )}
      </Space>
    </Card>
  );
};

export { ProductCard };
