import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileAddressSchema } from '../schema/profileInformationSchema';
import useProfileAddressCreate from '../hooks/useProfileAddressCreate';
import ProfileAddressTable from './ProfileAddressTable';
import { useAppSelector } from '@/redux/hook';

export interface IInPutFields {
    street: string;
    province: string;
    country: string;
    postalCode: number;
}

export default function ProfileAddress() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IInPutFields>({
        resolver: yupResolver(profileAddressSchema)
    });

    const { user } = useAppSelector((state) => state.user);

    const addressCreateMutation = useProfileAddressCreate(user.id,reset);

    const onSubmit: SubmitHandler<IInPutFields> = (data) => {
        console.log('check data', data);
        addressCreateMutation.mutate(data);
    };

    return (
        <Box
            component='form'
            noValidate
            autoComplete='off'
            sx={{ padding: '0 100px' }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                label='Stress'
                variant='outlined'
                fullWidth
                sx={{ mb: 2 }}
                error={Boolean(errors.street)}
                helperText={errors.street?.message}
                {...register('street')}
            />
            <TextField
                label='Province'
                variant='outlined'
                fullWidth
                sx={{ mb: 2 }}
                error={Boolean(errors.province)}
                helperText={errors.province?.message}
                {...register('province')}
            />
            <TextField
                label='Country'
                variant='outlined'
                fullWidth
                sx={{ mb: 2 }}
                error={Boolean(errors.country)}
                helperText={errors.country?.message}
                {...register('country')}
            />
            <TextField
                label='Postal Code'
                variant='outlined'
                fullWidth
                sx={{ mb: 2 }}
                error={Boolean(errors.postalCode)}
                helperText={errors.postalCode?.message}
                {...register('postalCode')}
            />
            <Stack justifyContent={'center'} alignItems={'center'}>
                <Button type='submit' variant='contained'>
                    Change
                </Button>
            </Stack>
            <ProfileAddressTable />
        </Box>
    );
}
