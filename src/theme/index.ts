import { createTheme } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import typography from "./typography";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: { main: orange[500] },
    error: { main: red[400] },
  },
  typography: typography,
});

export default theme;
