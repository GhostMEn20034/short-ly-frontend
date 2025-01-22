import * as React from "react";
import {SvgIconProps} from "@mui/material";

export interface DrawerItem {
    name: string,
    path: string,
    iconName: React.ElementType<SvgIconProps>,
}