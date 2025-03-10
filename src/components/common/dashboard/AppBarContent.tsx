import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router";
import routeNames from "@app-consts/routeNames.ts";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import {blueGrey} from "@mui/material/colors";
import {User} from "@app-types/user.ts";
import AppBarMenu from "@app-components/common/dashboard/AppBarMenu.tsx";


interface AppBarContentProps {
    open: boolean;
    handleDrawerOpen: () => void;
    user: User | null;
    logout: () => void;
}


export default function AppBarContent({open, handleDrawerOpen, user, logout}: AppBarContentProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpened = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                    {
                        marginRight: 5,
                    },
                    open && {display: 'none'},
                ]}
            >
                <MenuIcon/>
            </IconButton>
            <Link component={RouterLink} to={`/${routeNames.home}`} display="flex" alignItems="center">
                <Box
                    component="img"
                    src="/shortly-logo.png"

                    maxHeight={50}
                    maxWidth={110}
                />
            </Link>
            <Box sx={{display: {md: 'flex'}, marginLeft: 'auto'}}>
                <IconButton
                    onClick={handleClick}
                    sx={{p: 0}}
                    size='small'
                    aria-controls={menuOpened ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuOpened ? 'true' : undefined}
                >
                    <Avatar
                        alt={`${user?.firstName} ${user?.lastName ? user.lastName : ""}`}
                        src="/static/images/avatar/2.jpg"
                        sx={{backgroundColor: blueGrey[800]}}
                    />
                </IconButton>
            </Box>
            <AppBarMenu
                open={menuOpened}
                anchorEl={anchorEl}
                handleClose={handleClose}
                user={user}
                logout={logout}
            />
        </Toolbar>
    );
}