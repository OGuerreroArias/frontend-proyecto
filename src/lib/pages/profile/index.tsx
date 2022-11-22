import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { AuthContext } from "lib/@core/contexts/AuthContext";
import React from "react";

const ongFormFields = ["name", "email", "description", "locale"];
const volunteerFormFields = ["name", "email", "lastName", "dni", "experience"];

export default function Profile(): JSX.Element {
  // preguntar a la api si el usuario es voluntario o no
  const { isVolunteer, user } = React.useContext(AuthContext);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Perfil
        </Heading>
        <Stack direction={["column", "row"]} spacing={6}>
          <Center>
            <Avatar size="xl" src="https://bit.ly/sage-adebayo">
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
                icon={<SmallCloseIcon />}
              />
            </Avatar>
          </Center>
        </Stack>
        <Stack spacing={6}>
          {isVolunteer(user)
            ? volunteerFormFields.map((field, i) => (
                // list of fields
                <FormControl id={field} key={i} isReadOnly>
                  <FormLabel>{field}</FormLabel>
                  <Input
                    type="text"
                    placeholder={field}
                    rounded={"md"}
                    value={user[field]}
                  />
                </FormControl>
              ))
            : ongFormFields.map((field) => (
                // list of fields
                <FormControl id={field} key={field}>
                  <FormLabel>{field}</FormLabel>
                  <Input
                    type="text"
                    placeholder={field}
                    rounded={"md"}
                    value={user[field]}
                  />
                </FormControl>
              ))}
        </Stack>
      </Stack>
    </Flex>
  );
}
