import React from "react";
import {Dayjs} from "dayjs";

export interface StateField<T> {
    value: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}

export interface DateRange {
    dateFrom: Dayjs | null;
    dateTo: Dayjs | null;
}