import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router";
import routeNames from "@app-consts/routeNames.ts";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import {blueGrey} from "@mui/material/colors";


interface AppBarContentProps {
    open: boolean,
    handleDrawerOpen: () => void,
}


export default function AppBarContent({open, handleDrawerOpen}: AppBarContentProps) {
    return (
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                    {
                        marginRight: 5,
                    },
                    open && {display: 'none'},
                ]}
            >
                <MenuIcon/>
            </IconButton>
            <Link component={RouterLink} to={`/${routeNames.home}`} display="flex" alignItems="center">
                <Box
                    component="img"
                    src="/shortly-logo.png"

                    maxHeight={50}
                    maxWidth={110}
                />
            </Link>
            <Box sx={{display: {md: 'flex'}, marginLeft: 'auto'}}>
                <IconButton sx={{p: 0}} size='small'>
                    <Avatar
                        alt={`Hello World`}
                        src="/static/images/avatar/2.jpg"
                        sx={{backgroundColor: blueGrey[800]}}
                    />
                </IconButton>
            </Box>
        </Toolbar>
    );
}