import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from "@mui/material/Drawer";
import CssBaseline from '@mui/material/CssBaseline';
import DefaultAppBar from '@app-helper-components/home/AppBar/DefaultAppBar.tsx';
import MobileAppBar from "@app-helper-components/home/AppBar/MobileAppBar.tsx";
import DefaultDrawer from '@app-helper-components/home/SideBar/DefaultDrawer.tsx';
import DrawerHeader from "@app-helper-components/home/SideBar/DrawerHeader.tsx";
import {Outlet} from 'react-router';
import AppBarContent from "@app-components/common/dashboard/AppBarContent.tsx";
import DrawerContent from "@app-components/common/dashboard/DrawerContent.tsx";
import {useMediaQuery} from "@mui/material";
import {drawerWidth} from "@app-consts/componentSizes.ts";
import {useContext} from "react";
import UserProvider, {UserContextType} from "@app-context/UserContext.tsx";


export default function NavigationBar({ pathname }: { pathname: string }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { userInfo } = useContext(UserProvider) as UserContextType;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            {!isMobile ? (
                <>
                    <DefaultAppBar position="fixed" open={open}>
                        <AppBarContent
                            open={open}
                            handleDrawerOpen={handleDrawerOpen}
                            user={userInfo}
                        />
                    </DefaultAppBar>
                    <DefaultDrawer variant="permanent" open={open}>
                        <DrawerContent
                            open={open}
                            theme={theme}
                            handleDrawerClose={handleDrawerClose}
                            pathname={pathname}
                            user={userInfo}
                        />
                    </DefaultDrawer>
                </>
            ) : (
                <>
                    <MobileAppBar position="fixed"
                            sx={{
                                width: {sm: `calc(100% - ${drawerWidth}px)`},
                                ml: {sm: `${drawerWidth}px`},
                            }}
                    >
                        <AppBarContent
                            open={open}
                            handleDrawerOpen={handleDrawerOpen}
                            user={userInfo}
                        />
                    </MobileAppBar>
                    <Drawer
                        variant="temporary"
                        open={open}
                        onClose={handleDrawerClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        <DrawerContent
                            open={open}
                            theme={theme}
                            handleDrawerClose={handleDrawerClose}
                            pathname={pathname}
                            user={userInfo}
                        />
                    </Drawer>
                </>
            )}
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                <Outlet/>
            </Box>
        </Box>
    );
}