import Box from '@mui/material/Box';
import {
    DataGrid,
    GridColDef,
    GridDeleteIcon,
    GridToolbar
} from '@mui/x-data-grid';
import useProductQuery from '../hooks/useProductsQuery';
import useCategoriesQuery from '@/features/category/hooks/useCategoryQuery';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import { useNavigate } from 'react-router-dom';

interface IProductListAdminProps {
    setSelectedProduct: (product: IProduct) => void;
    handOpenConfirmModal: () => void;
    handleOpenAddOrUpdateModal: () => void;
}

export default function ProductListAdmin({
    setSelectedProduct,
    handOpenConfirmModal,
    handleOpenAddOrUpdateModal
}: IProductListAdminProps) {
    const navigate = useNavigate();

    const columns: GridColDef<IProduct>[] = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true
        },
        {
            field: 'shortDescription',
            headerName: 'Short Description',
            width: 150,
            editable: true
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 80,
            editable: true
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 110,
            editable: true,
            renderCell(params) {
                const price = params.value;
                return (
                    <span>
                        {price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND'
                        })}
                    </span>
                );
            }
        },
        {
            field: 'main_image',
            headerName: 'Image',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                return (
                    <img
                        src={`${
                            import.meta.env.VITE_BACKEND_URL
                        }/images/products/${params.value}`}
                        width={50}
                        height={50}
                    />
                );
            }
        },
        {
            field: 'categoryId',
            headerName: 'Category Name',
            sortable: false,
            width: 160,
            renderCell(params) {
                const categoryId = params.value;
                const category = getCategoryName(categoryId);
                return category ? category.name : '';
            }
        },
        {
            field: 'shopId',
            headerName: 'Shop Id',
            sortable: false,
            width: 80
        },

        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 200,
            renderCell(params) {
                const product = params.row;

                const handleDelete = () => {
                    setSelectedProduct(product);
                    handOpenConfirmModal();
                };
                const handleEdit = () => {
                    setSelectedProduct(product);
                    handleOpenAddOrUpdateModal();
                };
                const handleGallery = () => {
                    navigate(`/admin/product/${product.id}/images`);
                };
                return (
                    <>
                        <IconButton onClick={handleGallery}>
                            <EditAttributesIcon color='warning' />
                        </IconButton>

                        <IconButton onClick={handleEdit}>
                            <EditIcon color='warning' />
                        </IconButton>

                        <IconButton onClick={handleDelete}>
                            <GridDeleteIcon color='error' />
                        </IconButton>
                    </>
                );
            }
        }
    ];
    const { data, isLoading, error } = useProductQuery();
    const { data: categoriesData } = useCategoriesQuery();
    const products = data.data;
    const getCategoryName = (categoryId: number) => {
        const categories = categoriesData.data;
        return categories.find((cat) => cat.id === categoryId);
    };

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>Error...</h1>;

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={products}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5, 10, 15]}
                checkboxSelection
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true
                    }
                }}
            />
        </Box>
    );
}
