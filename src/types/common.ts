import React from "react";

export interface StateField<T> {
    value: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}