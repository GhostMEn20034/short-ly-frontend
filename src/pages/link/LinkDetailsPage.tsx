import axios, {AxiosInstance, isAxiosError} from "axios";
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
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import DeleteLinkDialog from "@app-components/link/delete/DeleteLinkDialog.tsx";


dayjs.extend(LocalizedFormat);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);
dayjs.extend(UTC);


export default function LinkDetailsPage({api}: { api: AxiosInstance }) {
    const deleteLinkDialogName = 'deleteLink';

    const [link, setLink] = React.useState<LinkItem | null>(null);
    const [errorStatusCode, setErrorStatusCode] = useState<number | null>(null);
    const [openedDialog, setOpenedDialog] = React.useState<string | null>(null);
    const [deleteLinkErrorMessage, setDeleteLinkErrorMessage] = React.useState<string | null>(null);

    const {shortCode} = useParams();

    const navigate = useNavigate();

    const getLink = async () => {
        try {
            const response = await api.get(`/api/v1/urls/${shortCode}`);
            const data = await response.data;
            setLink(convertLinkDetailsResponse(data.item));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorStatusCode(error.response!.status);
            }
        }
    };

    const deleteLink = async () => {
        try {
            await api.delete(`/api/v1/urls/${shortCode}`);
            navigate(`/${rootRoutePrefixes.links}/`);
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 404) {
                setDeleteLinkErrorMessage("There's no link with such short code.")
            } else {
                setDeleteLinkErrorMessage("Something went wrong");
            }
        }
    };

    React.useEffect(() => {
        document.title = "Shortly | Links"
    }, []);

    const goToEditPage = () => {
        navigate(`/${rootRoutePrefixes.links}/${shortCode}/edit`);
    };

    React.useEffect(() => {
        getLink();
    }, []);

    return (
        <Box>
            {errorStatusCode && errorStatusCode >= 400 && errorStatusCode < 500 ? (
                <Box sx={{mt: 1}} justifySelf="center">
                    <Typography variant="h5">
                        OOPS, {errorStatusCode === 404 ? "Link didn't found" : "Something Went Wrong"}
                    </Typography>
                    <Link underline="hover" component={RouterLink} to={`/${rootRoutePrefixes.links}/`}>
                        Go Back to list
                    </Link>

                </Box>
            ) : (
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
                    <Box>
                        {link && (
                            <Box>
                                <LinkDetailsCard
                                    item={link}
                                    goToEditPage={goToEditPage}
                                    openDeleteLinkDialog={() => setOpenedDialog(deleteLinkDialogName)}
                                />
                            </Box>
                        )}
                        <Box sx={{mt: 3}}>
                            <QRCodeInfo/>
                        </Box>
                    </Box>
                </Box>
            )}
            <DeleteLinkDialog
                open={openedDialog === deleteLinkDialogName}
                handleClose={() => setOpenedDialog(null)}
                deleteLinkErrorMessage={deleteLinkErrorMessage}
                setDeleteLinkErrorMessage={setDeleteLinkErrorMessage}
                handleSubmit={deleteLink}
            />
        </Box>
    );
}