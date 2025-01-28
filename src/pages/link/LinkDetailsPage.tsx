import axios, {AxiosInstance} from "axios";
import {useNavigate, useParams, Link as RouterLink} from "react-router";
import {LinkItem} from "@app-types/link.ts";
import {convertLinkDetailsResponse} from "@app-utils/link/convertResponse.ts";
import LinkDetailsCard from "@app-components/link/details/LinkDetailsCard.tsx";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Timezone from "dayjs/plugin/timezone";
import UTC from "dayjs/plugin/utc";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import Link from "@mui/material/Link";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import {blueGrey} from "@mui/material/colors";
import QRCodeInfo from "@app-components/link/details/QRCodeInfo.tsx";
import React from "react";

dayjs.extend(LocalizedFormat);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);
dayjs.extend(UTC);


export default function LinkDetailsPage({api}: { api: AxiosInstance }) {
    const [link, setLink] = React.useState<LinkItem | null>(null);

    const {shortCode} = useParams();

    const navigate = useNavigate();

    const getLink = async () => {
        try {
            const response = await api.get(`/api/v1/urls/${shortCode}`);
            const data = await response.data;
            setLink(convertLinkDetailsResponse(data.item));
        } catch (error) {
            if (axios.isAxiosError(error)) {

                if (error.response?.status === 404) {
                    console.log("Not found link details");
                }

            }
        }
    };

    React.useEffect(() => {
        document.title ="Shortly | Links"
    }, []);

    const goToEditPage = () => {
        navigate(`/${rootRoutePrefixes.links}/${shortCode}/edit`);
    };

    React.useEffect(() => {
        getLink();
    }, []);

    return (
        <Box>
            <Box sx={{mb: 2, ml: 1}}>
                <Link
                    color="inherit"
                    underline="hover"
                    component={RouterLink}
                    to={`/${rootRoutePrefixes.links}/`}
                    sx={{color: blueGrey[800]}}
                >
                    &lt;&nbsp;<b>Back to list</b>
                </Link>
            </Box>
            {link && (
                <Box>
                    <LinkDetailsCard
                        item={link}
                        goToEditPage={goToEditPage}
                    />
                </Box>
            )}
            <Box sx={{mt: 3}}>
                <QRCodeInfo/>
            </Box>
        </Box>
    );
}