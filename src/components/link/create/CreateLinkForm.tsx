import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import {blueGrey} from "@mui/material/colors";
import {CreateLinkStates} from "@app-types/link.ts";
import React from "react";
import Typography from "@mui/material/Typography";
import slug from "slug";
import FormHelperText from "@mui/material/FormHelperText";

slug.defaults.modes['rfc3986'] = {
    replacement: '-',      // replace spaces with replacement
    remove: null,          // (optional) regex to remove characters
    lower: true,           // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap, // replace multiple code unit characters
    trim: false,             // trim leading and trailing replacement chars if true
    fallback: false          // use base64 to generate slug for empty results if true
};

interface CreateLinkFormProps {
    states: CreateLinkStates;
    formErrors: Record<string, string[]> | null;
}

export default function CreateLinkForm({states, formErrors}: CreateLinkFormProps) {
    const {destination, friendlyName, useCustomShortCode, customShortCode} = states;

    const handleChangeUseCustomShortCode = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value === "true";
        useCustomShortCode.setState(value);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
        }}>
            <Box>
                <FormLabel sx={{color: blueGrey[800]}}><b>Destination URL</b></FormLabel>
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
                    placeholder="https://example.com/my-super-long-url/"
                    error={formErrors?.long_url !== undefined}
                    helperText={formErrors?.long_url}
                    color={formErrors?.long_url !== undefined ? 'error' : 'primary'}
                />
            </Box>
            <Box>
                <FormLabel sx={{color: blueGrey[800]}}><b>Title</b></FormLabel>
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
                    placeholder="Link to my social media"
                    error={formErrors?.friendly_name !== undefined}
                    helperText={formErrors?.friendly_name}
                    color={formErrors?.friendly_name !== undefined ? 'error' : 'primary'}
                />
            </Box>
            <Box>
                <Typography variant="h5" sx={{color: blueGrey[800]}}>
                    <b>Short Link</b>
                </Typography>
            </Box>
            <Box>
                <FormControl error={formErrors?.is_short_code_custom !== undefined}>
                    <FormLabel sx={{color: blueGrey[800]}}><b>Use custom short code</b></FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={useCustomShortCode.value}
                        onChange={handleChangeUseCustomShortCode}
                    >
                        <FormControlLabel value={true} control={<Radio/>} label="Yes" sx={{color: blueGrey[800]}}/>
                        <FormControlLabel value={false} control={<Radio/>} label="No" sx={{color: blueGrey[800]}}/>
                    </RadioGroup>
                    <FormHelperText>{formErrors?.is_short_code_custom}</FormHelperText>
                </FormControl>
            </Box>
            {useCustomShortCode.value && (
                <Box>
                    <FormLabel sx={{color: blueGrey[800]}}><b>Short Code</b></FormLabel>
                    <TextField
                        value={customShortCode.value ? customShortCode.value : ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value;
                            console.log(value);

                            if (value.length < 1) {
                                customShortCode.setState(null);
                            } else {
                                // Generate slug while preserving the trailing dash
                                const generatedSlug = slug(value,  { lower: false, replacement: '-', mode: 'rfc3986' });
                                customShortCode.setState(generatedSlug);
                            }
                        }}
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="my-social-media"
                        error={formErrors?.short_code !== undefined}
                        helperText={formErrors?.short_code}
                        color={formErrors?.short_code !== undefined ? 'error' : 'primary'}
                    />
                </Box>
            )}
        </Box>
    );
}