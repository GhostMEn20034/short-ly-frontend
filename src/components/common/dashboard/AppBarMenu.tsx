import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {User} from "@app-types/user.ts";
import {blueGrey} from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import routeNames from "@app-consts/routeNames.ts";

interface AppBarMenuProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    user: User | null;
    logout: () => void;
}

export default function AppBarMenu({open, anchorEl, handleClose, user, logout}: AppBarMenuProps) {
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
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            <MenuItem sx={{
                pointerEvents: "none", // Prevent any interaction
            }}>
                <Avatar
                    alt={`${user?.firstName} ${user?.lastName ? user.lastName : ""}`}
                    src="/static/images/avatar/2.jpg"
                    sx={{backgroundColor: blueGrey[800],}}
                />
                <Box>
                    <Typography variant="body1">
                        {`${user?.firstName} ${user?.lastName ? user.lastName : ""}`}
                    </Typography>
                    <Typography variant="body2">
                        {user?.email}
                    </Typography>
                </Box>
            </MenuItem>
            <Divider/>
            <Link
                component={RouterLink}
                to={`/${rootRoutePrefixes.settings}/${routeNames.profile}`}
                sx={{
                    textDecoration: 'none',
                    color: "inherit",
                }}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
            </Link>
            <MenuItem onClick={logout}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
}