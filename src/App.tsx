import "./App.css";
import Home from "./pages/Home";
import { ErrorBoundary } from "react-error-boundary";
function App() {
  return (
    <ErrorBoundary fallback={<>خطا در اپلیکیشن</>}>
      <Home />
    </ErrorBoundary>
  );
}

export default App;
