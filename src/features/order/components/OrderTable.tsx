import { useAppSelector } from '@/redux/hook';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useOrderQuery from '../hooks/useOrderQuery';
import { IconButton, Typography } from '@mui/material';
import { parseJson } from '@/utils/common.utils';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
export default function OrderTable() {
    const { user } = useAppSelector((state) => state.user);
    const { data } = useOrderQuery(user.id);
    const orders = data.data;

    // react rout
    const navigate = useNavigate();

    const columns: GridColDef<IOrder>[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'address',
            headerName: 'Address',
            width: 300,
            editable: true,
            renderCell: (params) => {
                const order = params.row;
                const address = parseJson(order.address) as IAddress;
                return (
                    <span>
                        {address.country}-{address.province}-{address.street}-
                        {address.postalCode}
                    </span>
                );
            }
        },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            width: 150,
            editable: true,
            renderCell: (params) => {
                const order = params.row;
                return <span>${order.totalPrice}</span>;
            }
        },
        {
            field: 'totalQuantity',
            headerName: 'Total Quantity',
            type: 'number',
            width: 110,
            editable: true,
            renderCell: (params) => {
                const order = params.row;
                return <span>{order.totalQuantity}</span>;
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                const order = params.row;

                let color = '';
                if (order.status === 'pending') color = 'warning';
                if (order.status === 'delivered') color = 'success';
                if (order.status === 'cancel') color = 'error';

                return <Typography color={color}>{order.status}</Typography>;
            }
        },
        {
            field: 'actions',
            headerName: 'Action',
            width: 150,
            editable: true,
            renderCell: (params) => {
                const handleOrderDetail = () => {
                    console.log('check order', params.id);
                    navigate(`/orders/${params.id}`);
                };
                return (
                    <IconButton onClick={handleOrderDetail}>
                        <VisibilityIcon color='success' />
                    </IconButton>
                );
            }
        }
    ];
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                disableMultipleRowSelection
                sx={{
                    '& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer':
                        {
                            display: 'none'
                        }
                }}
                rows={orders}
                columns={columns}
                isRowSelectable={() => false}
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
