"use client";
import { useEffect } from "react";
import { SocketProvider } from "@/context/SocketProvider";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  // Load the saved cart / sidebar state (localStorage) once the page has hydrated. There used to be
  // a <PersistGate loading={null}> here, which rendered nothing until that state was loaded, so the
  // server sent every page without its content (bad for search engines and slow first paint).
  useEffect(() => {
    persistor.persist();
  }, []);

  return (
    <Provider store={store}>
      <SocketProvider>
        {/* <GoogleOAuthProvider clientId="1026790988080-5t355vtcj5n5imm0i0dp4k8c7da67486.apps.googleusercontent.com"> */}
        {children}
        {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
        {/* </GoogleOAuthProvider> */}
      </SocketProvider>
    </Provider>
  );
};

export default Providers;
