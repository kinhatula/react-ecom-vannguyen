import productApi from '@/apis/productApi';
import { useAppSelector } from '@/redux/hook';
import { Button } from '@mui/material';
import { useEffect } from 'react';

function ProductList() {
    const {user} = useAppSelector((state) => state.user);

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
            <span> hello {user.firstName}</span>
        </div>
    );
}

export default ProductList;
