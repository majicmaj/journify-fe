import "@blocknote/mantine/style.css";
import { CssVarsProvider, extendTheme } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import New from "./folders/views/New/New.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/new",
    element: <New />,
  },
]);

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // affects all Joy components that has `color="primary"` prop.
        primary: {
          50: "#EAF9FA",
          100: "#CFF1F3",
          200: "#9AE2E6",
          300: "#65D3D9",
          400: "#40C8D0",
          500: "#2DAEB5",
          600: "#248B91",
          700: "#1B686C",
          800: "#124447",
          900: "#082122",
          // 950: "#040F10",
        },
      },
    },
  },
  fontFamily: {
    display: "Inter, var(--joy-fontFamily-fallback)",
    body: "Inter, var(--joy-fontFamily-fallback)",
  },
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider theme={theme}>
        <RouterProvider router={router} />
      </CssVarsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
