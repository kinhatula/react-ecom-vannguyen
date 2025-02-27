import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import {
    FormControl,
    Grid2,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    styled,
    TextField
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useCategoriesQuery from '@/features/category/hooks/useCategoryQuery';
import { useForm, SubmitHandler } from 'react-hook-form';
import { productCreateSchema } from '../schema/ProductSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
});

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

interface IInputFiels {
    name: string;
    longDescription: string;
    shortDescription: string;
    main_image: string;
    quantity: number;
    price: number;
    categoryId: number;
}

export default function ProductModal() {
    const { data, isLoading, error } = useCategoriesQuery();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<IInputFiels>({
        resolver: yupResolver(productCreateSchema)
    });

    const categories = data.data;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //imgage

    const [selectedImage, setSelectedImage] = useState<string | null>('');

    //selected
    const handleChange = (event: SelectChangeEvent) => {
        setValue('categoryId', parseInt(event.target.value));
    };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setSelectedImage(null);
            return;
        }
        const objectUrl = URL.createObjectURL(event.target.files[0]);

        console.log(objectUrl);
        setSelectedImage(objectUrl);
        setValue('main_image', objectUrl);
    };

    const onSubmit: SubmitHandler<IInputFiels> = (data) => console.log(data);

    return (
        <div style={{ marginBottom: '20px' }}>
            <Button variant='contained' onClick={handleOpen}>
                Add Product
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box
                    sx={style}
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                        sx={{ marginBottom: 2 }}
                    >
                        Product
                    </Typography>
                    <Grid2 container columnSpacing={2}>
                        <Grid2 size={6}>
                            <TextField
                                label='name'
                                variant='outlined'
                                fullWidth
                                sx={{ marginBottom: 2 }}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                                {...register('name')}
                            />
                        </Grid2>

                        <Grid2 size={6}>
                            <TextField
                                label='Long Description'
                                variant='outlined'
                                fullWidth
                                sx={{ marginBottom: 2 }}
                                error={Boolean(errors.longDescription)}
                                helperText={errors.longDescription?.message}
                                {...register('longDescription')}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                label='Short Description'
                                variant='outlined'
                                fullWidth
                                sx={{ marginBottom: 2 }}
                                error={Boolean(errors.shortDescription)}
                                helperText={errors.shortDescription?.message}
                                {...register('shortDescription')}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                label='quantity'
                                variant='outlined'
                                fullWidth
                                sx={{ marginBottom: 2 }}
                                error={Boolean(errors.quantity)}
                                helperText={errors.quantity?.message}
                                {...register('quantity')}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <TextField
                                label='price'
                                variant='outlined'
                                fullWidth
                                sx={{ marginBottom: 2 }}
                                error={Boolean(errors.price)}
                                helperText={errors.price?.message}
                                {...register('price')}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                <InputLabel id='demo-simple-select-label'>
                                    Category
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    label='Category'
                                    defaultValue=''
                                    onChange={handleChange}
                                >
                                    {categories.map((item: ICategory) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.categoryId ? (
                                    <Typography color='error'>
                                        {errors.categoryId?.message}
                                    </Typography>
                                ) : null}
                            </FormControl>
                        </Grid2>
                    </Grid2>
                    <Button
                        component='label'
                        role={undefined}
                        variant='contained'
                        color='warning'
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{ marginBottom: 2 }}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type='file'
                            onChange={handleImageChange}
                            multiple
                        />
                    </Button>
                    {errors.main_image ? (
                        <Typography color='error'>
                            {errors.main_image?.message}
                        </Typography>
                    ) : null}
                    <div>
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                style={{
                                    width: 150,
                                    height: 150,
                                    marginBottom: 10
                                }}
                            />
                        ) : null}
                    </div>
                    <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
