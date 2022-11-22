import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { projectService } from "lib/@core/services/project.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ProjectProps {
  id: number | string;
  name: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  mission: string;
  functions: string;
  requirements: string;
  creation_date: string;
  ong_id: {
    id: number | string;
    name: string;
    email: string;
    password: string;
    role: number;
    locale: string;
    description: string;
  };
  photo_urls: string;
}

const Project = () => {
  const [project, setProject] = useState<ProjectProps>({} as any);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    projectService.getProjectById(id as string).then((res) => {
        setProject(res);
      })
  }, []);

  return (
    <Flex
      flexDirection={"column"}
      gap={4}
      maxW={"900px"}
      m={"auto"}
      mt={8}
      p={16}
      border={"blue.50"}
      borderWidth={1}
    >
      <Heading as="h2" size="lg">
        Proyecto: {project?.name}
      </Heading>

      <Box>
        <Heading as="h2" size="lg" mb={2}>
          Description
        </Heading>
        <Text size={"md"}>{project?.description}</Text>
      </Box>

      <Box>
        <Heading as="h2" size="lg" mb={2}>
          Ubicación
        </Heading>
        <Text size={"md"}>{project?.location}</Text>
      </Box>

      <Box>
        <Heading as="h2" size="lg" mb={2}>
          Funciones del voluntario
        </Heading>
        <Text size={"md"}>{project?.functions}</Text>
      </Box>
    </Flex>
  );
};

export default Project;
