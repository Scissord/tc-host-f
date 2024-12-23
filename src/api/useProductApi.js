import { api } from '@api';

const useProductApi = () => {
  const getProducts = async () => {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await api({
      method: 'GET',
      url: `/products`,
    })

    return response.data;
  };

  const createProduct = async (data) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${baseUrl}/products`,
        // headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        // withCredentials: true,
        data
      })

      return response.data;
    } catch (err) {
      handleError(err.response.data.message);
    }
  };
  
  const updateProduct = async (id, data) => {
    try {
      const response = await axios({
        method: 'PATCH',
        url: `${baseUrl}/products/${id}`,
        // headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        // withCredentials: true,
        data
      })

      return response.data;
    } catch (err) {
      handleError(err.response.data.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${baseUrl}/products/${id}`,
        // headers: { 'Authorization': `Bearer ${userStore.accessToken}` },
        // withCredentials: true,
      })

      return response.data;
    } catch (err) {
      handleError(err.response.data.message);
    }
  };

  return {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct    
  };
};

export default useProductApi;
