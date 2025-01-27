import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";

const DefaultPagination = styled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
        color: "#E60023", // Primary color for text
        border: "1px solid #E60023", // Primary color for the border
        borderRadius: theme.shape.borderRadius, // Keep default MUI border radius
        backgroundColor: "transparent", // Transparent background
        "&:hover": {
            backgroundColor: "rgba(230, 0, 35, 0.1)", // Light background on hover
        },
        "&.Mui-selected": {
            backgroundColor: "rgba(230, 0, 35, 0.1)", // Light red background for selected
            color: "#E60023", // Primary color for selected text
            borderColor: "#E60023", // Keep border the same for selected
            fontWeight: 600, // Bold text for selected
            "&:hover": {
                backgroundColor: "rgba(230, 0, 35, 0.2)", // Slightly darker background on hover
            },
        },
    },
    "& .MuiPaginationItem-ellipsis": {
        color: "#E60023", // Color for ellipsis ("...") items
    },
}));

export default DefaultPagination;