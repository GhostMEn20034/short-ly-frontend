import Grid from "@mui/material/Grid2";
import {LinkItem} from "@app-types/link.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {apiBaseUrl} from "@app-settings";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router";
import ListItemActions from "@app-components/link/list/ListItemActions.tsx";
import {blueGrey} from "@mui/material/colors";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";


interface LinkListItemProps {
    item: LinkItem;
    goToEditPage: () => void;
    goToDetailsPage: () => void;
    openDeleteLinkDialog: (item: LinkItem) => void;
}

export default function LinkListItem({item, goToEditPage, goToDetailsPage, openDeleteLinkDialog}: LinkListItemProps) {

    return (
        <Box sx={{padding: 2, backgroundColor: "white", borderRadius: "8px"}}>
            <Grid container spacing={1}>
                <Grid size={{xs: 12, md: 9}}>
                    <Box sx={{ width: "fit-content" }}>
                        <Link
                            component={RouterLink}
                            color="inherit"
                            underline="hover"
                            to={`/${rootRoutePrefixes.links}/${item.shortCode}/details`}
                        >
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    color: blueGrey[800],
                                }}
                            >
                                <b>{item.friendlyName}</b>
                            </Typography>
                        </Link>
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
                        >
                            {item.longUrl}
                        </Link>
                    </Box>
                    <Box display="flex" gap={2} sx={{ color: blueGrey[800] }}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <BarChartOutlinedIcon fontSize="small"/>
                            <Typography variant="body2">
                                Click Data
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center"}} gap={0.5}>
                            <CalendarTodayIcon fontSize="small"/>
                            <Typography variant="body2">
                                {item.createdAt.format('ll')}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{xs: 12, md: 3}}>
                    <ListItemActions
                        shortLink={`${apiBaseUrl}/${item.shortCode}`}
                        goToEditPage={goToEditPage}
                        goToDetailsPage={goToDetailsPage}
                        openDeleteLinkDialog={() => openDeleteLinkDialog(item)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}