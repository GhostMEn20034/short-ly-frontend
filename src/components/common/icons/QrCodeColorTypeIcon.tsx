import InvertColorsIcon from '@mui/icons-material/InvertColors';
import GradientIcon from '@mui/icons-material/Gradient';
import { ColorType } from "@app-types/qrCode.ts";
import { SvgIconComponent } from '@mui/icons-material';

const iconMap: Record<ColorType, SvgIconComponent> = {
    single: InvertColorsIcon,
    gradient: GradientIcon,
};

interface QrCodeColorTypeIconProps {
    colorType: ColorType;
}

export default function QrCodeColorTypeIcon({ colorType }: QrCodeColorTypeIconProps) {
    const Icon = iconMap[colorType];
    return Icon ? <Icon /> : null;
}