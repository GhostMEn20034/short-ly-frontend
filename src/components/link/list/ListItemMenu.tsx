import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from '@mui/icons-material/Delete';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import * as React from "react";
import {SvgIconProps} from "@mui/material";
import blueGrey from "@mui/material/colors/blueGrey";


interface LinkMenuItem {
    menuItemTitle: string;
    iconName: React.ElementType<SvgIconProps>;
    onClick: () => void;
}

interface ListItemMenuProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    handleClose: () => void;
}

const menuItems: LinkMenuItem[] = [
    {menuItemTitle: "Delete", iconName: DeleteIcon, onClick: () => "hello"},
    {menuItemTitle: "View link details", iconName: InsertLinkOutlinedIcon, onClick: () => "hello"},
    {menuItemTitle: "View QR Code", iconName: QrCodeOutlinedIcon, onClick: () => "hello"},
];

export default function ListItemMenu({open, anchorEl, handleClose}: ListItemMenuProps) {
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
                    },
                },
            }}
            transformOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
            {menuItems.map(({menuItemTitle, onClick, iconName: IconComponent}) => (
                <MenuItem key={menuItemTitle} onClick={onClick} sx={{ color: blueGrey[800] }}>
                    <ListItemIcon>
                        <IconComponent fontSize="small" sx={{ color: blueGrey[800] }} />
                    </ListItemIcon>
                    {menuItemTitle}
                </MenuItem>
            ))}
        </Menu>
    );
}