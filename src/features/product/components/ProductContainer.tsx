import { Grid2 as Grid, Paper } from '@mui/material';
import Filter from './Filter';
import ProductList from './ProductList';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

function ProductContainer() {
    // Router
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1') || 1;
    // react
    const [page, setPage] = useState(currentPage);
    const [criteria, setCriteria] = useState('from');

    const [filterValue, setFilterValue] = useState(1000);

    return (
        <Grid container spacing={3}>
            <Grid size={3}>
                <Filter
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    criteria={criteria}
                    setCriteria={setCriteria}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                />
            </Grid>
            <Grid size={9}>
                <Paper>
                    <ProductList
                        setSearchParams={setSearchParams}
                        page={page}
                        setPage={setPage}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ProductContainer;
