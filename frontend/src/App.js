import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/style.css";

import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <ChakraProvider>
        <AppRouter />
      </ChakraProvider>
    </>
  );
}

export default App;
