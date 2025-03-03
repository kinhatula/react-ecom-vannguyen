import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import useProductQuery from '../hooks/useProductQuery ';
import { IconButton } from '@mui/material';
import useGalleryDelete from '../hooks/useGalleryDelete ';

interface IGalleriesDataGridProps {
    productId: number;
}
export default function GalleriesDataGrid({
    productId
}: IGalleriesDataGridProps) {
    const imageDeleteMutation = useGalleryDelete(productId);

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
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            editable: false,
            flex: 1,
            renderCell: (params) => {
                const imageId = params.id as number;
                const handleDelete = () => {
                    console.log('delete imageId', imageId);
                    imageDeleteMutation.mutate({
                        productId,
                        imageId
                    });
                };
                return (
                    <IconButton onClick={handleDelete}>
                        <GridDeleteIcon color='error' />
                    </IconButton>
                );
            }
        }
    ];
    const { data } = useProductQuery(productId);
    const galleries = data.data.productImages;

    return (
        <Box sx={{ height: 400, width: '100%', mt: 5 }}>
            <DataGrid
                rows={galleries}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20
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
