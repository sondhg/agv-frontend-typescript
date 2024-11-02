import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { toast } from "sonner";
import "./App.css";
import { persistor, store } from "./redux/store";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  const Fallback = ({ error }: { error: Error }) => (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="text-error">{error.message}</pre>
      <pre>{error.stack}</pre>
    </div>
  );

  const handleToast = () => {
    toast.success("Hello world!");
  };

  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <AllRoutes />
              {/* <ModeToggle></ModeToggle>
                <button onClick={() => handleToast()}>test</button> */}
            </ThemeProvider>
          </PersistGate>
        </Provider>

        <Toaster richColors theme="light" toastOptions={{}} />
      </ErrorBoundary>
    </>
  );
}

export default App;
