import React from 'react';
import ProductCard from './ProductCard';
import { Box, Grid2 as Grid, Pagination, Typography } from '@mui/material';
import { PAGE_SIZE, PARAM_TYPE } from '@/contants/product';
import useProductPaginationQuery from '../hooks/useProductPaginationQuery';
import { SetURLSearchParams } from 'react-router-dom';

interface IProductListProps {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
    page: number;
    setPage: (page: number) => void;
    currentFilterValue: number;
    currentCriteria: PARAM_TYPE;
    search: string;
}

function ProductList({
    searchParams,
    setSearchParams,
    page,
    setPage,
    currentCriteria,
    currentFilterValue,
    search
}: IProductListProps) {
    const { data } = useProductPaginationQuery(
        page,
        currentCriteria,
        currentFilterValue,
        search
    );

    const products = data.data;
    const totalCount = data.totalCount || 0; //7 page_size: 5
    const TOTAL_PAGE = Math.ceil(totalCount / PAGE_SIZE);

    const handleChangePage = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
        searchParams.forEach((value, key) => {
            searchParams.set(key, value);
        });
        searchParams.set('page', value.toString());
        setSearchParams(searchParams);
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
                    {products.length === 0 && (
                        <Typography>No found products</Typography>
                    )}
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
