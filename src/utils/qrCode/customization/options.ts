import {
    CornerDotType,
    CornerSquareType,
    DotType,
    DrawType,
    ErrorCorrectionLevel,
    Mode,
    TypeNumber,
    Options,
} from "qr-code-styling";

export function getDefaultQrCodeOptions(dataToOverride: Options = {}): Options {
    return {
        width: 240,
        height: 240,
        image: undefined,
        type: 'svg' as DrawType,
        data: window.location.host,
        margin: 10,
        qrOptions: {
            typeNumber: 0 as TypeNumber,
            mode: 'Byte' as Mode,
            errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
        },
        imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 10,
            crossOrigin: 'anonymous',
        },
        dotsOptions: {
            color: '#222222',
            gradient: undefined,
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 0,
            //   colorStops: [{ offset: 0, color: '#1218ad' }, { offset: 1, color: '#77779C' }]
            // },
            type: 'rounded' as DotType,
        },
        backgroundOptions: {
            color: '#ffffff',
            gradient: undefined,
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 0,
            //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
            // },
        },
        cornersSquareOptions: {
            color: '#222222',
            type: 'extra-rounded' as CornerSquareType,
            gradient: undefined,
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 180,
            //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
            // },
        },
        cornersDotOptions: {
            color: '#222222',
            type: 'dot' as CornerDotType,
            gradient: undefined,
            // gradient: {
            //   type: 'linear', // 'radial'
            //   rotation: 180,
            //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
            // },
        },
        ...dataToOverride,
    };
}

export function getQrCodeOptionsForStorage(options: Options): Options {
    /* Extracts and returns qr code options that need to be stored on the backend side */
    return {
        dotsOptions: options.dotsOptions,
        backgroundOptions: options.backgroundOptions,
        cornersSquareOptions: options.cornersSquareOptions,
        cornersDotOptions: options.cornersDotOptions,
    };
}