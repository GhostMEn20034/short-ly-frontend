import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import Tooltip from "@mui/material/Tooltip";
import {ActionMenuItem} from "@app-types/dashboard.ts";
import {Link as RouterLink} from "react-router";
import Link from "@mui/material/Link";
import ListItemText from "@mui/material/ListItemText";
import {blueGrey} from "@mui/material/colors";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";


const actionMenuItems: ActionMenuItem[] = [
    {name: "Link", path: `/${rootRoutePrefixes.links}/create`, iconName: InsertLinkOutlinedIcon},
    {name: "QR Code", path: `/${rootRoutePrefixes.QRCodes}/create`, iconName: QrCode2OutlinedIcon},
];


export default function MenuWithActions({renderIconButton}: { renderIconButton: boolean }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: "center",
                textAlign: 'center', width: '95%'
            }}>

                {renderIconButton ? (
                    <Tooltip title="Create New" placement="right">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <AddCircleOutlineIcon color="primary" fontSize='large'/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <DefaultButton
                        variant="contained"
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        fullWidth
                    >
                        Create new
                    </DefaultButton>
                )}
            </Box>
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
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                {actionMenuItems.map(({name, path, iconName: IconComponent}) => (
                        <Link
                            key={path}
                            component={RouterLink}
                            to={path}
                            underline="none"
                            sx={{
                                color: 'inherit', // Keeps text color consistent with the theme
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <IconComponent fontSize="medium" sx={{ color: blueGrey[800]}} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={name}
                                    slotProps={{
                                        primary: {
                                            color: blueGrey[800],
                                        }
                                    }}
                                />
                            </MenuItem>
                        </Link>
                    ))
                }
        </Menu>
</React.Fragment>
);
}