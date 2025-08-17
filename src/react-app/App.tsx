import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Weather } from "./Weather";

const theme = createTheme({
  colors: {
    cyan: [
      "#E0F7FA",
      "#B2EBF2",
      "#80DEEA",
      "#4DD0E1",
      "#26C6DA",
      "#00BCD4",
      "#00ACC1",
      "#0097A7",
      "#00838F",
      "#006064",
    ],
  },
  primaryColor: "cyan",
  fontFamily: "Noto Sans, sans-serif",
  headings: { fontFamily: "Noto Sans, sans-serif" },
});

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Weather />
    </MantineProvider>
  );
}
