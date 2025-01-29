import Box from "@mui/material/Box";
import DefaultButton from "@app-components/common/buttons/DefaultButton.tsx";

interface EditLinkActionsProps {
    goBack: () => void;
    handleSubmit: () => void | Promise<void>;
}

export default function EditLinkActions({goBack, handleSubmit }: EditLinkActionsProps) {
    return (
        <Box display="flex" gap={3} justifyContent="flex-end">
            <Box>
                <DefaultButton variant="text" onClick={goBack}>
                    Cancel
                </DefaultButton>
            </Box>
            <Box>
                <DefaultButton variant="contained" onClick={handleSubmit}>
                    Save
                </DefaultButton>
            </Box>
        </Box>
    );
}