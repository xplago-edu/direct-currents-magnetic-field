import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <NextUIProvider>
                <NextThemesProvider attribute={"class"} defaultTheme={"dark"}>
                    <App/>
                </NextThemesProvider>
            </NextUIProvider>
        </Provider>
    </React.StrictMode>,
)
