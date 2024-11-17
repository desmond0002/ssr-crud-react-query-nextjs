import { ProductAddForm } from "@/components/ProductAddForm";
import { ProductList } from "@/components/ProductList";
import api from "@/utils/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Divider } from "antd";

export default async function Edit() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products");
      return response.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductAddForm />
      <Divider />
      <ProductList />
    </HydrationBoundary>
  );
}
