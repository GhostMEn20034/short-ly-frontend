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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Divider from "@mui/material/Divider";


interface AppBarMenuProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    handleClose: () => void;
}

interface AppBarContentProps {
    open: boolean;
    handleDrawerOpen: () => void;
    user: User | null;
}


function AppBarMenu({open, anchorEl, handleClose}: AppBarMenuProps) {
    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
                <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    )
}


export default function AppBarContent({open, handleDrawerOpen, user}: AppBarContentProps) {
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
                        alt={`${user?.firstName} ${user?.lastName}`}
                        src="/static/images/avatar/2.jpg"
                        sx={{backgroundColor: blueGrey[800]}}
                    />
                </IconButton>
            </Box>
            <AppBarMenu open={menuOpened} anchorEl={anchorEl} handleClose={handleClose} />
        </Toolbar>
    );
}