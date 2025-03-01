import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useProductQuery from '../hooks/useProductQuery ';

const columns: GridColDef<IGallery>[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
        field: 'image',
        headerName: 'Image',
        width: 150,
        editable: false,
        flex: 1,
        renderCell: (params) => {
            return (
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/products/${
                        params.value
                    }`}
                    width={50}
                    height={50}
                />
            );
        }
    }
];

interface IGalleriesDataGridProps {
    productId: string;
}
export default function GalleriesDataGrid({
    productId
}: IGalleriesDataGridProps) {
    const { data } = useProductQuery(parseInt(productId));
    const galleries = data.data.productImages;

    return (
        <Box sx={{ height: 400, width: '100%', mt: 5 }}>
            <DataGrid
                rows={galleries}
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
