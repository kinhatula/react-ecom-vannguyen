import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { couponCreateSchema } from '../schema/couponSchema';
import useCouponCreate from '../hooks/useCouponCreate';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export interface IInPutFields {
    code: string;
    discountPrice: number;
    discountType: ICouponType;
}

export default function CouponModal() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<IInPutFields>({
        resolver: yupResolver(couponCreateSchema)
    });
    //react
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //react Query
    const couponCreateMutation = useCouponCreate(handleClose, reset);

    const onSubmit: SubmitHandler<IInPutFields> = (data) => {
        couponCreateMutation.mutate(data);
    };

    return (
        <div>
            <Button onClick={handleOpen} variant='contained'>
                Open modal
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                        mb={2}
                    >
                        Coupon
                    </Typography>
                    <Box
                        component='form'
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField
                            id='outlined-basic'
                            label='Code'
                            variant='outlined'
                            fullWidth
                            sx={{ marginBottom: 2 }}
                            error={Boolean(errors.code)}
                            helperText={errors.code?.message}
                            {...register('code')}
                        />
                        <TextField
                            id='outlined-basic'
                            label='Discount Price'
                            variant='outlined'
                            fullWidth
                            sx={{ marginBottom: 2 }}
                            error={Boolean(errors.discountPrice)}
                            helperText={errors.discountPrice?.message}
                            {...register('discountPrice')}
                        />
                        <TextField
                            id='outlined-basic'
                            label='Discount Type'
                            variant='outlined'
                            fullWidth
                            sx={{ marginBottom: 2 }}
                            error={Boolean(errors.discountType)}
                            helperText={errors.discountType?.message}
                            {...register('discountType')}
                        />
                        <Button type='submit' variant='contained' fullWidth>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
