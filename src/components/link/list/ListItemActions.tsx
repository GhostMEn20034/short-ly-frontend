import Box from "@mui/material/Box";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import React from "react";
import ListItemMenu from "@app-components/link/list/ListItemMenu.tsx";

interface ListItemActionsProps {
    shortLink: string;
}

export default function ListItemActions({ shortLink }: ListItemActionsProps) {
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
                    variant="contained"
                    color="secondary"
                    size="small"
                >
                    {shortLinkCopied ? "Copied" : "Copy"}
                </DefaultButton>
            </Box>
            <Box>
                <DefaultButton
                    startIcon={<EditIcon />}
                    variant="contained"
                    color="secondary"
                    size="small"
                >
                    Edit
                </DefaultButton>
            </Box>
            <Box>
                <DefaultButton
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={handleClick}
                >
                    <b>...</b>
                </DefaultButton>
            </Box>
            <ListItemMenu
                open={menuOpened}
                anchorEl={anchorEl}
                handleClose={handleClose}
            />
        </Box>
    );
}