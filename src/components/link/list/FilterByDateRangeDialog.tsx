import React from "react";
import BootstrapDialog from "@app-components/common/dialog/BootstrapDialog.tsx";
import ButtonGroup from "@mui/material/ButtonGroup";
import DialogTitle from "@mui/material/DialogTitle";
import blueGrey from "@mui/material/colors/blueGrey";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SmallDatePicker from "@app-components/common/date-picker/SmallDatePicker.tsx";
import dayjs, {Dayjs} from "dayjs";
import {DateRange} from "@app-types/common.ts";


interface FilterByDateRangeDialogProps {
    handleClose: () => void;
    open: boolean;
    handleSubmit: (dateRange: DateRange) => void;
    dateRange: DateRange;
}


export default function FilterByDateRangeDialog({open, handleClose, handleSubmit, dateRange}: FilterByDateRangeDialogProps) {
    const initialDateFrom = dateRange.dateFrom || dayjs().subtract(1, 'days');
    const initialDateTo = dateRange.dateTo || dayjs();

    const [dateRangePreset, setDateRangePreset] = React.useState<'day' | 'week' | 'month' | null>(null);
    const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(initialDateFrom);
    const [dateTo, setDateTo] = React.useState<Dayjs | null>(initialDateTo);

    const changeDateRangePreset = (preset: 'day' | 'week' | 'month') => {
        const today = dayjs();
        let daysToSubtract = 0;

        switch (preset) {
            case 'day':
                daysToSubtract = 1;
                break;
            case 'week':
                daysToSubtract = 7;
                break;
            case 'month':
                daysToSubtract = 30;
                break;
            default:
                return;
        }

        setDateFrom(today.subtract(daysToSubtract, 'days'));
        setDateRangePreset(preset);
        setDateTo(today);
    };

    const resetFilter = () => {
      setDateFrom(null);
      setDateTo(null);
      setDateRangePreset(null);
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                maxWidth="sm"
                onClose={handleClose}
                open={open}
            >
                <DialogTitle sx={{m: 0, p: 2, color: blueGrey[800]}} id="customized-dialog-title">
                    <b>Filter by created date</b>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: blueGrey[800],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    <Box sx={{mb: 1}}>
                        <Typography variant="body1">
                            Filter by the last:
                        </Typography>
                    </Box>
                    <Box sx={{mb: 2}}>
                        <ButtonGroup variant="outlined" size="medium" aria-label="Basic button group">
                            <DefaultButton
                                variant={dateRangePreset === 'day' ? 'contained': 'outlined'}
                                onClick={() => changeDateRangePreset('day')}
                            >
                                Day
                            </DefaultButton>
                            <DefaultButton
                                variant={dateRangePreset === 'week' ? 'contained': 'outlined'}
                                onClick={() => changeDateRangePreset('week')}
                            >
                                Week
                            </DefaultButton>
                            <DefaultButton
                                variant={dateRangePreset === 'month' ? 'contained': 'outlined'}
                                onClick={() => changeDateRangePreset('month')}
                            >
                                Month
                            </DefaultButton>
                        </ButtonGroup>
                    </Box>
                    <Box sx={{mb: 1}}>
                        <Typography variant="body1">
                            Or by custom date range:
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex"}}>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <SmallDatePicker
                                    value={dateFrom ? dateFrom : dayjs()}
                                    onChange={(newValue) => {
                                        setDateFrom(newValue);
                                        setDateRangePreset(null);
                                        if (!dateTo) {
                                            setDateTo(dayjs());
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{mx: 1}} display="flex" alignItems="center">
                            <Typography variant="body1">
                                to
                            </Typography>
                        </Box>
                        <Box>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <SmallDatePicker
                                    value={dateTo ? dateTo : dayjs()}
                                    onChange={(newValue) => {
                                        setDateTo(newValue);
                                        setDateRangePreset(null);
                                        if (!dateFrom) {
                                            setDateFrom(dayjs());
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{gap: 2}}>
                    <DefaultButton startIcon={<CloseIcon/>} onClick={resetFilter} color="secondary" variant="outlined">
                        Reset filter
                    </DefaultButton>
                    <DefaultButton
                        onClick={() => handleSubmit({"dateFrom": dateFrom, "dateTo": dateTo})}
                        variant="contained"
                    >
                        Apply
                    </DefaultButton>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}