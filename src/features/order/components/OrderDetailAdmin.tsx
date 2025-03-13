import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useOrderQuery from '../hooks/useOrderQuery';
import { useAppSelector } from '@/redux/hook';
import { useParams } from 'react-router-dom';
import { getMainImage } from '@/utils/product.utils';

export default function OrderDetailAdmin() {
    //redux
    const { user } = useAppSelector((state) => state.user);
    //react query
    const { data } = useOrderQuery(user.id);
    //router
    const { id } = useParams();

    const orderId = parseInt(id || '0');
    const orders = data.data;
    const order = orders.find((o) => o.id === orderId);

    const orderItem = order?.orderItems || [];

    const columns: GridColDef<IOrderItem>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'main_Image',
            headerName: 'Main Image',
            width: 150,
            editable: true,
            renderCell: (params) => {
                const orderItem = params.row;
                return (
                    <img
                        src={getMainImage(orderItem.product)}
                        width={50}
                        height={50}
                    />
                );
            }
        },
        {
            field: 'name',
            headerName: 'Product Name',
            width: 150,
            editable: true,
            flex: 1,
            renderCell: (params) => {
                const orderItem = params.row;
                return orderItem.product.name;
            }
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            editable: true,
           
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 110,
            editable: true
        }
    ];
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={orderItem}
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
