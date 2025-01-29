import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import {blueGrey} from "@mui/material/colors";
import {EditLinkStates} from "@app-types/link.ts";
import React from "react";


interface EditMandatoryFieldsProps {
    states: EditLinkStates;
    formErrors: Record<string, string[]> | null;
}


export default function EditLinkForm({states, formErrors}: EditMandatoryFieldsProps) {
    const { friendlyName, destination } = states;
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
                    value={friendlyName.value ? friendlyName.value : ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (value.length < 1) {
                            friendlyName.setState(null);
                        } else {
                            friendlyName.setState(value);
                        }
                    }}
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={formErrors?.friendly_name !== undefined}
                    helperText={formErrors?.friendly_name}
                    color={formErrors?.friendly_name !== undefined ? 'error' : 'primary'}
                />
            </Box>
            <Box>
                <FormLabel sx={{ color: blueGrey[800] }}><b>Destination URL</b></FormLabel>
                <TextField
                    value={destination.value ? destination.value : ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        if (value.length < 1) {
                            destination.setState(null);
                        } else {
                            destination.setState(value);
                        }
                    }}
                    fullWidth
                    size="small"
                    variant="outlined"
                    error={formErrors?.long_url !== undefined}
                    helperText={formErrors?.long_url}
                    color={formErrors?.long_url !== undefined ? 'error' : 'primary'}
                />
            </Box>
        </Box>
    );
}