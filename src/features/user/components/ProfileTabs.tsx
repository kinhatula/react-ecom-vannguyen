import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProfileInformation from './ProfileInformation';
import ProfilePassword from './ProfilePassword';
import ProfileAddress from './ProfileAddress';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

export default function ProfileTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: 1000 }}>
            <AppBar position='static' color='secondary'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='secondary'
                    textColor='inherit'
                    variant='fullWidth'
                    aria-label='full width tabs example'
                >
                    <Tab label='Change Profile' {...a11yProps(0)} />
                    <Tab label='Change Password' {...a11yProps(1)} />
                    <Tab label='Address' {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <ProfileInformation />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <ProfilePassword />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <ProfileAddress />
            </TabPanel>
        </Box>
    );
}
