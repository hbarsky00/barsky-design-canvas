
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import RedirectPage from "@/components/RedirectPage";

function App() {
  return (
    <HelmetProvider>
      <RedirectPage />
    </HelmetProvider>
  );
}

export default App;
