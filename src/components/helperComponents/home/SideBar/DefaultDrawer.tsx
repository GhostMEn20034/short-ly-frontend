import MuiDrawer from '@mui/material/Drawer';
import {styled} from "@mui/material/styles";
import {drawerWidth} from "@app-consts/componentSizes.ts";
import {openedMixin, closedMixin} from "@app-helper-components/home/SideBar/Mixins.tsx";


const DefaultDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default DefaultDrawer;