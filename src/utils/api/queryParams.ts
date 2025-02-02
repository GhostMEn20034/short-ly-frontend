import {Dayjs} from "dayjs";

export const generateQueryParams = (
    page: number,
    pageSize: number,
    dateFrom: Dayjs | null,
    dateTo: Dayjs | null
) => {
    const params: Record<string, unknown> = {
        page,
        page_size: pageSize,
    };

    // Include dateFrom and dateTo only if both are available
    if (dateFrom && dateTo) {
        // Set dateFrom to 00:00:00
        const startOfDay = dateFrom.startOf('day'); // Sets hour to 00, minute to 00, second to 00

        // Set dateTo to 23:59:59
        const endOfDay = dateTo.endOf('day'); // Sets hour to 23, minute to 59, second to 59

        params.date_from = startOfDay.toISOString(); // Converts to ISO string
        params.date_to = endOfDay.toISOString();     // Converts to ISO string
    }

    return params;
};
