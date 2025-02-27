import { useState } from 'react';
import CategoryListAdmin from '../components/CategoryListAdmin';
import ModalConfirm from '../components/ModalConfirm';
import CategoryModal from '../components/CategoryModal';

function CategoryAdminPage() {
    //delete
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const handleOpenConfirmModal = () => setOpenConfirmModal(true);
    const handleCloseConfirmModal = () => setOpenConfirmModal(false);

    //create  and update
    const [openAddOrUpdateModal, setOpenAddOrUpdateModal] = useState(false);
    const handleOpenOrUpdateModal = () => setOpenAddOrUpdateModal(true);

    const [selectedCategory, setSelectedCategory] = useState<ICategory>();

    return (
        <div style={{ marginLeft: '250px', marginTop: '70px' }}>
            <CategoryModal
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setOpenAddOrUpdateModal={setOpenAddOrUpdateModal}
                open={openAddOrUpdateModal}
            />
            <CategoryListAdmin
                handleOpenConfirmModal={handleOpenConfirmModal}
                handleOpenOrUpdateModal={handleOpenOrUpdateModal}
                setSelectedCategory={setSelectedCategory}
            />
            <ModalConfirm
                openConfirmModal={openConfirmModal}
                handleCloseConfirmModal={handleCloseConfirmModal}
                selectedCategory={selectedCategory}
            />
        </div>
    );
}

export default CategoryAdminPage;
