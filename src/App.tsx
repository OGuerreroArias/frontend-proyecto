import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import Routings from "lib/router/Routings";
import { theme } from "lib/styles/customTheme";
import { AuthProvider } from "lib/@core/contexts/AuthContext";

const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Router>
        <Routings />
      </Router>
    </AuthProvider>
  </ChakraProvider>
);

export default App;
