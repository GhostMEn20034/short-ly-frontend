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
import {QRCodeItem} from "@app-types/qrCode.ts";
import QRCodeStyling, {Options} from "qr-code-styling";
import {getDefaultQrCodeOptions} from "@app-utils/qrCode/customization/options.ts";
import {qrCodePresets} from "@app-consts/qrCodeConsts.ts";
import {buildTrackingURL} from "@app-utils/qrCode/qrCodeLink.ts";


dayjs.extend(LocalizedFormat);
dayjs.extend(Timezone);
dayjs.extend(AdvancedFormat);
dayjs.extend(UTC);


export default function LinkDetailsPage({api}: { api: AxiosInstance }) {
    const deleteLinkDialogName = 'deleteLink';

    const [link, setLink] = React.useState<LinkItem | null>(null);
    const [qrCode, setQRCode] = useState<QRCodeItem | null>(null);
    const [options, setOptions] = React.useState<Options>(getDefaultQrCodeOptions());
    const [qrCodeObject] = React.useState<QRCodeStyling>(new QRCodeStyling(options));
    const qrCodeRef = React.useRef<HTMLDivElement>(null);
    const [errorStatusCode, setErrorStatusCode] = useState<number | null>(null);
    const [openedDialog, setOpenedDialog] = React.useState<string | null>(null);
    const [deleteLinkErrorMessage, setDeleteLinkErrorMessage] = React.useState<string | null>(null);

    const {shortCode} = useParams();

    const navigate = useNavigate();

    const getLink = async () => {
        try {
            const response = await api.get(`/api/v1/urls/${shortCode}`);
            const data = await response.data;
            const receivedQRCode = data.qrCode;
            setLink(convertLinkDetailsResponse(data.item, receivedQRCode));
            setQRCode(receivedQRCode);
            if (receivedQRCode) {
                setOptions((prevOptions: Options) => ({
                    ...prevOptions,
                    margin: 1,
                    imageOptions: {
                        ...prevOptions.imageOptions,
                        margin: 4,
                    },
                    width: qrCodePresets.linkDetails.width,
                    height: qrCodePresets.linkDetails.height,
                    data: buildTrackingURL(data.item.short_code, "qr"),
                    image: receivedQRCode.image || undefined,
                    ...receivedQRCode.customization,
                }));
            }
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

    const goToQRCodeCreationPage = () => {
        navigate(`/${rootRoutePrefixes.QRCodes}/create/${shortCode}`);
    };

    const goToQRCodeCustomizationPage = () => {
        navigate(`/${rootRoutePrefixes.QRCodes}/${qrCode?.id}/edit/customize`);
    };

    const goToQRCodeDetailsPage = () => {
        navigate(`/${rootRoutePrefixes.QRCodes}/${qrCode?.id}/details`);
    }

    React.useEffect(() => {
        getLink();
    }, []);

    React.useEffect(() => {
        if (qrCodeRef.current) {
            qrCodeObject.append(qrCodeRef.current);
        }
    }, [qrCode, qrCodeRef]);


    React.useEffect(() => {
        if (!qrCode) return;
        qrCodeObject.update(options);
    }, [qrCodeObject, qrCode, options]);

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
                            <>
                                <Box>
                                    <LinkDetailsCard
                                        item={link}
                                        goToEditPage={goToEditPage}
                                        openDeleteLinkDialog={() => setOpenedDialog(deleteLinkDialogName)}
                                    />
                                </Box>
                                <Box sx={{mt: 3}}>
                                    <QRCodeInfo
                                        options={options}
                                        link={link}
                                        qrCodeRef={qrCodeRef}
                                        qrCode={qrCode}
                                        goToQRCodeCreationPage={goToQRCodeCreationPage}
                                        goToQRCodeCustomizationPage={goToQRCodeCustomizationPage}
                                        goToQRCodeDetailsPage={goToQRCodeDetailsPage}
                                    />
                                </Box>
                            </>
                        )}

                    </Box>
                </Box>
            )}
            <DeleteLinkDialog
                linkToDelete={link}
                open={openedDialog === deleteLinkDialogName}
                handleClose={() => setOpenedDialog(null)}
                deleteLinkErrorMessage={deleteLinkErrorMessage}
                setDeleteLinkErrorMessage={setDeleteLinkErrorMessage}
                handleSubmit={deleteLink}
            />
        </Box>
    );
}