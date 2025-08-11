import "@mantine/core/styles.css";

import { MantineProvider, createTheme } from "@mantine/core";
import { Weather } from "./Weather";

const theme = createTheme({
  colors: {
    navy: [
      "#c4d1eb", // 0 - 明るいハイライト用（ほぼ使わない）
      "#a1b4d9",
      "#7d96c7",
      "#5a7abe",
      "#345aa8",
      "#274078", // 5 - メインに使う濃いネイビー
      "#1e2f58",
      "#162241", // 7 - 濃い見出し向き
      "#101832",
      "#0a101f", // 9 - ほぼ黒に近い濃紺
    ],
    charcoal: [
      "#d9dbdf", // 0 - 明るい
      "#b0b3ba",
      "#8a8e96",
      "#62666f",
      "#444850",
      "#2e323a", // 5 - メインの濃いチャコールグレー
      "#21252b",
      "#181b21", // 7 - かなり濃い
      "#101216",
      "#08090b", // 9 - 黒に近いチャコール
    ],
  },
  primaryColor: "navy",
  black: "#2e323a",
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
