import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profilePasswordSchema } from '../schema/profileInformationSchema';
import useProfileInformationUpdate from '../hooks/useProfileInformationUpdate';
import useProfilePasswordUpdate from '../hooks/useProfilePasswordUpdate';

interface IInPutFields {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
export default function ProfilePassword() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IInPutFields>({
        resolver: yupResolver(profilePasswordSchema)
    });
    const updatePasswordMutation = useProfilePasswordUpdate();

    const onSubmit: SubmitHandler<IInPutFields> = (data) => {
        console.log('check data', data);
        updatePasswordMutation.mutate(data);
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
                label='Current Password'
                variant='outlined'
                fullWidth
                type='password'
                sx={{ mb: 2 }}
                error={Boolean(errors.currentPassword)}
                helperText={errors.currentPassword?.message}
                {...register('currentPassword')}
            />
            <TextField
                label='New Password'
                variant='outlined'
                fullWidth
                type='password'
                sx={{ mb: 2 }}
                error={Boolean(errors.newPassword)}
                helperText={errors.newPassword?.message}
                {...register('newPassword')}
            />
            <TextField
                label='Confirm Password'
                variant='outlined'
                fullWidth
                type='password'
                sx={{ mb: 2 }}
                error={Boolean(errors.confirmNewPassword)}
                helperText={errors.confirmNewPassword?.message}
                {...register('confirmNewPassword')}
            />
            <Stack justifyContent={'center'} alignItems={'center'}>
                <Button type='submit' variant='contained'>
                    Change
                </Button>
            </Stack>
        </Box>
    );
}
