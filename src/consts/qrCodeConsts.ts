export const createQRCodeStepTitles = [
    "Configure code",
    "Customize design",
];

export const dotsPatterns = (): { value: string, name: string }[] => (
    [
        {value: "dots", name: "Dots"},
        {value: "rounded", name: "Rounded"},
        {value: "classy", name: "Classy"},
        {value: "classy-rounded", name: "Classy rounded"},
        {value: "square", name: "Square"},
        {value: "extra-rounded", name: "Extra rounded"},
    ]
);

export const cornerTypes = (): { value: string, name: string }[] => (
    [
        {value: "dot", name: "Dot"},
        {value: "dots", name: "Dots"},
        {value: "rounded", name: "Rounded"},
        {value: "classy", name: "Classy"},
        {value: "classy-rounded", name: "Classy rounded"},
        {value: "square", name: "Square"},
        {value: "extra-rounded", name: "Extra rounded"},
    ]
);

export const qrCodeElementColorTypes = (): { value: string, name: string }[] => (
    [
        {value: "single", name: "Single Color"},
        {value: "gradient", name: "Gradient"},
    ]
);

export const qrCodeColorGradientTypes = (): { value: string, name: string }[] => (
    [
        {value: "linear", name: "Linear"},
        {value: "radial", name: "Radial"},
    ]
);

export const qrCodePresets: Record<string, Record<string, number>> = {
    createQRCode: {width: 240, height: 240},
    updateQRCode: {width: 240, height: 240},
    linkDetails: {width: 160, height: 160},
    linkDetailsPlaceholder: {width: 144, height: 144},
    qrCodeList: {width: 130, height: 130},
    qrCodeDetails: {width: 160, height: 160},
};