import dayjs, {Dayjs} from "dayjs";
import {DateRange} from "@app-types/common.ts";

export const getDateOrNull = (dateString: string | null): Dayjs | null => {
    return dateString && dayjs(dateString).isValid() ? dayjs(dateString) : null;
};

export const extractDateRange = (rawDateFrom: string | null, rawDateTo: string | null): DateRange => {
    const dateFrom = getDateOrNull(rawDateFrom);
    const dateTo = getDateOrNull(rawDateTo);

    // Ensure that both are either valid or null
    if (dateFrom && dateTo) {
        return {dateFrom, dateTo};
    }

    return {dateFrom: null, dateTo: null};
};