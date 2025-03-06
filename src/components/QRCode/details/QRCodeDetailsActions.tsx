import Box from "@mui/material/Box";
import {ActionMenuItem} from "@app-types/menu.ts";
import React from "react";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ActionMenu from "@app-components/common/menu/ActionMenu.tsx";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {Options} from "qr-code-styling";
import downloadQRCode from "@app-utils/qrCode/download.ts";
import {QRCodeItemWithLink} from "@app-types/qrCode.ts";


interface QRCodeDetailsActionsProps {
    options: Options;
    item: QRCodeItemWithLink;
    goToLinkDetailsPage: () => void;
    goToQRCodeCustomizationPage: () => void;
    goToQRCodeUpdateContentPage: () => void;
}


export default function QRCodeDetailsActions({
                                                 options,
                                                 item,
                                                 goToLinkDetailsPage,
                                                 goToQRCodeUpdateContentPage,
                                                 goToQRCodeCustomizationPage
                                             }: QRCodeDetailsActionsProps) {
    const menuItems: ActionMenuItem[] = [
        {
            menuItemTitle: "Download PNG",
            iconName: undefined,
            onClick: () => downloadQRCode(options, `short-ly_${item.link.short_code}`, "png"),
        },
        {
            menuItemTitle: "Download JPEG",
            iconName: undefined,
            onClick: () => downloadQRCode(options, `short-ly_${item.link.short_code}`, "jpeg"),
        },
        {
            menuItemTitle: "Download SVG",
            iconName: undefined,
            onClick: () => downloadQRCode(options, `short-ly_${item.link.short_code}`, "svg"),
        },
        {
            menuItemTitle: "Download WEBP",
            iconName: undefined,
            onClick: () => downloadQRCode(options, `short-ly_${item.link.short_code}`, "webp"),
        },
    ];

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpened = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box display="flex" gap={2}>
            <Box>
                <Tooltip title="Open the short link">
                    <IconButton color="primary" onClick={goToLinkDetailsPage}>
                        <LinkIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box>
                <Tooltip title="Customize">
                    <IconButton color="primary" onClick={goToQRCodeCustomizationPage}>
                        <ColorLensOutlinedIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box>
                <Tooltip title="Edit content">
                    <IconButton color="primary" onClick={goToQRCodeUpdateContentPage}>
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box>
                <Tooltip title="Download QR Code">
                    <IconButton color="primary" onClick={handleClick}>
                        <FileDownloadOutlinedIcon/>
                    </IconButton>
                </Tooltip>
            </Box>
            <ActionMenu
                open={menuOpened}
                anchorEl={anchorEl}
                handleClose={handleClose}
                actionMenuItems={menuItems}
            />
        </Box>
    )
}