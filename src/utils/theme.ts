import { MantineThemeOverride } from "@mantine/core";

const tbTheme: MantineThemeOverride = {
  colors: {
    "ocean-blue": ["#7AD1DD"],
    white: ["#FFF"],
    "truboard-primary": [
      "#001D56",
      "#1C3568",
      "#374E7A",
      "#53668D",
      "#6E7F9F",
      "#8A97B1",
      "#A5B0C3",
      "#C1C8D6",
      "#DCE1E8",
      "#F8F9FA",
    ],
    "truboard-accent": ["#E8E8E8"],
    "truboard-disabled-text": ["#A6A2A2"],
  },
  primaryColor: "truboard-primary",
};

export default tbTheme;
