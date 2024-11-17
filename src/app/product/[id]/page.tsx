import { GetServerSideProps } from "next";
import Head from "next/head";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/product";
import api from "@/utils/api";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const fetchProduct = async (id: string) => {
  const { data } = await api.get(`/products/${id}`);
  return data as unknown as Product;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  const product = await fetchProduct(id);
  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
      </Head>

      <div>
        {product.photo && (
          <img
            src={`http://localhost:3000/uploads/${product.photo}`}
            alt={product.name}
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        )}
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>Цена: {product.price}</p>
      </div>
    </>
  );
};

export default ProductPage;
