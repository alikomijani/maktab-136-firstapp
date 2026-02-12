import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import AppRouter from "./router";
import { QueryProvider } from "./context/QueryClientProvider";
import { store } from "./redux/store";
function App() {
  return (
    <ErrorBoundary fallback={<>خطا در اپلیکیشن</>}>
      <Provider store={store}>
        <QueryProvider>
          <AppRouter />
        </QueryProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
