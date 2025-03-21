import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DiscountIcon from '@mui/icons-material/Discount';
import { useNavigate } from 'react-router-dom';

const sidebarList = [
    {
        name: 'Category',
        icon: <CategoryIcon />,
        link: '/admin/category'
    },
    {
        name: 'Product',
        icon: <InventoryIcon />,
        link: '/admin/product'
    },
    {
        name: 'Order',
        icon: <ShoppingCartIcon />,
        link: '/admin/order'
    },

    {
        name: 'Coupon',
        icon: <DiscountIcon />,
        link: '/admin/coupon'
    }
];
export default function SideBar() {
    const navigate = useNavigate();
    const handleClick = (
        _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        url: string
    ) => {
        navigate(url);
    };
    const DrawerList = (
        <Box sx={{ width: 250 }} role='presentation'>
            <List>
                {sidebarList.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            onClick={(event) => handleClick(event, item.link)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            <Drawer
                open={true}
                hideBackdrop
                variant='persistent'
                sx={{ '& .MuiDrawer-paper': { marginTop: '64px' } }}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}
