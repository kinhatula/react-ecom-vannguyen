import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { productCreateSchema } from '../schema/ProductSchema';
import useProductCreate from '../hooks/useProductCreate';
import useCategoriesQuery from '@/features/category/hooks/useCategoryQuery';
import { useEffect, useState } from 'react';
import useProductUpdate from '../hooks/useProductUpdate';

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

interface IInputFields {
    name: string;
    longDescription: string;
    shortDescription: string;
    main_image: File;
    quantity: number;
    price: number;
    categoryId: number;
}
interface IProductModalProps {
    selectedProduct: IProduct | undefined;
    open: boolean;
    setOpen: (open: boolean) => void;
    setSelectedProduct: (product: IProduct | undefined) => void;
}
export default function ProductModal({
    open,
    setOpen,
    selectedProduct,
    setSelectedProduct
}: IProductModalProps) {
    const { data } = useCategoriesQuery();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        reset,
        formState: { errors }
    } = useForm<IInputFields>({
        resolver: yupResolver(productCreateSchema)
    });

    const categories = data.data;

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset();
        setSelectedImage(null);
        setSelectedProduct(undefined);
    };
    const productCreateMutation = useProductCreate(handleClose);
    const productUpdateMutation = useProductUpdate(handleClose);
    //   Image
    const [selectedImage, setSelectedImage] = useState<string | null>('');
    // const [selectedImageFile, setSelectedImageFile] = useState<File>();

    //   Select
    const handleChange = (event: SelectChangeEvent) => {
        setValue('categoryId', parseInt(event.target.value));
        setError('categoryId', {
            message: undefined
        });
    };

    const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            setSelectedImage(null);
            return;
        }

        const objectUrl = URL.createObjectURL(event.target.files[0]); // blob

        setSelectedImage(objectUrl);
        // setSelectedImageFile(event.target.files[1]);
        setValue('main_image', event.target.files[0]);
        setError('main_image', {
            message: undefined
        });
    };
    useEffect(() => {
        if (selectedProduct) {
            setValue('name', selectedProduct.name);
            setValue('longDescription', selectedProduct.longDescription);
            setValue('shortDescription', selectedProduct.shortDescription);
            setValue('price', selectedProduct.price);
            setValue('quantity', selectedProduct.quantity);
            setValue('categoryId', selectedProduct.categoryId);
            if (selectedProduct.main_image) {
                fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/images/products/${
                        selectedProduct.main_image
                    }`
                )
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], 'main_image.jpg', {
                            type: blob.type
                        });
                        setValue('main_image', file);
                    });
            }
        }
    }, [selectedProduct, setValue]);
    console.log('check selectedProduct', selectedProduct);

    const onSubmit: SubmitHandler<IInputFields> = (data) => {
        console.log(data);
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('longDescription', data.longDescription);
        formData.append('shortDescription', data.shortDescription);
        formData.append('quantity', data.quantity.toString());
        formData.append('price', data.price.toString());
        formData.append('categoryId', data.categoryId.toString());
        formData.append('main_image', data.main_image);

        if (selectedProduct) {
            productUpdateMutation.mutate({
                id: selectedProduct.id,
                product: formData
            });
        } else {
            productCreateMutation.mutate(formData);
        }
    };

    console.log('errors, ', errors);

    return (
        <div style={{ marginBottom: '10px' }}>
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
                    component={'form'}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                        sx={{ marginBottom: 2 }}
                    >
                        {selectedProduct ? 'Update' : 'Create'} Product :
                        {selectedProduct?.id}
                    </Typography>

                    <Grid2 container columnSpacing={2}>
                        <Grid2 size={6}>
                            <TextField
                                label='Name'
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
                    </Grid2>

                    <Grid2 container columnSpacing={2}>
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
                                label='Quantity'
                                variant='outlined'
                                fullWidth
                                sx={{ marginBottom: 2 }}
                                error={Boolean(errors.quantity)}
                                helperText={errors.quantity?.message}
                                {...register('quantity')}
                            />
                        </Grid2>
                    </Grid2>

                    <Grid2 container columnSpacing={2}>
                        <Grid2 size={6}>
                            <TextField
                                label='Price'
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
                                    label='Category'
                                    defaultValue={
                                        selectedProduct
                                            ? selectedProduct.categoryId.toString()
                                            : ''
                                    }
                                    onChange={handleChange}
                                >
                                    {categories.map((item: ICategory) => {
                                        return (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
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
                            onChange={handleImagePreview}
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
                                style={{ width: '150px', height: '150px' }}
                            />
                        ) : null}{' '}
                        {!selectedImage && selectedProduct ? (
                            <img
                                src={`${
                                    import.meta.env.VITE_BACKEND_URL
                                }/images/products/${
                                    selectedProduct.main_image
                                }`}
                                style={{ width: '150px', height: '150px' }}
                            />
                        ) : null}{' '}
                    </div>

                    <Button type='submit' variant='contained' fullWidth>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
