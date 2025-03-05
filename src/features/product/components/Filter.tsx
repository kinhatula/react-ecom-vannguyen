import { PARAM_TYPE } from '@/contants/product';
import PriceSlider from './PriceSlider';
import {
    Box,
    FormControl,
    Grid2 as Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    Typography
} from '@mui/material';
import { SetURLSearchParams } from 'react-router-dom';

interface IFillerProp {
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
    criteria: string;
    setCriteria: (criteria: PARAM_TYPE) => void;
    filterValue: number;
    setFilterValue: (value: number) => void;
}
function Filter({
    searchParams,
    setSearchParams,
    criteria,
    setCriteria,
    filterValue,
    setFilterValue
}: IFillerProp) {
    const handleChange = (event: SelectChangeEvent) => {
        setCriteria(event.target.value as PARAM_TYPE);
        searchParams.set('criteria', event.target.value);
        setSearchParams(searchParams);
    };
    return (
        <div>
            <Paper>
                <Box>
                    <Typography variant='h5' sx={{ marginBottom: '30px' }}>
                        Filter By Price
                    </Typography>
                    <Stack direction={'row'} spacing={2}>
                        <FormControl sx={{ width: 100 }}>
                            <InputLabel id='demo-simple-select-label'>
                                Price
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={criteria}
                                label='Criteria'
                                onChange={handleChange}
                            >
                                <MenuItem value={'from'}>From</MenuItem>
                                <MenuItem value={'to'}>To</MenuItem>
                            </Select>
                        </FormControl>
                        <PriceSlider
                            filterValue={filterValue}
                            setFilterValue={setFilterValue}
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                        />
                    </Stack>
                </Box>
            </Paper>
        </div>
    );
}

export default Filter;
