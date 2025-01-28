import {AxiosInstance, isAxiosError} from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditLinkForm from "@app-components/link/edit/EditLinkForm.tsx";
import React from "react";
import {Link as RouterLink, useParams, useNavigate} from "react-router";
import Link from "@mui/material/Link";
import {apiBaseUrl} from "@app-settings";
import EditLinkActions from "@app-components/link/edit/EditLinkActions.tsx";
import {blueGrey} from "@mui/material/colors";

export default function EditLinkPage({api}: { api: AxiosInstance }) {
    const [friendlyName, setFriendlyName] = React.useState<string | null>(null);
    const [longUrl, setLongUrl] = React.useState<string | null>(null);

    const {shortCode} = useParams();

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const getLink = async () => {
        try {
            const response = await api.get(`/api/v1/urls/${shortCode}`);
            const data = await response.data;

            setFriendlyName(data.item.friendly_name);
            setLongUrl(data.item.long_url);
        } catch (error) {
            if (isAxiosError(error)) {
                console.error(error);
            }
        }
    };

    React.useEffect(() => {
        document.title ="Shortly | Links"
    }, []);

    React.useEffect(() => {
        getLink();
    }, []);

    return (
        <Box sx={{width: "75%", justifySelf: "center"}}>
            <Box>
                <Typography variant="h4" sx={{ color: blueGrey[800] }}>
                    <b>Edit link</b>
                </Typography>
            </Box>
            <Box sx={{mb: 2, mt: 1}}>
                <Typography variant="body1" sx={{ color: blueGrey[800] }}>
                    <b>Short Link</b>
                </Typography>
                <Link underline="hover" target="_blank" component={RouterLink} to={`${apiBaseUrl}/${shortCode}`}>
                    <b>{`${apiBaseUrl}/${shortCode}`}</b>
                </Link>
            </Box>
            <Box>
                <EditLinkForm
                    longUrl={longUrl}
                    setLongUrl={setLongUrl}
                    friendlyName={friendlyName}
                    setFriendlyName={setFriendlyName}
                />
            </Box>
            <Box sx={{mt: 5}}>
                <EditLinkActions
                    goBack={goBack}
                />
            </Box>
        </Box>
    );
}