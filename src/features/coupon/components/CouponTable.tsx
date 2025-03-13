import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridDeleteIcon } from '@mui/x-data-grid';
import useCouponsQuery from '../hooks/useCouponQuery';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import ModalConfirm from '@/components/ModalConfirm';
import useCouponDelete from '../hooks/useCouponDelete';
import { set } from 'react-hook-form';

export default function CouponTable() {
    const columns: GridColDef<ICoupon>[] = [
        { field: 'code', headerName: 'Code', width: 90, flex: 1 },
        {
            field: 'discountPrice',
            headerName: 'Discount Price',
            width: 150,
            editable: true
        },
        {
            field: 'discountType',
            headerName: 'Discount Type',
            width: 150,
            editable: true
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            editable: true,
            renderCell(params) {
                const coupon = params.row;
                const handleRemove = () => {
                    setSelectedCoupon(coupon);
                    setOpenModalConfirm(true);
                };
                return (
                    <IconButton onClick={handleRemove}>
                        <GridDeleteIcon color='warning' />
                    </IconButton>
                );
            }
        }
    ];

    //react
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | undefined>();

    const handleCloseConfirmModal = () => {
        setOpenModalConfirm(false);
    };
    // react Query
    const { data } = useCouponsQuery();

    const coupons = data.data.filter((coupon) => coupon.discountPrice !== 0);
    return (
        <>
            <Box sx={{ height: 400, width: '50%' }}>
                <DataGrid
                    rows={coupons}
                    columns={columns}
                    getRowId={(row) => row.code}
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

            <ModalConfirm
                openConfirmModal={openModalConfirm}
                handleCloseConfirmModal={handleCloseConfirmModal}
                useDelete={useCouponDelete}
                selectedItem={selectedCoupon}
                getItemName={() => selectedCoupon?.code || ''}
                itemName='Coupon'
                selectedItemId={selectedCoupon ? selectedCoupon.code : ''}
            />
        </>
    );
}
