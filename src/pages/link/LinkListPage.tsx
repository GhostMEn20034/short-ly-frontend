import React from "react";
import Box from "@mui/material/Box";
import {LinkItem} from "@app-types/link.ts";
import {Link as RouterLink, useSearchParams, useNavigate} from "react-router";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Timezone from "dayjs/plugin/timezone";
import UTC from "dayjs/plugin/utc";
import LinkListItem from "@app-components/link/list/ListItem.tsx";
import Typography from "@mui/material/Typography";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import {rootRoutePrefixes} from "@app-consts/routePrefixes.ts";
import Divider from "@mui/material/Divider";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {blueGrey} from "@mui/material/colors";
import {AxiosInstance, isAxiosError} from "axios";
import {convertListOfLinksResponse} from "@app-utils/link/convertResponse.ts";
import {changeQueryParams} from "@app-utils/urlParams/editUrlParams.ts";
import DefaultPagination from "@app-components/common/pagination/DefaultPagination.tsx";
import Link from "@mui/material/Link";
import DeleteLinkDialog from "@app-components/link/delete/DeleteLinkDialog.tsx";


dayjs.extend(LocalizedFormat);
dayjs.extend(Timezone)
dayjs.extend(UTC);


export default function LinkListPage({api}: { api: AxiosInstance }) {
    const deleteLinkDialogName = 'deleteLink';

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = 15;

    const [pageCount, setPageCount] = React.useState<number>(1);

    const [links, setLinks] = React.useState<LinkItem[] | null>(null);
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
                setSearchParams(changeQueryParams(searchParams, { page: 1 }));
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
        const params = {
            page: page,
            page_size: pageSize,
        };

        try {
            const response = await api.get("/api/v1/urls/", {params});
            const data = await response.data;
            setLinks(convertListOfLinksResponse(data.items));
            setPageCount(data.pagination.total_pages);
        } catch (error: unknown) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        document.title = "Shortly | Links"
    }, []);

    React.useEffect(() => {
        getLinkList();
    }, [page]);

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
                <DefaultButton
                    color="secondary"
                    variant="contained"
                    startIcon={<CalendarTodayIcon/>}
                >
                    Filter by created date
                </DefaultButton>
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
                    <Typography variant="h6">
                        You haven't created a link yet. &nbsp;
                        <Link component={RouterLink} to={`/${rootRoutePrefixes.links}/create`}>
                            Create one
                        </Link>
                    </Typography>
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
                open={openedDialog === deleteLinkDialogName}
                handleClose={closeDeleteLinkDialog}
                deleteLinkErrorMessage={deleteLinkErrorMessage}
                setDeleteLinkErrorMessage={setDeleteLinkErrorMessage}
                handleSubmit={deleteLink}
            />
        </Box>
    );
};