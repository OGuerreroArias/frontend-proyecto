import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Flex,
	Heading,
	Text,
	Box,
	Image,
	Link,
	Icon
} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import { projectService } from "lib/@core/services/project.service";
import { Link as ReactRouterLink } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons"
import { useState, useEffect, useContext } from "react"
import ProjectModal from "./components/ProjectModal";
import { AuthContext } from "lib/@core/contexts/AuthContext"

import "./index.css";


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

const Projects = () => {

	const [projects, setProjects] = useState([]);
	const { user, isVolunteer } = useContext(AuthContext);

	useEffect(() => {
		if(isVolunteer(user) ){
		  projectService.getProjects().then((res) => setProjects(res))
		}else {
		  projectService.getProjectsByOngId(user.id).then((res) => setProjects(res))
		}
	}, [])

	return (
		<>
			<ProjectModal setProjects={setProjects} />
			{
				projects.length === 0 ? (
					<Box className="no-projects" p={4}>
						<Heading>No hay proyectos</Heading>
					</Box>
				) : (
						<Flex maxW={"1100px"} m={"auto"} mt={"10"} gap={4} flexDirection={"column"}>
							{projects?.map((project: ProjectProps) => (
								<ProjectCard key={project.id} project={project} />
							))}
						</Flex>
				)
			}
		</>

	);
};

const ProjectCard = ({ project }: { project: ProjectProps }) => {
	const {user,isVolunteer} = useContext(AuthContext)

	return (
		<Flex boxShadow={"xl"} bg={"white"} flex={1} p={4}>
			<Box>
				<Image src={project.photo_urls ?? "https://via.placeholder.com/300"} />
			</Box>
			<Flex
				px={4}
				alignSelf={"flex-start"}
				w={"100%"}
				h={"100%"}
				flexDirection={"column"}
			>
				<Flex justifyContent={"space-between"}>
					<Heading as="h3" size="md" color={"blackAlpha.600"}>
						<Link as={ReactRouterLink} to={`/proyectos/${project.id.toString()}`}>
							{project.name}
						</Link>
					</Heading>
					{
						!isVolunteer(user) && (
							<Button onClick={() => projectService.deleteProject((project.id).toString())}>
								<Icon as={DeleteIcon}  />
							</Button>
						)
					}
				</Flex>
				<Text color={"blackAlpha.600"}>{project.description}</Text>
				<VerticallyCenterModal project={project} />
			</Flex>
		</Flex>
	);
};

function VerticallyCenterModal({ project }: { project: ProjectProps }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user, isVolunteer } = useContext(AuthContext);

	return (
		<>
			<Box alignSelf={"baseline"} color={"blackAlpha.600"} mt={10}>
				<Link textDecoration="underline" onClick={onOpen}>
					Conocer Mas
				</Link>
			</Box>

			<Modal onClose={onClose} isOpen={isOpen} isCentered size={"2xl"}>
				<ModalOverlay />
				<ModalContent>
					{/* <ModalHeader></ModalHeader> */}
					<ModalCloseButton />
					<ModalBody>
						<Flex boxShadow={"xl"} flex={1} p={4}>
							<Box>
								<Image src={project.photo_urls} id="square" />
							</Box>
							<Flex
								px={8}
								alignSelf={"flex-start"}
								w={"100%"}
								h={"100%"}
								flexDirection={"column"}
							>
								<Heading as="h3" size="lg" color={"black"}>
									{project.name}
								</Heading>
								<Text color={"black"} size={"xs"} py={4}>
									{project.description}
								</Text>
								{isVolunteer(user) && <CustomButton />}
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

const CustomButton = () => {

  const [text, setText] = useState("Aplicar")

  return (
    <Button colorScheme={"teal"} onClick={() => {
      setText("Aplicado")
    }}>{text}</Button>
  )
}

export default Projects;
