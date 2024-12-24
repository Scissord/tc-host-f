import { reactive, h } from 'vue';
import { useModalStore } from '@store';
import { useProductApi } from '@api';
import AddProductModal from '@/pages/products/blocks/AddProductModal.vue';

const useProducts = () => {
  const state = reactive({
    isDataLoaded: false,
    products: []
  });

  const modal = useModalStore();

  const { 
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct 
  } = useProductApi(); 
  
  const handleAddProduct = () => {
    modal.show({
      title: 'Добавление товара',
      children: h(AddProductModal, { 
        createProduct, 
        products: state.products 
      }),
    })
  }; 
  
  const handleEditProduct = (id) => {
    const product = state.products.find((p) => +p.id === +id)
    if(product) {
      product.is_editable = !product.is_editable;
    };
  };
  
  const handleSaveProduct = async (id) => {
    const product = state.products.find((p) => +p.id === +id)
    if(product) {
      await updateProduct(id, {
        name: product.name,
        price: product.price
      }); 
    };
    product.is_editable = false;
  };
  
  const handleDeleteProduct = async (id) => {
    const confirm = window.confirm('Вы уверены?'); 
    if(confirm) {
      await deleteProduct(id);
      state.products = state.products.filter((p) => +p.id !== +id);
    };
  };
  
  const handleGetData = async () => {
    state.isDataLoaded = false;
    const data = await getProducts();
    state.products = data.products.map(product => ({
      ...product,
      is_editable: false
    }));
    state.isDataLoaded = true; 
  };
  
  return {
    state,
    handleAddProduct,
    handleEditProduct,
    handleSaveProduct,
    handleDeleteProduct,
    handleGetData 
  };
};

export default useProducts;
