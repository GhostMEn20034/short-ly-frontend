import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import {StateField} from "@app-types/common.ts";
import Step from "@mui/material/Step";
import {StepLabel} from "@mui/material";

interface CreateQRCodeStepsProps {
    activeStep: StateField<number>;
    completedSteps: StateField<{ [k: number]: boolean }>;
    stepTitles: string[];
}

export default function CreateQRCodeSteps({activeStep, completedSteps, stepTitles}: CreateQRCodeStepsProps) {

    return (
        <Box>
            <Stepper nonLinear activeStep={activeStep.value}>
                {stepTitles.map((label, index) => (
                    <Step key={label} completed={completedSteps.value[index]}>
                        <StepLabel color="inherit">
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}