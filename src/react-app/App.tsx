import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Weather } from "./Weather";

export default function App() {
  return (
    <MantineProvider>
      <Weather />
    </MantineProvider>
  );
}
