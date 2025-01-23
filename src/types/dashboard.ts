import * as React from "react";
import {SvgIconProps} from "@mui/material";

export interface DrawerItem {
    name: string,
    path: string,
    iconName: React.ElementType<SvgIconProps>,
}

export interface ActionMenuItem {
    name: string,
    path: string,
    iconName: React.ElementType<SvgIconProps>,
}

export interface HomePageShortcut {
    text: string,
    buttonText: string,
    path: string,
}
