import Box from "@mui/material/Box";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import EditIcon from "@mui/icons-material/Edit";
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ActionMenu from "@app-components/common/menu/ActionMenu.tsx";
import React from "react";
import {ActionMenuItem} from "@app-types/menu.ts";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import QrCodeOutlinedIcon from "@mui/icons-material/QrCodeOutlined";
import {Options} from "qr-code-styling";
import {QRCodeItemWithLink} from "@app-types/qrCode.ts";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import downloadQRCode from "@app-utils/qrCode/download.ts";


interface QRCodeListItemActionsProps {
    options: Options;
    item: QRCodeItemWithLink;
    goToCustomizationPage: () => void;
    goToEditQRCodeContentPage: () => void;
    goToLinkDetailsPage: () => void;
    goToQRCodeDetailsPage: () => void;
}

export default function QRCodeListItemActions({
                                                  options,
                                                  item,
                                                  goToEditQRCodeContentPage,
                                                  goToCustomizationPage,
                                                  goToLinkDetailsPage,
                                                  goToQRCodeDetailsPage,
                                              }: QRCodeListItemActionsProps) {
    const menuItems: ActionMenuItem[] = [
        {
            menuItemTitle: "View QR Code Details",
            iconName: QrCodeOutlinedIcon,
            onClick: goToQRCodeDetailsPage,
        },
        {
            menuItemTitle: "View Short link",
            iconName: InsertLinkOutlinedIcon,
            onClick: goToLinkDetailsPage
        },
        {
            menuItemTitle: "Download PNG",
            iconName: FileDownloadOutlinedIcon,
            onClick: () => downloadQRCode(options, `short-ly_${item.link.short_code}`, "png"),
        },
        {
            menuItemTitle: "Download JPEG",
            iconName: FileDownloadOutlinedIcon,
            onClick: () => downloadQRCode(options, `short-ly_${item.link.short_code}`, "jpeg"),
        },
        {
            menuItemTitle: "Download SVG",
            iconName: FileDownloadOutlinedIcon,
            onClick: () => downloadQRCode(options, `short-ly_${item.link.short_code}`, "svg"),
        },
        {
            menuItemTitle: "Download WEBP",
            iconName: FileDownloadOutlinedIcon,
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
        <Box display="flex" gap={0.5} justifyContent="flex-end">
            <Box>
                <DefaultButton
                    onClick={goToCustomizationPage}
                    startIcon={<ColorLensOutlinedIcon/>}
                    variant="outlined"
                    color="secondary"
                    size="small"
                >
                    Customize
                </DefaultButton>
            </Box>
            <Box>
                <DefaultButton
                    onClick={goToEditQRCodeContentPage}
                    startIcon={<EditIcon/>}
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
                dividerAfterIndexes={[1, ]}
            />
        </Box>
    )
}