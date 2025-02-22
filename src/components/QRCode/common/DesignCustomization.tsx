import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {cornerTypes, dotsPatterns} from "@app-consts/qrCodeConsts.ts";
import {CornerDotType, CornerSquareType, DotType, Options} from "qr-code-styling";
import {StateField} from "@app-types/common.ts";
import Typography from "@mui/material/Typography";
import {blueGrey} from "@mui/material/colors";
import ChangeQRCodeColors from "@app-components/QRCode/common/ChangeQRCodeColors.tsx";


interface DesignCustomizationProps {
    options: StateField<Options>;
}


export default function DesignCustomization({options}: DesignCustomizationProps) {

    // const onDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     options.setState(options => ({
    //         ...options,
    //         data: event.target.value
    //     }));
    // };

    const onLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        options.setState(options => ({
            ...options,
            image: event.target.value
        }));
    };

    const onDotsPatternChange = (event: SelectChangeEvent) => {
        options.setState(options => ({
            ...options,
            dotsOptions: {
                ...options.dotsOptions,
                type: event.target.value as DotType,
            }
        }));
    };

    const onCornerTypeChange = (event: SelectChangeEvent) => {
        options.setState(options => ({
            ...options,
            cornersSquareOptions: {
                ...options.cornersSquareOptions,
                type: event.target.value as CornerSquareType,
            },
            cornersDotOptions: {
                ...options.cornersDotOptions,
                type: event.target.value as CornerDotType,
            }
        }));
    };


    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{color: blueGrey[800]}}>
                    <b>Select a Style</b>
                </Typography>
            </Box>
            <Box sx={{mb: 2}}>
                <FormControl fullWidth>
                    <FormLabel sx={{color: blueGrey[800]}}><b>Logo URL</b></FormLabel>
                    <TextField
                        value={options.value?.image ? options.value?.image : ""}
                        onChange={onLogoChange}
                    />
                </FormControl>
            </Box>
            <Box sx={{mt: 2}}>
                <FormControl fullWidth>
                    <FormLabel sx={{color: blueGrey[800]}}><b>Dots Pattern</b></FormLabel>
                    <Select
                        value={options.value.dotsOptions?.type}
                        onChange={onDotsPatternChange}
                    >
                        {dotsPatterns().map(({value, name}) => (
                            <MenuItem key={value} value={value}>{name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{mt: 2}}>
                <FormControl fullWidth>
                    <FormLabel sx={{color: blueGrey[800]}}><b>Corner Type</b></FormLabel>
                    <Select
                        value={options.value.cornersSquareOptions?.type}
                        onChange={onCornerTypeChange}
                    >
                        {cornerTypes().map(({value, name}) => (
                            <MenuItem key={value} value={value}>{name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{mt: 2}}>
                <Typography variant="h5" sx={{color: blueGrey[800]}}>
                    <b>Choose your colors</b>
                </Typography>
            </Box>
            <ChangeQRCodeColors
                options={options}
            />

        </Box>
    )
}