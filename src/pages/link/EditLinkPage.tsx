import {AxiosInstance, isAxiosError} from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EditLinkForm from "@app-components/link/edit/EditLinkForm.tsx";
import React, {useState} from "react";
import {Link as RouterLink, useParams, useNavigate} from "react-router";
import Link from "@mui/material/Link";
import {apiBaseUrl} from "@app-settings";
import EditLinkActions from "@app-components/link/edit/EditLinkActions.tsx";
import {blueGrey} from "@mui/material/colors";
import {EditLinkStates} from "@app-types/link.ts";
import {parseErrors} from "@app-utils/errorParsers.ts";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import {buildTrackingURL} from "@app-utils/qrCode/qrCodeLink.ts";


export default function EditLinkPage({api}: { api: AxiosInstance }) {
    const [friendlyName, setFriendlyName] = React.useState<string | null>(null);
    const [longUrl, setLongUrl] = React.useState<string | null>(null);
    const [errorStatusCode, setErrorStatusCode] = useState<number | null>(null);

    const [formErrors, setFormErrors] = useState<Record<string, string[]> | null>(null);

    const states: EditLinkStates = {
        friendlyName: {value: friendlyName, setState: setFriendlyName},
        destination: {value: longUrl, setState: setLongUrl},
    };

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
                setErrorStatusCode(error.response!.status);
            }
        }
    };

    const updateLink = async () => {
        const requestBody = {
            "friendly_name": friendlyName,
            "long_url": longUrl,
        };

        try {
            await api.put(`/api/v1/urls/${shortCode}`, requestBody);
            navigate(`/${rootRoutePrefixes.links}/`);
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response!.status >= 400 && error.response!.status < 500) {
                    setFormErrors(parseErrors(error.response!.data.detail));
                }
            }
        }
    }

    React.useEffect(() => {
        document.title = "Shortly | Links";
    }, []);

    React.useEffect(() => {
        getLink();
    }, []);

    return (
        <Box sx={{width: "75%", justifySelf: "center"}}>
            <Box>
                <Typography variant="h4" sx={{color: blueGrey[800]}}>
                    <b>Edit link</b>
                </Typography>
            </Box>
            {errorStatusCode && errorStatusCode >= 400 && errorStatusCode < 500 ? (
                <Box sx={{ mt: 1 }}>
                    <Typography variant="h5">
                        OOPS, {errorStatusCode === 404 ? "Link didn't found" : "Something Went Wrong"}
                    </Typography>
                    <Link underline="hover" component={RouterLink} to={`/${rootRoutePrefixes.links}/`}>
                        Go Back to list
                    </Link>

                </Box>
            ) : (
                <Box>
                    <Box sx={{mb: 2, mt: 1}}>
                        <Typography variant="body1" sx={{color: blueGrey[800]}}>
                            <b>Short Link</b>
                        </Typography>
                        <Link underline="hover" target="_blank" component={RouterLink}
                              to={buildTrackingURL(shortCode!)}>
                            <b>{`${apiBaseUrl}/${shortCode}`}</b>
                        </Link>
                    </Box>
                    <Box>
                        <EditLinkForm
                            states={states}
                            formErrors={formErrors}
                        />
                    </Box>
                    <Box sx={{mt: 5}}>
                        <EditLinkActions
                            goBack={goBack}
                            handleSubmit={updateLink}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    )
        ;
}