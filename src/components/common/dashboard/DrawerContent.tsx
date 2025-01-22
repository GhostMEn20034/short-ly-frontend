import DrawerHeader from "@app-helper-components/home/SideBar/DrawerHeader.tsx";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import {Theme} from "@mui/material/styles";
import {DrawerItem} from "@app-types/dashboard.ts";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import Link from "@mui/material/Link";
import {Link as RouterLink} from 'react-router';
import {blueGrey} from "@mui/material/colors";


const drawerItems: DrawerItem[] = [
    {name: "Home", path: "/home", iconName: HomeOutlinedIcon},
    {name: "Links", path: "/links", iconName: InsertLinkOutlinedIcon},
    {name: "QR Codes", path: "/qrcodes", iconName: QrCode2OutlinedIcon},
    {name: "Analytics", path: "/analytics", iconName: BarChartOutlinedIcon},
];

interface DrawerContentProps {
    open: boolean,
    theme: Theme;
    handleDrawerClose: () => void;
}

export default function DrawerContent({open, theme, handleDrawerClose}: DrawerContentProps) {
    return (
        <>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                {drawerItems.map(({name, path, iconName: IconComponent}) => (

                    <Link key={name} component={RouterLink} to={path} underline="none" sx={{
                        color: 'inherit', // Keeps text color consistent with the theme
                    }}>
                        <ListItem disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    open
                                        ? {
                                            justifyContent: 'initial',
                                        }
                                        : {
                                            justifyContent: 'center',
                                        },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: 'center',
                                        },
                                        open
                                            ? {
                                                mr: 3,
                                            }
                                            : {
                                                mr: 'auto',
                                            },
                                    ]}
                                >
                                    <IconComponent sx={{ color: blueGrey[800]}} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={name}
                                    slotProps={{
                                        primary: {
                                            fontWeight: 550,
                                            color: blueGrey[800],
                                        }
                                }}
                                    sx={[
                                        open
                                            ? {
                                                opacity: 1,
                                            }
                                            : {
                                                opacity: 0,
                                            },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
}