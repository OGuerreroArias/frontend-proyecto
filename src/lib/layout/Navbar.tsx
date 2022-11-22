import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  Link,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "lib/@core/contexts/AuthContext";
import { useContext } from "react";

const Links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Proyectos",
    path: "/proyectos",
  },
  {
    label: "Foro",
    path: "/foro",
  },
];

const NavLink = ({ link }: any) => (
  <Link
    as={ReactRouterLink}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.700", "gray.700"),
    }}
    to={link.path}
  >
    {link.label}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <Box bg={useColorModeValue("teal", "gray.900")} px={4} color={"white"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link} link={link} />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={"https://bit.ly/sage-adebayo"} />
              </MenuButton>
              <MenuList color={"blackAlpha.700"}>
                <MenuItem>
                  <Link as={ReactRouterLink} to="/perfil">
                    Perfil
                  </Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    signOut();
                    navigate("/login");
                  }}
                >
                  Cerrar sesion
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
