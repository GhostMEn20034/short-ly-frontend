import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Paper} from "@mui/material";
import DefaultOutlinedButton from "@app-components/common/buttons/DefaultOutlinedButton.tsx";
import {HomePageShortcut} from "@app-types/dashboard.ts";
import {Link as RouterLink} from "react-router";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import {blueGrey} from "@mui/material/colors";

const shortcuts: HomePageShortcut[] = [
    {text: "Make it short", buttonText: "Go to links", path: `/${rootRoutePrefixes.links}`},
    {text: "Make it scannable", buttonText: "Go to QR Codes", path: `/${rootRoutePrefixes.QRCodes}`},
    {text: "Analyze it", buttonText: "Go to Analytics", path: `/${rootRoutePrefixes.analytics}`},
];

export default function Home() {
    return (
        <Box>
            <Typography variant="h4" sx={{ color: blueGrey[800]}}>
                <b>Your Linking Platform</b>
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Paper sx={{display: "flex", justifyContent: "space-around", alignContent:"space-around", padding: 2, flexWrap: "wrap"}}>
                    {shortcuts.map(({text, buttonText, path}) => (
                        <Box
                            key={text}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                padding: 2,
                                border: "0.5px solid grey",
                                borderRadius: "10px",
                                minWidth: "250px",
                                mt: 2,
                            }}
                        >
                            <Typography variant="h6" textAlign="center" sx={{ color: blueGrey[800]}}>
                                <b>{text}</b>
                            </Typography>
                            <DefaultOutlinedButton
                                variant="contained"
                                size="small"
                                component={RouterLink}
                                to={`${path}`}
                            >
                                {buttonText}
                            </DefaultOutlinedButton>
                        </Box>
                    ))}
                </Paper>
            </Box>
        </Box>
    );
}