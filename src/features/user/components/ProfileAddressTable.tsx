import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import useProfileAddressQuery from '../hooks/useProfileAddressQuery';
import { useAppSelector } from '@/redux/hook';
import { IconButton } from '@mui/material';
import useProfileAddressDelete from '../hooks/useProfileAddressDelete';

export default function ProfileAddressTable() {
    const { user } = useAppSelector(state => state.user);
    const addressDeleteMutation = useProfileAddressDelete(user.id);

    const columns: GridColDef<IAddress>[] = [
        { field: 'id', headerName: 'ID', width: 30 },
        {
            field: 'street',
            headerName: 'Street',
            width: 150,
            editable: true
        },
        {
            field: 'province',
            headerName: 'Province',
            width: 150,
            editable: true
        },
        {
            field: 'country',
            headerName: 'Country',
            type: 'number',
            width: 110,
            editable: true
        },
        {
            field: 'postalCode',
            headerName: 'Postal Code',
            sortable: false,
            width: 100
        },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 100,
            renderCell: (params) => {
                const addressId = params.id as number;
                const handleDelete = () => {
                    addressDeleteMutation.mutate(addressId);
                };

                return (
                    <IconButton color='error' onClick={handleDelete}>
                        <GridDeleteIcon />
                    </IconButton>
                );
            }
        }
    ];
    const { data } = useProfileAddressQuery(user.id);
    const addresses = data.data;
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={addresses}
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
