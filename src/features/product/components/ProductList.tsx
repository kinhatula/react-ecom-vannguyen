import axiosClient from '@/apis/axiois.client';
import productApi from '@/apis/productApi';
import Toast from '@/components/Toast';
import { Button } from '@mui/material';
import { useEffect } from 'react';

function ProductList() {
    const fetchProducts = async () => {
        const res = await productApi.getAll();
        console.log('res', res);
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div>
            <Button color='success' variant='contained'>
                Hello world
            </Button>
            <Toast />
        </div>
    );
}

export default ProductList;
