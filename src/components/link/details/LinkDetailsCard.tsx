import Box from "@mui/material/Box";
import {LinkItem} from "@app-types/link.ts";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router";
import Typography from "@mui/material/Typography";
import {blueGrey} from "@mui/material/colors";
import {apiBaseUrl} from "@app-settings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LinkDetailsActions from "@app-components/link/details/LinkActions.tsx";

interface LinkDetailsCardProps {
    item: LinkItem;
    goToEditPage: () => void;
}

export default function LinkDetailsCard({item, goToEditPage}: LinkDetailsCardProps) {
    return (
        <Box sx={{padding: 3, backgroundColor: "white", borderRadius: "8px"}}>
            <Grid container spacing={1}>
                <Grid size={{xs: 12, md: 9}}>
                    <Box sx={{width: "fit-content"}}>
                        <Typography
                            variant="h4"
                            noWrap
                            sx={{
                                color: blueGrey[800],
                            }}
                        >
                            <b>{item.friendlyName}</b>
                        </Typography>
                    </Box>
                    <Box sx={{mb: 0.5}}>
                        <Link
                            underline="hover"
                            component={RouterLink}
                            target={"_blank"}
                            to={`${apiBaseUrl}/${item.shortCode}`}
                        >
                            <b>{`${apiBaseUrl}/${item.shortCode}`}</b>
                        </Link>
                    </Box>
                    <Box sx={{mb: 2.5}}>
                        <Link
                            underline="hover"
                            color="inherit"
                            target="_blank"
                            component={RouterLink}
                            to={`${item.longUrl}`}
                            sx={{ color: blueGrey[800] }}
                        >
                            {item.longUrl}
                        </Link>
                    </Box>
                    <Box display="flex">
                        <Box sx={{display: "flex", alignItems: "center", color: blueGrey[800] }} gap={0.5}>
                            <CalendarTodayIcon fontSize="small" />
                            <Typography variant="body2">
                                {item.createdAt.format('dddd, MMMM D, YYYY HH:mm z')}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{xs: 12, md: 3}}>
                    <LinkDetailsActions
                        shortLink={`${apiBaseUrl}/${item.shortCode}`}
                        goToEditPage={goToEditPage}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}