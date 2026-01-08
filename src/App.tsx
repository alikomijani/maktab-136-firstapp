import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import Register from "./pages/Register";
function App() {
  return (
    <ErrorBoundary fallback={<>خطا در اپلیکیشن</>}>
      <Register />
    </ErrorBoundary>
  );
}

export default App;
