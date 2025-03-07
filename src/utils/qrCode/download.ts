import QRCodeStyling, {FileExtension, Options} from "qr-code-styling";


export default function downloadQRCode(options: Options, fileName: string, fileExtension: FileExtension) {
    const clonedOptions: Options = structuredClone(options);

    // Set width and height to 600
    clonedOptions.width = 600;
    clonedOptions.height = 600;

    clonedOptions.margin = 5;
    clonedOptions.imageOptions!.imageSize = 0.4;
    clonedOptions.imageOptions!.margin = 20;

    // Create QRCodeStyling instance
    const qrCode = new QRCodeStyling(clonedOptions);

    // Download as SVG
    qrCode.download({
        name: fileName,
        extension: fileExtension
    });
}