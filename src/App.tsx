import "./App.css";
import { ErrorBoundary } from "react-error-boundary";

import AppRouter from "./router";
function App() {
  return (
    <ErrorBoundary fallback={<>خطا در اپلیکیشن</>}>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
