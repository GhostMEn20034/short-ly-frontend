import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import React from "react";
import {blueGrey} from "@mui/material/colors";


interface EditMandatoryFieldsProps {
    longUrl: string | null;
    setLongUrl: React.Dispatch<React.SetStateAction<string | null>>,
    friendlyName: string | null;
    setFriendlyName: React.Dispatch<React.SetStateAction<string | null>>,

}


export default function EditLinkForm({longUrl, friendlyName}: EditMandatoryFieldsProps) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
        }}>
            <Box>
                <FormLabel sx={{ color: blueGrey[800] }}><b>Title</b></FormLabel>
                <TextField
                    value={friendlyName ? friendlyName : ""}
                    fullWidth
                    size="small"
                    variant="outlined"
                    // error={formErrors?.email !== undefined}
                    // helperText={formErrors?.email}
                    // color={formErrors?.email !== undefined ? 'error' : 'primary'}
                />
            </Box>
            <Box>
                <FormLabel sx={{ color: blueGrey[800] }}><b>Destination URL</b></FormLabel>
                <TextField
                    value={longUrl ? longUrl : ""}
                    fullWidth
                    size="small"
                    variant="outlined"
                    // error={formErrors?.email !== undefined}
                    // helperText={formErrors?.email}
                    // color={formErrors?.email !== undefined ? 'error' : 'primary'}
                />
            </Box>
        </Box>
    );
}