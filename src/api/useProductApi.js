import { api } from '@api';

const useProductApi = () => {
  const getProducts = async () => {
    const response = await api({
      method: 'GET',
      url: `/products`,
    });

    return response.data;
  };

  const createProduct = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/products',
      data
    });

    return response.data;
  };
  
  const updateProduct = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/products/${id}`,
      data
    });

    return response.data;
  };

  const deleteProduct = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/products/${id}`,
    });

    return response.data;
  };

  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct    
  };
};

export default useProductApi;
