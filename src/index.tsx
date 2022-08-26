/* istanbul ignore file */
import { useEffect } from "react";
import ReactDOM from "react-dom";
import * as Fathom from "fathom-client";

import App from "./components/App";

import "./index.css";
import "@fontsource/inter";
import "@fontsource/manrope";

// Remove this ignore when TypeScript PR gets merged.
// @ts-ignore
import PWAPrompt from "react-ios-pwa-prompt";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  theme,
} from "@chakra-ui/react";

import ErrorPage from "./components/pages/ErrorPage";

import { RariProvider } from "./context/RariContext";

import "focus-visible";

import "./utils/i18n.ts";
import { BrowserRouter, useLocation } from "react-router-dom";

import LogRocket from "logrocket";

import { ErrorBoundary } from "react-error-boundary";

import { version } from "../package.json";
export { version };

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  console.log("Connecting to LogRocket...");
  LogRocket.init("eczu2e/rari-capital", {
    console: {
      shouldAggregateConsoleErrors: true,
    },
    release: version,
  });
  Fathom.load(process.env.REACT_APP_FATHOM_SITE_ID!, {
    url: "https://finch.market.xyz/script.js",
  });
}

/**
 * @notice forcefully setting initial mode to dark
 */
if (
  typeof localStorage !== "undefined" &&
  !localStorage.getItem("chakra-ui-color-mode")
) {
  localStorage.setItem("chakra-ui-color-mode", "dark");
}

console.log("Version " + version);

const extendedTheme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    ...theme.fonts,
    body: `Inter, ${theme.fonts.body}`,
    heading: `Manrope, Inter, ${theme.fonts.heading}`,
  },
  colors: {
    mktgray: {
      200: "#262C35",
      400: "#21262E",
      700: "#1D2229",
    },
  },
});

const queryClient = new QueryClient();
// Scrolls to the top of the new page when we switch pages
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isProd) {
      Fathom.trackPageview();
    }
  }, [pathname]);

  return null;
}

const Index = () => {
  useEffect(() => {
    if (isProd) {
      Fathom.trackPageview();
    }
  }, []);

  return (
    <>
      <PWAPrompt
        timesToShow={2}
        permanentlyHideOnDismiss={false}
        copyTitle="Add Market to your homescreen!"
        copyBody="The Market Portal works best when added to your homescreen. Without doing this, you may have a degraded experience."
        copyClosePrompt="Close"
      />
      <ChakraProvider theme={extendedTheme}>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
              <ScrollToTop />
              <RariProvider>
                <ColorModeScript
                  initialColorMode={extendedTheme.config.initialColorMode}
                />
                <App />
              </RariProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </ErrorBoundary>
      </ChakraProvider>
    </>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
