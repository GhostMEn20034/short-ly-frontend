import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import {blueGrey} from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import React from "react";
import FormControl from "@mui/material/FormControl";
import {QRCodeItemWithLink} from "@app-types/qrCode.ts";
import {StateField} from "@app-types/common.ts";
import Typography from "@mui/material/Typography";
import {apiBaseUrl} from "@app-settings";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";


interface UpdateQRCodeContentFormProps {
    item: QRCodeItemWithLink;
    newTitle: StateField<string | null>;
    formErrors: Record<string, string[]> | null;
}


export default function UpdateQRCodeContentForm({item, newTitle, formErrors}: UpdateQRCodeContentFormProps) {
    return (
        <Box>
            <Box sx={{mb: 2}}>
                <Typography sx={{color: blueGrey[800]}} variant="h5">
                    <b>Details</b>
                </Typography>
            </Box>
            <Box sx={{mb: 4}}>
                <FormControl fullWidth>
                    <FormLabel sx={{color: blueGrey[800]}}><b>Title</b></FormLabel>
                    <TextField
                        error={Boolean(formErrors?.title)}
                        helperText={formErrors?.title}
                        value={newTitle.value ? newTitle.value : ""}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const newValue = event.target.value.trim();
                            if (newValue === "") {
                                newTitle.setState(null);
                            } else {
                                newTitle.setState(event.target.value);
                            }
                        }}
                        size="small"
                        type="email"
                        placeholder="QR Code to my social network"
                        required
                        fullWidth
                        variant="outlined"
                        color={formErrors?.email ? 'error' : 'primary'}
                    />
                </FormControl>
            </Box>
            <Box sx={{mb: 4}}>
                <Box sx={{mb: 2}}>
                    <Typography
                        sx={{color: blueGrey[800]}}
                    >
                        <b>Short link</b>
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography sx={{ color: blueGrey[800] }}>
                        {`${apiBaseUrl}/${item.link.short_code}`}
                    </Typography>
                    <Tooltip title="Copy to clipboard">
                        <IconButton
                            onClick={() => navigator.clipboard.writeText(`${apiBaseUrl}/${item.link.short_code}`)}
                            size="small"
                            color="primary"
                        >
                            <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography sx={{color: blueGrey[800]}} variant="h5">
                    <b>Content</b>
                </Typography>
            </Box>
            <Box>
                <Box sx={{mb: 2}}>
                    <Typography
                        sx={{color: blueGrey[800]}}
                    >
                        <b>Destination</b>
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{color: blueGrey[800]}}
                    >
                        {item.link.long_url}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}