import "@mantine/core/styles.css";

import { MantineProvider, createTheme } from "@mantine/core";
import { Weather } from "./Weather";

const theme = createTheme({
  colors: {
    blue: [
      "#e6f0ff",
      "#b3ccff",
      "#80a8ff",
      "#4d85ff",
      "#1a61ff",
      "#0046e6",
      "#0036b3",
      "#002680",
      "#00194d",
      "#000d1a",
    ],
    darkGray: [
      "#f8f9fa",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#6c757d",
      "#495057",
      "#343a40",
      "#212529",
      "#121416",
    ],
  },
  primaryColor: "blue",
  black: "#343a40",
  fontFamily: "Noto Sans, sans-serif",
  headings: { fontFamily: "Noto Sans, sans-serif" },
});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Weather />
    </MantineProvider>
  );
}
