import {AxiosInstance, isAxiosError} from "axios";
import Box from "@mui/material/Box";
import CreateLinkForm from "@app-components/link/create/CreateLinkForm.tsx";
import Typography from "@mui/material/Typography";
import {blueGrey} from "@mui/material/colors";
import {useNavigate} from "react-router";
import CreateLinkActions from "@app-components/link/create/CreateLinkActions.tsx";
import React, {useState} from "react";
import {CreateLinkStates} from "@app-types/link.ts";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import {parseErrors} from "@app-utils/errorParsers.ts";


export default function CreateLinkPage({api}: { api: AxiosInstance }) {
    const [createLinkLoading, setCreateLinkLoading] = React.useState<boolean>(false);

    const [friendlyName, setFriendlyName] = React.useState<string | null>(null); // Or you can call it Link's title
    const [destination, setDestination] = React.useState<string | null>(null); // Long URL
    const [useCustomShortCode, setUseCustomShortCode] = React.useState<boolean>(false);
    const [customShortCode, setCustomShortCode] = React.useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<Record<string, string[]> | null>(null);


    const navigate = useNavigate();

    const states: CreateLinkStates = {
        friendlyName: {value: friendlyName, setState: setFriendlyName},
        destination: {value: destination, setState: setDestination},
        useCustomShortCode: {value: useCustomShortCode, setState: setUseCustomShortCode},
        customShortCode: {value: customShortCode, setState: setCustomShortCode},
    };

    const createLink = async () => {
        setCreateLinkLoading(true);
        const requestBody = {
            "friendly_name": friendlyName,
            "is_short_code_custom": useCustomShortCode,
            "short_code": customShortCode,
            "long_url": destination,
        };

        try {
            await api.post(`/api/v1/urls/`, requestBody);
            navigate(`/${rootRoutePrefixes.links}/`);
        } catch (error) {
            if (isAxiosError(error)) {
                setFormErrors(parseErrors(error.response!.data.detail));
            }
        }
        setCreateLinkLoading(false);
    };

    const goBack = () => {
        navigate(-1);
    };

    React.useEffect(() => {
        document.title = "Shortly | Links";
    }, []);

    return (
        <Box>
            <Box width="75%" justifySelf="center">
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h4" sx={{ color: blueGrey[800] }}>
                        <b>Create a link</b>
                    </Typography>
                </Box>
                <Box sx={{backgroundColor: 'white', borderRadius: "10px", padding: 4,}}>
                    <CreateLinkForm
                        states={states}
                        formErrors={formErrors}
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <CreateLinkActions
                        goBack={goBack}
                        handleSubmit={createLink}
                        handleSubmitLoading={createLinkLoading}
                    />
                </Box>
            </Box>
        </Box>
    );
}