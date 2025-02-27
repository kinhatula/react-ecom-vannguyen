import ProductListAdmin from '../components/ProductListAdmin';
import ProductModal from '../components/ProductModal';

function ProductAdminPage() {
    return (
        <div style={{ marginLeft: '250px', marginTop: '70px' }}>
            <ProductModal />
            <ProductListAdmin />
        </div>
    );
}

export default ProductAdminPage;
