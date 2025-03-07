import Box from "@mui/material/Box";
import {AxiosInstance} from "axios";
import {Link as RouterLink, useSearchParams, useNavigate} from "react-router";
import {DateRange} from "@app-types/common.ts";
import {extractDateRange} from "@app-utils/dates/dateExtraction.ts";
import React from "react";
import {QRCodeItemWithLink} from "@app-types/qrCode.ts";
import Typography from "@mui/material/Typography";
import {blueGrey} from "@mui/material/colors";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {changeQueryParams, deleteQueryParams} from "@app-utils/urlParams/editUrlParams.ts";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import DefaultPagination from "@app-components/common/pagination/DefaultPagination.tsx";
import {QRCodeListItem} from "@app-components/QRCode/list/QRCodeListItem.tsx";
import {generateQueryParams} from "@app-utils/api/queryParams.ts";
import {convertListOfQRCodesResponse} from "@app-utils/qrCode/convertResponse.ts";
import FilterByDateRangeDialog from "@app-components/link/list/FilterByDateRangeDialog.tsx";

export default function QRCodeListPage({api}: { api: AxiosInstance }) {
    // const deleteQRCodeDialogName = 'deleteQRCode';
    const filterByDateRangeDialogName = 'filterByDateRange';

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");
    const dateRange: DateRange = extractDateRange(dateFrom, dateTo);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = 15;
    const [pageCount, setPageCount] = React.useState<number>(1);

    const [qrCodes, setQRCodes] = React.useState<QRCodeItemWithLink[] | null>(null);
    const [qrCodesCount, setQRCodesCount] = React.useState<number>(0);

    const [openedDialog, setOpenedDialog] = React.useState<string | null>(null);

    const goToCustomizationPage = (qrCodeId: number) => {
        navigate(`/${rootRoutePrefixes.QRCodes}/${qrCodeId}/edit/customize`);
    };

    const goToEditQRCodeContentPage = (qrCodeId: number) => {
        navigate(`/${rootRoutePrefixes.QRCodes}/${qrCodeId}/edit/content`);
    };

    const goToLinkDetailsPage = (shortCode: string) => {
        navigate(`/${rootRoutePrefixes.links}/${shortCode}/details`);
    };

    const goToQRCodeDetailsPage = (qrCodeId: number) => {
        navigate(`/${rootRoutePrefixes.QRCodes}/${qrCodeId}/details`);
    };

    const getQRCodeList = async () => {
        const params = generateQueryParams(page, pageSize, dateRange.dateFrom, dateRange.dateTo);

        try {
            const response = await api.get("/api/v1/qr-codes/", {params});
            const data = await response.data;
            setQRCodes(convertListOfQRCodesResponse(data.items));
            setPageCount(data.pagination.total_pages);
            setQRCodesCount(data.pagination.total_items);
        } catch {
            console.log("Something went wrong");
        }
    };

    const handleSubmitDateRangeFilter = (dateRange: DateRange) => {
        const params: Record<string, string | number> = {
            'page': 1,
        };

        let updatedSearchParams = searchParams;

        if (dateRange.dateFrom !== null && dateRange.dateTo !== null) {
            params['dateFrom'] = dateRange.dateFrom.format('YYYY-MM-DD');
            params['dateTo'] = dateRange.dateTo.format('YYYY-MM-DD');
        } else {
            updatedSearchParams = deleteQueryParams(searchParams, ["dateFrom", "dateTo"]);
        }
        updatedSearchParams = changeQueryParams(updatedSearchParams, params)
        setSearchParams(updatedSearchParams);
        setOpenedDialog(null);
    };

    const filtersApplied = () => dateRange.dateFrom !== null && dateRange.dateTo !== null;

    const clearFilters = () => {
        setSearchParams(deleteQueryParams(searchParams, [
            "dateFrom", "dateTo"
        ]));
    };

    React.useEffect(() => {
        document.title = "Shortly | QR Codes";
    }, []);

    React.useEffect(() => {
        getQRCodeList();
    }, [page, dateFrom, dateTo]);

    return (
        <Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Box>
                    <Typography variant="h4" sx={{color: blueGrey[800]}}>
                        <b>QR Codes</b>
                    </Typography>
                </Box>
                <Box sx={{ml: "auto"}}>
                    <DefaultButton
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to={`/${rootRoutePrefixes.QRCodes}/create`}
                    >
                        Create QR Code
                    </DefaultButton>
                </Box>
            </Box>
            <Box sx={{mt: 2}}>
                <Box display="flex" alignItems="center" gap={1}>
                    <DefaultButton
                        color={dateRange.dateFrom !== null && dateRange.dateTo !== null ? "primary" : "secondary"}
                        variant="outlined"
                        startIcon={<CalendarTodayIcon/>}
                        onClick={() => setOpenedDialog(filterByDateRangeDialogName)}
                    >
                        {
                            dateRange.dateFrom !== null && dateRange.dateTo !== null ?
                                `${dateRange.dateFrom.format('MMM D')} - ${dateRange.dateTo.format('MMM D')}` :
                                "Filter by created date"
                        }
                    </DefaultButton>
                    {filtersApplied() && (
                        <>
                            <Typography variant="body1">
                                {qrCodesCount} matches found
                            </Typography>
                            <DefaultButton onClick={clearFilters}>
                                Clear
                            </DefaultButton>
                        </>
                    )}
                </Box>
            </Box>
            <Divider sx={{mt: 2, mb: 4}}/>
            {qrCodes?.length ? (
                <Box>
                    {qrCodes.map((qrCode, index) => (
                        <Box key={qrCode.id} sx={{mb: index === qrCodes.length - 1 ? 0 : 2}}>
                            <QRCodeListItem
                                item={qrCode}
                                goToCustomizationPage={goToCustomizationPage}
                                goToEditQRCodeContentPage={goToEditQRCodeContentPage}
                                goToLinkDetailsPage={goToLinkDetailsPage}
                                goToQRCodeDetailsPage={goToQRCodeDetailsPage}
                            />
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box display="flex" justifyContent="center">
                    {!filtersApplied() ? (
                        <Typography variant="h6">
                            You haven't created a link yet. &nbsp;
                            <Link component={RouterLink} to={`/${rootRoutePrefixes.links}/create`}>
                                Create one
                            </Link>
                        </Typography>
                    ) : (
                        <Typography variant="h6">
                            No results found. Try adjusting your filters.
                        </Typography>
                    )}
                </Box>
            )}
            {pageCount > 1 && (
                <Box sx={{mt: 3, display: "flex", justifyContent: "center"}}>
                    <DefaultPagination
                        count={pageCount}
                        page={page}
                        onChange={(_event: React.ChangeEvent<unknown>, value: number) => {
                            setSearchParams(changeQueryParams(
                                searchParams,
                                {'page': value}
                            ));
                            window.scrollTo({
                                top: 0,
                                behavior: 'instant',
                            });
                        }}
                        variant="outlined"
                        shape="rounded"
                        size="large"
                    />
                </Box>
            )}
            <FilterByDateRangeDialog
                open={openedDialog === filterByDateRangeDialogName}
                handleClose={() => setOpenedDialog(null)}
                handleSubmit={handleSubmitDateRangeFilter}
                dateRange={dateRange}
            />
        </Box>
    );
}