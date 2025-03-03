import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { SetURLSearchParams } from 'react-router-dom';

const Input = styled(MuiInput)`
    width: 42px;
`;
interface IPriceSliderProps {
    filterValue: number;
    setFilterValue: (value: number) => void;
    searchParams: URLSearchParams;
    setSearchParams: SetURLSearchParams;
}

export default function PriceSlider({
    filterValue,
    setFilterValue,
    searchParams,
    setSearchParams
}: IPriceSliderProps) {
    const handleSliderChange = (_event: Event, newValue: number | number[]) => {
        setFilterValue(newValue as number);
        searchParams.set('value', newValue.toString());
        setSearchParams(searchParams);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue =
            event.target.value === '' ? 0 : Number(event.target.value);
        setFilterValue(newValue);
        searchParams.set('value', newValue.toString());
        setSearchParams(searchParams);
    };

    const handleBlur = () => {
        if (filterValue < 0) {
            setFilterValue(0);
        } else if (filterValue > 5000) {
            setFilterValue(5000);
        }
    };
    return (
        <Box sx={{ flex: 1 }}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid item xs>
                    <Slider
                        max={5000}
                        value={
                            typeof filterValue === 'number' ? filterValue : 0
                        }
                        onChange={handleSliderChange}
                        aria-labelledby='input-slider'
                    />
                </Grid>
                <Grid item>
                    <Input
                        sx={{ width: 50 }}
                        value={filterValue}
                        size='small'
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 50,
                            min: 0,
                            max: 5000,
                            type: 'number',
                            'aria-labelledby': 'input-slider'
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
