import * as React from "react";
import {SvgIconProps} from "@mui/material";

export interface ActionMenuItem {
    menuItemTitle: string;
    iconName: React.ElementType<SvgIconProps>;
    onClick: () => void | Promise<void>;
}
