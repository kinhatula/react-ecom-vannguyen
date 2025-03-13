import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';
import { parseJson } from '@/utils/common.utils';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import useAllOrdersQuery from '../hooks/useAllOrderQuery';
import useOrderStatusUpdate from '../hooks/useOrderStatusUpdate';

export default function OrderTableAdmin() {
    const { data } = useAllOrdersQuery();
    const orders = data.data;

    // React Query
    const updateStatusMutation = useOrderStatusUpdate();

    const handleChange = (event: SelectChangeEvent, order: IOrder) => {
        const orderStatus = event.target.value as string;
        updateStatusMutation.mutate({
            id: order.id,
            data: { status: orderStatus }
        });
    };
    // react Router
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

                return (
                    <FormControl fullWidth>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={order.status}
                            label='Status'
                            onChange={(e) => handleChange(e, order)}
                            sx={{
                                height: 40,
                                marginTop: 1
                            }}
                        >
                            <MenuItem value={'pending'}>Pending</MenuItem>
                            <MenuItem value={'delivered'}>Delivered</MenuItem>
                            <MenuItem value={'cancel'}>Cancel</MenuItem>
                        </Select>
                    </FormControl>
                );
            }
        },
        {
            field: 'userId',
            headerName: 'User Id',
            width: 150,
            editable: true
        },
        {
            field: 'actions',
            headerName: 'Action',
            width: 150,
            editable: true,
            renderCell: (params) => {
                const handleOrderDetail = () => {
                    console.log('check order', params.id);
                    navigate(`/admin/order/${params.id}`);
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
        <Box sx={{ height: 500, width: '100%' }}>
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
