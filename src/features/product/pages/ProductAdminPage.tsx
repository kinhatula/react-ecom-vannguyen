import ModalConfirm from '@/components/ModalConfirm';
import ProductListAdmin from '../components/ProductListAdmin';
import ProductModal from '../components/ProductModal';
import { useState } from 'react';
import useProductDelete from '../hooks/useProductDelete';

function ProductAdminPage() {
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<
        IProduct | undefined
    >();

    const handleCloseConfirmModal = () => setOpenConfirmModal(false);
    const handOpenConfirmModal = () => setOpenConfirmModal(true);
    return (
        <div style={{ marginLeft: '250px', marginTop: '70px' }}>
            <ProductModal />
            <ProductListAdmin
                setSelectedProduct={setSelectedProduct}
                handOpenConfirmModal={handOpenConfirmModal}
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
            />
        </div>
    );
}

export default ProductAdminPage;
