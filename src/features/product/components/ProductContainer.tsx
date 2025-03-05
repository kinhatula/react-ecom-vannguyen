import { Grid2 as Grid, Paper, Stack, TextField } from '@mui/material';
import Filter from './Filter';
import ProductList from './ProductList';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PARAM_TYPE } from '@/contants/product';

function ProductContainer() {
    // Router
    const [searchParams, setSearchParams] = useSearchParams();
    // Normal Vars
    const currentPage = parseInt(searchParams.get('page') || '1');
    const currentCriteria = (searchParams.get('criteria') ||
        'from') as PARAM_TYPE;
    const currentFilterValue = parseInt(searchParams.get('value') || '1');
    const currentSearch = searchParams.get('name') || '';
    // react
    const [page, setPage] = useState(currentPage);
    const [criteria, setCriteria] = useState(currentCriteria);
    const [filterValue, setFilterValue] = useState(currentFilterValue);
    const [search, setSearch] = useState(currentSearch);

    useEffect(() => {
        searchParams.set('page', page.toString());
        searchParams.set('criteria', criteria);
        searchParams.set('value', filterValue.toString());
        searchParams.set('name', search);
        setSearchParams(searchParams);
    }, [searchParams, setSearchParams, page, criteria, filterValue,search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        searchParams.set('name', e.target.value);
    };
    return (
        <>
            <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                spacing={2}
                mb={5}
            >
                <TextField
                    label='Search...'
                    variant='filled'
                    sx={{ width: 500 }}
                    value={search}
                    onChange={handleSearchChange}
                />
                {/* <Button variant='contained' onClick={handleSearch}>
                    Search
                </Button> */}
            </Stack>

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
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            page={page}
                            setPage={setPage}
                            currentCriteria={currentCriteria}
                            currentFilterValue={currentFilterValue}
                            search={search}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default ProductContainer;
