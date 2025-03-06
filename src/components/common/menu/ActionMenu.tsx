import React from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import blueGrey from "@mui/material/colors/blueGrey";
import {ActionMenuItem} from "@app-types/menu.ts";

interface ActionMenuProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    handleClose: () => void;
    actionMenuItems: ActionMenuItem[];
    dividerAfterIndexes?: number[];
}

export default function ActionMenu({
                                       open,
                                       anchorEl,
                                       handleClose,
                                       actionMenuItems,
                                       dividerAfterIndexes = []
                                   }: ActionMenuProps) {
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
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                    },
                },
            }}
            transformOrigin={{horizontal: "right", vertical: "top"}}
            anchorOrigin={{horizontal: "right", vertical: "bottom"}}
        >
            {actionMenuItems.map(({menuItemTitle, onClick, iconName: IconComponent}, index) => (
                <React.Fragment key={menuItemTitle}>
                    <MenuItem onClick={onClick} sx={{color: blueGrey[800]}}>
                        {IconComponent && (
                            <ListItemIcon>
                                <IconComponent fontSize="small" sx={{color: blueGrey[800]}}/>
                            </ListItemIcon>
                        )}
                        {menuItemTitle}
                    </MenuItem>
                    {dividerAfterIndexes.includes(index) && <Divider/>}
                </React.Fragment>
            ))}
        </Menu>
    );
}
