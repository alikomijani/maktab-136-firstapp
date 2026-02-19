import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import AppRouter from "./router";
import { QueryProvider } from "./context/QueryClientProvider";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./theme/ThemeProvider";
function App() {
  return (
    <ErrorBoundary fallback={<>خطا در اپلیکیشن</>}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryProvider>
            <ThemeProvider>
              <AppRouter />
            </ThemeProvider>
          </QueryProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
