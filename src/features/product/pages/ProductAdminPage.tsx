import ModalConfirm from '@/components/ModalConfirm';
import ProductListAdmin from '../components/ProductListAdmin';
import ProductModal from '../components/ProductModal';
import { useState } from 'react';
import useProductDelete from '../hooks/useProductDelete';


function ProductAdminPage() {
    const [openAddOrUpdate, setOpenAddOrUpdate] = useState(false);

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<
        IProduct | undefined
    >();

    const handleCloseConfirmModal = () => setOpenConfirmModal(false);
    const handOpenConfirmModal = () => setOpenConfirmModal(true);

    const handleOpenAddOrUpdateModal = () => setOpenAddOrUpdate(true);
    return (
        <div style={{ marginLeft: '250px', marginTop: '70px' }}>
            <ProductModal
                open={openAddOrUpdate}
                setOpen={setOpenAddOrUpdate}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
            />
            <ProductListAdmin
                setSelectedProduct={setSelectedProduct}
                handOpenConfirmModal={handOpenConfirmModal}
                handleOpenAddOrUpdateModal={handleOpenAddOrUpdateModal}
            />
            <ModalConfirm
                openConfirmModal={openConfirmModal}
                handleCloseConfirmModal={handleCloseConfirmModal}
                selectedItem={selectedProduct}
                useDelete={useProductDelete}
                itemName='product'
                getItemName={() =>
                    selectedProduct ? selectedProduct?.name : ''
                }
                selectedItemId={selectedProduct? selectedProduct.id:0}
            />
          
        </div>
    );
}

export default ProductAdminPage;
