import Box from "@mui/material/Box";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";

interface CreateLinkActionProps {
    goBack: () => void;
    handleSubmit: () => void | Promise<void>;
    handleSubmitLoading: boolean;
}

export default function CreateLinkActions({goBack, handleSubmit, handleSubmitLoading}: CreateLinkActionProps) {
    return (
        <Box display="flex" gap={3} justifyContent="flex-end">
            <Box>
                <DefaultButton variant="text" onClick={goBack}>
                    Cancel
                </DefaultButton>
            </Box>
            <Box>
                <DefaultButton disabled={handleSubmitLoading} variant="contained" onClick={handleSubmit}>
                    Save
                </DefaultButton>
            </Box>
        </Box>
    );
}