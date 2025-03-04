import React from "react";
import Box from "@mui/material/Box";
import {LinkItem} from "@app-types/link.ts";
import {Link as RouterLink, useSearchParams, useNavigate} from "react-router";
import LinkListItem from "@app-components/link/list/ListItem.tsx";
import Typography from "@mui/material/Typography";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import Divider from "@mui/material/Divider";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {blueGrey} from "@mui/material/colors";
import {AxiosInstance, isAxiosError} from "axios";
import {convertListOfLinksResponse} from "@app-utils/link/convertResponse.ts";
import {changeQueryParams, deleteQueryParams} from "@app-utils/urlParams/editUrlParams.ts";
import DefaultPagination from "@app-components/common/pagination/DefaultPagination.tsx";
import Link from "@mui/material/Link";
import DeleteLinkDialog from "@app-components/link/delete/DeleteLinkDialog.tsx";
import FilterByDateRangeDialog from "@app-components/link/list/FilterByDateRangeDialog.tsx";
import {DateRange} from "@app-types/common.ts";
import {extractDateRange} from "@app-utils/dates/dateExtraction.ts";
import {generateQueryParams} from "@app-utils/api/queryParams.ts";


export default function LinkListPage({api}: { api: AxiosInstance }) {
    const deleteLinkDialogName = 'deleteLink';
    const filterByDateRangeDialogName = 'filterByDateRange';

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    const dateRange: DateRange = extractDateRange(dateFrom, dateTo);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = 15;

    const [pageCount, setPageCount] = React.useState<number>(1);

    const [links, setLinks] = React.useState<LinkItem[] | null>(null);
    const [linksCount, setLinksCount] = React.useState<number>(0);
    const [itemToDelete, setItemToDelete] = React.useState<LinkItem | null>(null);
    const [openedDialog, setOpenedDialog] = React.useState<string | null>(null);
    const [deleteLinkErrorMessage, setDeleteLinkErrorMessage] = React.useState<string | null>(null);

    const openDeleteLinkDialog = (item: LinkItem) => {
        setItemToDelete(item);
        setOpenedDialog(deleteLinkDialogName);
    };

    const closeDeleteLinkDialog = () => {
        setOpenedDialog(null);
        setItemToDelete(null); // Clear the selected item when closing the dialog
    };

    const goToEditPage = (shortCode: string | null) => {
        navigate(`/${rootRoutePrefixes.links}/${shortCode}/edit`);
    };

    const goToDetailsPage = (shortCode: string | null) => {
        navigate(`/${rootRoutePrefixes.links}/${shortCode}/details`);
    };

    const deleteLink = async () => {
        if (!itemToDelete) return;

        try {
            await api.delete(`/api/v1/urls/${itemToDelete.shortCode}`);
            if (links && links.length > 1) {
                setLinks(prevLinks =>
                    prevLinks?.filter(item => item.shortCode !== itemToDelete.shortCode) ?? []
                );
            } else {
                setSearchParams(changeQueryParams(searchParams, {page: 1}));
            }
            closeDeleteLinkDialog();
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 404) {
                setDeleteLinkErrorMessage("There's no link with such short code.")
            } else {
                setDeleteLinkErrorMessage("Something went wrong");
            }
        }
    };

    const getLinkList = async () => {
        const params = generateQueryParams(page, pageSize, dateRange.dateFrom, dateRange.dateTo);

        try {
            const response = await api.get("/api/v1/urls/", {params});
            const data = await response.data;
            setLinks(convertListOfLinksResponse(data.items));
            setPageCount(data.pagination.total_pages);
            setLinksCount(data.pagination.total_items);
        } catch (error: unknown) {
            console.log(error);
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

    const clearFilters = () => {
        setSearchParams(deleteQueryParams(searchParams, [
            "dateFrom", "dateTo"
        ]));
    };

    const filtersApplied = () => dateRange.dateFrom !== null && dateRange.dateTo !== null;

    React.useEffect(() => {
        document.title = "Shortly | Links"
    }, []);

    React.useEffect(() => {
        getLinkList();
    }, [page, dateFrom, dateTo]);

    return (
        <Box>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Box>
                    <Typography variant="h4" sx={{color: blueGrey[800]}}>
                        <b>Shortly Links</b>
                    </Typography>
                </Box>
                <Box sx={{ml: "auto"}}>
                    <DefaultButton
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to={`/${rootRoutePrefixes.links}/create`}
                    >
                        Create link
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
                                {linksCount} matches found
                            </Typography>
                            <DefaultButton onClick={clearFilters}>
                                Clear
                            </DefaultButton>
                        </>
                    )}
                </Box>
            </Box>
            <Divider sx={{mt: 2, mb: 4}}/>
            {links?.length ? (
                <Box>
                    {links.map((link, index) => (
                        <Box key={link.shortCode} sx={{mb: index === links.length - 1 ? 0 : 2}}>
                            <LinkListItem
                                item={link}
                                goToEditPage={() => goToEditPage(link.shortCode)}
                                goToDetailsPage={() => goToDetailsPage(link.shortCode)}
                                openDeleteLinkDialog={openDeleteLinkDialog}
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
            <DeleteLinkDialog
                linkToDelete={itemToDelete}
                open={openedDialog === deleteLinkDialogName}
                handleClose={closeDeleteLinkDialog}
                deleteLinkErrorMessage={deleteLinkErrorMessage}
                setDeleteLinkErrorMessage={setDeleteLinkErrorMessage}
                handleSubmit={deleteLink}
            />
            <FilterByDateRangeDialog
                open={openedDialog === filterByDateRangeDialogName}
                handleClose={() => setOpenedDialog(null)}
                handleSubmit={handleSubmitDateRangeFilter}
                dateRange={dateRange}
            />
        </Box>
    );
};