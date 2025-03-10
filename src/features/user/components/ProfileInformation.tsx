import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from '@/redux/hook';
import { useEffect } from 'react';
import useProfileInformationUpdate from '../hooks/useProfileInformationUpdate';
import { profileInformationSchema } from '../schema/profileInformationSchema';

interface IInPutFields {
    firstName: string;
    lastName: string;
}

export default function ProfileInformation() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IInPutFields>({
        resolver: yupResolver(profileInformationSchema)
    });

    const { user } = useAppSelector((state) => state.user);
    const updateProfileMutation = useProfileInformationUpdate();

    const onSubmit: SubmitHandler<IInPutFields> = (data) => {
        updateProfileMutation.mutate({
            id: user.id,
            data
        });
    };
    useEffect(() => {
        setValue('firstName', user.firstName);
        setValue('lastName', user.lastName);
    }, [user, setValue]);

    return (
        <Box
            component='form'
            noValidate
            autoComplete='off'
            sx={{ padding: '0 100px' }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                label='First Name'
                variant='outlined'
                fullWidth
                sx={{ mb: 2 }}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
                {...register('firstName')}
            />
            <TextField
                label='Last Name'
                variant='outlined'
                fullWidth
                sx={{ mb: 2 }}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                {...register('lastName')}
            />
            <Stack justifyContent={'center'} alignItems={'center'}>
                <Button type='submit' variant='contained'>
                    Change
                </Button>
            </Stack>
        </Box>
    );
}
