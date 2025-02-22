import {ChangeEvent} from 'react'
import {
    MuiColorInput,
    type MuiColorInputFormat
} from 'mui-color-input'

import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import {blueGrey} from "@mui/material/colors";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {qrCodeColorGradientTypes} from "@app-consts/qrCodeConsts.ts";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {NumericFormat} from "react-number-format";
import TextField from "@mui/material/TextField";
import {StateField} from "@app-types/common.ts";
import {Gradient, GradientType, Options} from "qr-code-styling";
import {QRPart} from "@app-types/qrCode.ts";


interface QRCodeGradientColorSelectorProps {
    options: StateField<Options>;
    qrPart: QRPart;
}


export default function QRCodeGradientColorSelector({options, qrPart}: QRCodeGradientColorSelectorProps) {
    const qrPartKey: "dotsOptions" | "backgroundOptions" =
        qrPart === "background" ? "backgroundOptions" : "dotsOptions";

    const handleChangeGradientType = (e: SelectChangeEvent<GradientType>) => {
        options.setState((prevState: Options) => ({
            ...prevState,
            [qrPartKey]: {
                ...prevState[qrPartKey],
                gradient: {
                    ...prevState[qrPartKey]?.gradient,
                    type: e.target.value,
                }
            },
            ...(qrPart === "code" && {
                cornersSquareOptions: {
                    ...prevState.cornersSquareOptions,
                    gradient: {
                        ...prevState.cornersSquareOptions?.gradient,
                        type: e.target.value,
                    } as Gradient,
                },
                cornersDotOptions: {
                    ...prevState.cornersDotOptions,
                    gradient: {
                        ...prevState.cornersDotOptions?.gradient,
                        type: e.target.value,
                    } as Gradient
                },
            }),
        }));
    };

    const handleChangeGradientRotation = (e: ChangeEvent<HTMLInputElement>) => {
        options.setState((prevState: Options) => ({
            ...prevState,
            [qrPartKey]: {
                ...prevState[qrPartKey],
                gradient: {
                    ...prevState[qrPartKey]?.gradient,
                    rotation: Number(e.target.value),
                }
            },
            ...(qrPart === "code" && {
                cornersSquareOptions: {
                    ...prevState.cornersSquareOptions,
                    gradient: {
                        ...prevState.cornersSquareOptions?.gradient,
                        rotation: Number(e.target.value),
                    } as Gradient,
                },
                cornersDotOptions: {
                    ...prevState.cornersDotOptions,
                    gradient: {
                        ...prevState.cornersDotOptions?.gradient,
                        rotation: Number(e.target.value),
                    } as Gradient
                },
            }),
        }));
    };

    const handleChangeGradientColor = (index: number, newValue: string) => {
        options.setState((prevState: Options) => ({
            ...prevState,
            [qrPartKey]: {
                ...prevState[qrPartKey],
                gradient: {
                    ...prevState[qrPartKey]?.gradient,
                    colorStops: prevState[qrPartKey]?.gradient?.colorStops
                        ? prevState[qrPartKey].gradient.colorStops.map((stop, i) =>
                            i === index ? { ...stop, color: newValue } : stop
                        )
                        : [{ offset: 0, color: newValue }, { offset: 1, color: newValue }],
                },
            },
            ...(qrPart === "code" && {
                cornersSquareOptions: {
                    ...prevState.cornersSquareOptions,
                    gradient: {
                        ...prevState.cornersSquareOptions?.gradient,
                        colorStops: prevState.cornersSquareOptions?.gradient?.colorStops
                            ? prevState.cornersSquareOptions.gradient.colorStops.map((stop, i) =>
                                i === index ? { ...stop, color: newValue } : stop
                            )
                            : [{ offset: 0, color: newValue }, { offset: 1, color: newValue }],
                    } as Gradient,
                },
                cornersDotOptions: {
                    ...prevState.cornersDotOptions,
                    gradient: {
                        ...prevState.cornersDotOptions?.gradient,
                        colorStops: prevState.cornersDotOptions?.gradient?.colorStops
                            ? prevState.cornersDotOptions.gradient.colorStops.map((stop, i) =>
                                i === index ? { ...stop, color: newValue } : stop
                            )
                            : [{ offset: 0, color: newValue }, { offset: 1, color: newValue }],
                    } as Gradient,
                },
            }),
        }));
    };

    const format: MuiColorInputFormat = 'hex'

    return (
        <Box display="flex" flexDirection="column" gap={1.5}>
            <FormControl>
                <FormLabel sx={{color: blueGrey[800]}}><b>Gradient Type</b></FormLabel>
                <Select
                    size="small"
                    value={options.value[qrPartKey]?.gradient?.type}
                    onChange={handleChangeGradientType}
                >
                    {qrCodeColorGradientTypes().map(({value, name}) => (
                        <MenuItem key={value} value={value}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <NumericFormat
                value={options.value[qrPartKey]?.gradient?.rotation}
                allowNegative={false}
                min={0}
                max={360}
                customInput={TextField}
                onChange={handleChangeGradientRotation}
                size="small"
                label="Gradient Rotation"
            />
            <FormLabel sx={{color: blueGrey[800]}}><b>Gradient Color</b></FormLabel>
            <MuiColorInput
                value={options.value[qrPartKey]?.gradient?.colorStops?.[0]?.color || "#ffffff"}
                onChange={(newValue) => handleChangeGradientColor(0, newValue)}
                size="small"
                format={format}
                isAlphaHidden
            />
            <MuiColorInput
                value={options.value[qrPartKey]?.gradient?.colorStops?.[1]?.color || "#ffffff"}
                onChange={(newValue) => handleChangeGradientColor(1, newValue)}
                size="small"
                format={format}
                isAlphaHidden
            />
        </Box>
    );
}