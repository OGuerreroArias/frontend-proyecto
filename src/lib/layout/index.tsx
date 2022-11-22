import ChatBot from "react-simple-chatbot";
import Navbar from "./Navbar";
import { Box, Flex } from "@chakra-ui/react";

import Meta from "./Meta";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    id: "1",
    message: "Quieres interactuar con mas personas",
    trigger: "2",
  },
  {
    id: "2",
    options: [{ value: 1, label: "Presiona aqui", trigger: "3" }],
    end: true,
  },
  {
    id: "3",
    message: "Bienvenido al foro",
    end: true,
  },
];

const Layout = ({ children }: any) => {
  const navigate = useNavigate();

  const handleEnd = () => {
    navigate("/foro");
  };

  return (
    <Box transition="0.5s ease-out">
      <Flex wrap="wrap">
        <Meta />
        <Box width="full" as="main">
          <Navbar />
          {children}
          <ChatBot steps={steps} floating={true} handleEnd={handleEnd} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
