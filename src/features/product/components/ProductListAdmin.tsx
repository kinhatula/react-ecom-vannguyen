import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import useProductQuery from '../hooks/useProductQuery';
import useCategoriesQuery from '@/features/category/hooks/useCategoryQuery';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
interface IProductListAdminProps {
    setSelectedProduct: (product: IProduct) => void;
    handOpenConfirmModal: () => void;
}

export default function ProductListAdmin({
    setSelectedProduct,
    handOpenConfirmModal
}: IProductListAdminProps) {
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
            editable: true
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
                const handleDelete = () => {
                    const product = params.row;
                    setSelectedProduct(product);
                    handOpenConfirmModal();
                };
                return (
                    <>
                        <IconButton>
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
    const getCategoryName = (categotyId: number) => {
        const categories = categoriesData.data;
        return categories.find((cat) => cat.id === categotyId);
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
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
