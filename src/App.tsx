import "./App.css";
import { ErrorBoundary } from "react-error-boundary";

import AppRouter from "./router";
import { QueryProvider } from "./context/QueryClientProvider";
function App() {
  return (
    <ErrorBoundary fallback={<>خطا در اپلیکیشن</>}>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
