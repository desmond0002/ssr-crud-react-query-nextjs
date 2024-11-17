"use server";

import api from "@/utils/api";
import Head from "next/head";
import { SortComponent } from "@/components/SortComponent";
import { FilterComponent } from "@/components/FilterComponent";
import { PaginationComponent } from "@/components/PaginationComponent";
import { Product } from "@/types/product";
import Link from "next/link";
import { Card, Divider, Flex } from "antd";
import Title from "antd/es/typography/Title";

const fetchProducts = async (params: URLSearchParams) => {
  const { data } = await api.get<Array<any>>("/products", { params });
  return data
    ? {
        products: data[0] as Product[],
        totalCount: data[1] as number,
      }
    : undefined;
};

const CatalogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const normalizedParams = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      String(value),
    ])
  );
  const params = new URLSearchParams(normalizedParams);
  const initialData = await fetchProducts(params);

  return (
    <>
      <Head>
        <title>Каталог товаров</title>
        <meta property="og:title" content="Каталог товаров" />
      </Head>
      <div>
        <Title>Каталог товаров</Title>
        <Flex gap={16}>
          <SortComponent params={params} />
          <FilterComponent params={params} />
        </Flex>
        <Divider />
        <Flex vertical gap={2}>
          {initialData?.products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <Card key={product.id}>
                <Flex justify="space-between">
                  <div>
                    <Title level={5}>Название: {product.name}</Title>

                    <Title level={5}>Описание:{product.description}</Title>
                    <Title level={5}>
                      Цена со скидкой:{product.discountedPrice}
                    </Title>
                    <Title level={5}>Цена:{product.price}</Title>
                    <Title level={5}>SKU:{product.sku}</Title>
                  </div>
                  <div>
                    {product.photo && (
                      <img
                        src={`http://localhost:3000/uploads/${product.photo}`}
                        alt={product.name}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </Flex>
              </Card>
            </Link>
          ))}
        </Flex>

        <PaginationComponent
          totalCount={initialData?.totalCount || 0}
          params={params}
        />
      </div>
    </>
  );
};

export default CatalogPage;
