import DrawerHeader from "@app-helper-components/home/SideBar/DrawerHeader.tsx";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Theme} from "@mui/material/styles";
import {DrawerItem} from "@app-types/dashboard.ts";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import QrCode2OutlinedIcon from '@mui/icons-material/QrCode2Outlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Link from "@mui/material/Link";
import {Link as RouterLink} from 'react-router';
import {blueGrey} from "@mui/material/colors";
import MenuWithActions from "@app-components/common/dashboard/MenuWithActions.tsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {greetBasedOnTime} from "@app-utils/time.ts";
import {User} from "@app-types/user.ts";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import routeNames from "@app-consts/routeNames.ts";


const drawerItems: DrawerItem[] = [
    {name: "Home", path: "/home", iconName: HomeOutlinedIcon},
    {name: "Links", path: `/${rootRoutePrefixes.links}`, iconName: InsertLinkOutlinedIcon},
    {name: "QR Codes", path: `/${rootRoutePrefixes.QRCodes}`, iconName: QrCode2OutlinedIcon},
    {name: "Analytics", path: `/${rootRoutePrefixes.analytics}`, iconName: BarChartOutlinedIcon},
];

const additionalDrawerItems: DrawerItem[] = [
    {name: "Settings", path: `/${rootRoutePrefixes.settings}/${routeNames.profile}`, iconName: SettingsOutlinedIcon},
]

interface DrawerContentProps {
    open: boolean,
    theme: Theme,
    handleDrawerClose: () => void,
    pathname: string,
    user: User | null,
}

export default function DrawerContent({open, theme, handleDrawerClose, pathname, user}: DrawerContentProps) {
    return (
        <>
            <DrawerHeader>
                <Box sx={{ mr: "auto" }}>
                    <Typography variant="body1">
                        <b>{greetBasedOnTime()}</b>,
                    </Typography>
                    <Typography variant="body1">
                        <b>{user?.firstName}</b>
                    </Typography>
                </Box>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <Box display="flex" justifyContent="center" alignSelf="center" sx={{ mt: 1, width: "100%" }}>
                <MenuWithActions renderIconButton={!open} />
            </Box>
            <Divider/>
            <List>
                {drawerItems.map(({name, path, iconName: IconComponent}) => (
                    <Link key={name} component={RouterLink} to={path} underline="none" sx={{
                        color: 'inherit', // Keeps text color consistent with the theme
                    }}>
                        <ListItem
                            disablePadding
                            sx={{
                                display: 'block',
                                backgroundColor: pathname.startsWith(path) ? '#f9e8e8;' : 'inherit',
                            }}
                        >
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
                {additionalDrawerItems.map(({name, path, iconName: IconComponent}) => (

                    <Link key={name} component={RouterLink} to={path} underline="none" sx={{
                        color: 'inherit', // Keeps text color consistent with the theme
                    }}>
                        <ListItem
                            disablePadding
                            sx={{
                                display: 'block',
                                backgroundColor: pathname.startsWith(path) ? '#f9e8e8;' : 'inherit',
                            }}
                        >
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
        </>
    );
}