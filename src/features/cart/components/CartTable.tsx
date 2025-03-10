import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useCartQuery from '../hooks/useCartQuery';
import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useCartItemDelete from '../hooks/useCartItemDelete';
import ProfileAddress from '@/features/user/components/ProfileAddress';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

export default function CartTable() {
    const { data } = useCartQuery();
    const cartItemDeleteMutation = useCartItemDelete();
    const cartItems = data.data.cartItems;

    const handleDelete = (cartItem: ICartItem) => {
        console.log('handleDelete', cartItem);
        cartItemDeleteMutation.mutate(cartItem.id);
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell sx={{ width: 100 }}>
                            Product Image
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                            Product Name
                        </StyledTableCell>
                        <StyledTableCell align='right'>
                            Quantity
                        </StyledTableCell>
                        <StyledTableCell align='right'>Price</StyledTableCell>
                        <StyledTableCell align='right'>Clear</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartItems.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component='th' scope='row'>
                                <img
                                    width={50}
                                    height={50}
                                    src={`${
                                        import.meta.env.VITE_BACKEND_URL
                                    }/images/products/${row.productImage}`}
                                />
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                {row.productName}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                {row.quantity}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                {row.price}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                <IconButton onClick={() => handleDelete(row)}>
                                    <DeleteIcon />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            {cartItems.length === 0 && <Typography>Vào lại Shop</Typography>}
            {/* <ProfileAddress/> */}
        </TableContainer>
    );
}
