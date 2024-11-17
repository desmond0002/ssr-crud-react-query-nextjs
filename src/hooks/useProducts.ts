import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/api';
import { Product } from '@/types/product';

export interface ProductsResponse {
  products: Product[];
  totalCount: number;
}

interface ProductsParams {
  page?: number;
  sortBy?: string;
  filterBy?: string;
  limit?: number;
}

export const useProducts = (initialData?: ProductsResponse, params?: ProductsParams) =>
  useQuery<ProductsResponse, Error, ProductsResponse, ['products', ProductsParams | undefined]>({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await api.get<Array<any>>('/products', { params });
      
      return {
          products: data[0] as Product[],
          totalCount: data[1] as number,
        }
      ;
    },
    initialData,
    staleTime: 5000,
  });

export const useAddProduct = (queryClient: ReturnType<typeof useQueryClient>) => {
  return useMutation({
    mutationFn: (newProduct: Partial<Product>) => api.post<Product>('/products', newProduct),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useEditProduct = (queryClient: ReturnType<typeof useQueryClient>) => {
  return useMutation({
    mutationFn: (updatedProduct: Product) => api.put<Product>(`/products/${updatedProduct.id}`, updatedProduct),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};

export const useDeleteProduct = (queryClient: ReturnType<typeof useQueryClient>) => {
  return useMutation({
    mutationFn: (productId: number) => api.delete(`/products/${productId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};

interface UploadPhotoParams {
  productId: number;
  file: File;
}

export const useUploadPhoto = (queryClient: ReturnType<typeof useQueryClient>) => {
  return useMutation<Product, Error, UploadPhotoParams>({
    mutationFn: async ({ productId, file }) => {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await api.post<Product>(`/products/${productId}/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export const useDeletePhoto = (queryClient: ReturnType<typeof useQueryClient>) => {
  return useMutation({
    mutationFn: (productId: number) => api.delete(`/products/${productId}/photo`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
};
