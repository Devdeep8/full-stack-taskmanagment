import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store";
import AuthFetcher from "./common/hooks/authFeatcher";
function App() {
  return (
    <>
      <Provider store={store}>
        <AuthFetcher/>
        <RouterProvider router={router} />

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toasterId="default"
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "#fff",
              color: "#000",
            },

            // Default options for specific types
            success: {
              duration: 3000,
            },
          }}
        />
      </Provider>
    </>
  );
}

export default App;
