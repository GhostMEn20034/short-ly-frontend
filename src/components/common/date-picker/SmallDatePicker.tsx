import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';

const SmallDatePicker = styled(DatePicker)({
    '& .MuiTextField-root': {
        minHeight: '32px',
    },
    '& .MuiInputBase-root': {
        fontSize: '16px',
        padding: '4px 8px',
        minHeight: '32px', // Reduce overall input height
    },
    '& .MuiOutlinedInput-root': {
        fontSize: '14px',
        padding: '4px 8px',
        minHeight: '32px',
    },
    '& .MuiOutlinedInput-input': {
        padding: '6px 8px', // Adjust inner padding
        fontSize: '16px'
    },
    '& .MuiPickersDay-root': {
        fontSize: '14px',
        width: '28px', // Adjust calendar day size
        height: '28px',
    },
    '& .MuiPickersCalendarHeader-root': {
        fontSize: '14px',
    },
});

export default SmallDatePicker;