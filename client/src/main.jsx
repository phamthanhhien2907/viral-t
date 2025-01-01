import { createRoot } from "react-dom/client";
import "./index.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "./redux";
const { store, persistor } = reduxStore();
import global_de from "@/translations/de/global.json";
import global_vn from "@/translations/vn/global.json";
import global_kr from "@/translations/kr/global.json";
import global_en from "@/translations/en/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
const savedLanguage = localStorage.getItem("language") || "vn";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});
i18next.init({
  interpolation: { escapeValue: false },
  lng: savedLanguage, 
  resources: {
    vn: {
      global: global_vn,
    },
    en: {
      global: global_en,
    },
    kr: {
      global: global_kr,
    },
    de: {
      global: global_de,
    },
  },
});

createRoot(document.getElementById("root")).render(
   <ThemeProvider theme={theme}>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <I18nextProvider i18n={i18next}>
            <App/>
          </I18nextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
   </ThemeProvider>
);
