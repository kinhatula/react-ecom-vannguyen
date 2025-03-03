import React from 'react';
import ProductCard from './ProductCard';
import { Box, Grid2 as Grid, Pagination } from '@mui/material';
import { PAGE_SIZE } from '@/contants/product';
import useProductPaginationQuery from '../hooks/useProductPaginationQuery';
import { SetURLSearchParams } from 'react-router-dom';

interface IProductListProps {
    setSearchParams: SetURLSearchParams;
    page: number;
    setPage: (page: number) => void;
}

function ProductList({ setSearchParams, page, setPage }: IProductListProps) {
    const { data } = useProductPaginationQuery(page);

    const products = data.data;
    const totalCount = data.totalCount || 0; //7 page_size: 5
    const TOTAL_PAGE = Math.ceil(totalCount / PAGE_SIZE);

    const handleChangePage = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
        setSearchParams({ page: value.toString() });
    };

    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    {products.map((product) => {
                        return (
                            <Grid key={product.id} size={4}>
                                <ProductCard product={product} />
                            </Grid>
                        );
                    })}
                </Grid>
                <Pagination
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px'
                    }}
                    count={TOTAL_PAGE}
                    page={page}
                    color='primary'
                    onChange={handleChangePage}
                />
            </Box>
        </>
    );
}

export default ProductList;
