import {
    MuiColorInput,
    type MuiColorInputFormat
} from 'mui-color-input'

import Box from "@mui/material/Box";
import {StateField} from "@app-types/common.ts";
import {Options} from "qr-code-styling";
import {QRPart} from "@app-types/qrCode.ts";


interface QRCodeSingleColorSelectorProps {
    options: StateField<Options>;
    qrPart: QRPart;
}


export default function QRCodeSingleColorSelector({options, qrPart}: QRCodeSingleColorSelectorProps) {
    const qrPartKey: "dotsOptions" | "backgroundOptions" =
        qrPart === "background" ? "backgroundOptions" : "dotsOptions";

    const handleChange = (newValue: string) => {
        options.setState((prevState) => ({
            ...prevState,
            [qrPartKey]: {
                ...prevState[qrPartKey],
                color: newValue,
            },
            ...(qrPart === "code" && {
                cornersSquareOptions: {
                    ...prevState.cornersSquareOptions,
                    color: newValue,
                },
                cornersDotOptions: {
                    ...prevState.cornersDotOptions,
                    color: newValue,
                },
            }),
        }));
    };

    const format: MuiColorInputFormat = 'hex';

    return (
        <Box>
            <MuiColorInput
                value={options.value[qrPartKey]?.color || "#ffffff"}
                onChange={handleChange}
                size="small"
                format={format}
                isAlphaHidden
            />
        </Box>
    );
}