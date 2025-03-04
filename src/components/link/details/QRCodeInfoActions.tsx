import Box from "@mui/material/Box";
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import React from "react";
import ActionMenu from "@app-components/common/menu/ActionMenu.tsx";
import {ActionMenuItem} from "@app-types/menu.ts";
import {QRCodeItem} from "@app-types/qrCode.ts";


interface QRCodeInfoActionsProps {
    qrCode: QRCodeItem | null;
    goToQRCodeCreationPage: () => void;
}


export default function QRCodeInfoActions({qrCode, goToQRCodeCreationPage}: QRCodeInfoActionsProps) {
    const menuItems: ActionMenuItem[] = [
        {
            menuItemTitle: "Customize", iconName: ColorLensOutlinedIcon, onClick: () => {
            }
        },
        {
            menuItemTitle: "Download PNG", iconName: FileDownloadOutlinedIcon, onClick: () => {
            }
        },
        {
            menuItemTitle: "Download JPEG", iconName: FileDownloadOutlinedIcon, onClick: () => {
            }
        },
        {
            menuItemTitle: "Download WEBP", iconName: FileDownloadOutlinedIcon, onClick: () => {
            }
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
        <>
            {qrCode ? (
                <Box display="flex" gap={0.5}>
                    <Box>
                        <DefaultButton
                            startIcon={<BarChartOutlinedIcon/>}
                            variant="outlined"
                            color="secondary"
                        >
                            View Details
                        </DefaultButton>
                    </Box>
                    <Box>
                        <DefaultButton
                            variant="outlined"
                            color="secondary"
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
            ) : (
                <Box>
                    <DefaultButton
                        startIcon={<BarChartOutlinedIcon/>}
                        variant="outlined"
                        color="secondary"
                        onClick={goToQRCodeCreationPage}
                    >
                        Create QR Code
                    </DefaultButton>
                </Box>
            )}
        </>
    );
}