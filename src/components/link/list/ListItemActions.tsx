import Box from "@mui/material/Box";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import React from "react";
import ActionMenu from "@app-components/common/menu/ActionMenu.tsx";
import {ActionMenuItem} from "@app-types/menu.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import QrCodeOutlinedIcon from "@mui/icons-material/QrCodeOutlined";

interface ListItemActionsProps {
    shortLink: string;
    goToEditPage: () => void;
    goToDetailsPage: () => void;
    openDeleteLinkDialog: () => void;
}

export default function ListItemActions({ shortLink, goToEditPage, goToDetailsPage, openDeleteLinkDialog }: ListItemActionsProps) {
    const menuItems: ActionMenuItem[] = [
        {menuItemTitle: "Delete", iconName: DeleteIcon, onClick: openDeleteLinkDialog},
        {menuItemTitle: "View link details", iconName: InsertLinkOutlinedIcon, onClick: () => goToDetailsPage()},
        {menuItemTitle: "View QR Code", iconName: QrCodeOutlinedIcon, onClick: () => goToDetailsPage()},
    ];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [shortLinkCopied, setShortLinkCopied] = React.useState<boolean>(false);
    const menuOpened = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const copyShortLink = async () => {
        await navigator.clipboard.writeText(shortLink);
        setShortLinkCopied(true);

        setTimeout(() => {
            setShortLinkCopied(false);
        }, 3000);
    };

    return (
        <Box display="flex" gap={0.5} justifyContent="flex-end">
            <Box>
                <DefaultButton
                    onClick={copyShortLink}
                    startIcon={<ContentCopyOutlinedIcon />}
                    variant="outlined"
                    color="secondary"
                    size="small"
                >
                    {shortLinkCopied ? "Copied" : "Copy"}
                </DefaultButton>
            </Box>
            <Box>
                <DefaultButton
                    onClick={goToEditPage}
                    startIcon={<EditIcon />}
                    variant="outlined"
                    color="secondary"
                    size="small"
                >
                    Edit
                </DefaultButton>
            </Box>
            <Box>
                <DefaultButton
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={handleClick}
                >
                    <b>...</b>
                </DefaultButton>
            </Box>
            <ActionMenu
                open={menuOpened}
                anchorEl={anchorEl}
                handleClose={handleClose}
                actionMenuItems={menuItems}
            />
        </Box>
    );
}