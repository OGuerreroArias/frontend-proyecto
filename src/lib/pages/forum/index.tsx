import { TimeIcon } from "@chakra-ui/icons";
import {
	Box, Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody, ModalCloseButton, Button, Flex, Heading, Icon, Link, useDisclosure, useColorModeValue, FormControl,
	FormLabel,
	Input,
	InputGroup,
	Stack,
	SimpleGrid
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { forumService, ITopicCard } from "lib/@core/services/forum.service";
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "lib/@core/contexts/AuthContext";
import { useFormik } from "formik";
import { projectService } from "lib/@core/services/project.service";



const Forum = () => {
	const [topics, setTopics] = useState<ITopicCard[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const getAllTopics = async () => {
		await forumService.getAllTopicCards().then((topics) => {
			console.log("🚀 ~ file: index.tsx ~ line 13 ~ awaitforumService.getAllTopicCards ~ topics", topics)
			setTopics(topics)
		});
	}

	useEffect(() => {
		if (isLoading) {
			getAllTopics();
			setIsLoading(false);
		}
	}, [topics, isLoading]);

	// if (isLoading) {
	//   return <div>Loading...</div>;
	// }


	return (
		<Box maxW={"1100px"} m={"auto"} h={"100vh"} bg={"blackAlpha.50"}>
			<Box p={8}>
				<Flex gap={4}>
					<CreatePublicationModal setTopics={setTopics} />
					<Button colorScheme={"teal"}>Mis publicaciones</Button>
				</Flex>
				<Box mt={8}>
					<Flex p={4} justifyContent={"space-between"} bg={"teal"}>
						<Heading as="h2" size="lg" color={"whiteAlpha.800"}>
							TOPICOS
						</Heading>
						<Icon as={TimeIcon} w={8} h={8} color={"white"} mr={8} />
					</Flex>
					<Flex gap={6} p={3} bg={"blackAlpha.300"} direction="column">
						{
							isLoading ? (
								<div>Loading...</div>
							)
								: (topics.map((topic: ITopicCard) => (
									<TopicCard key={topic.id} topic={topic} />
								)))
						}
					</Flex>
				</Box>
			</Box>
		</Box>
	);
};

const TopicCard = ({ topic }: { topic: ITopicCard }) => {
	return (
		<Box bg={"whiteAlpha.600"} p={6}>
			<Heading as="h3" size="md" color={"blackAlpha.600"}>
				<Link as={ReactRouterLink} to={`/foro/${topic.id.toString()}`}>
					{topic.title}
				</Link>
			</Heading>
		</Box>
	);
};

function CreatePublicationModal({ setTopics }: { setTopics: any }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { user, isVolunteer } = useContext(AuthContext);

	const type = isVolunteer(user) ? "volunteer_id" : "ong_id"


	const formik = useFormik({
		initialValues: {
			creationDate: new Date().toISOString(),
			description: 'x',
			content: "x",
			title: "",
			[type]: user.id
		},
		onSubmit: values => {
			forumService.createTopic(values).then((topic) => {
				console.log("🚀 ~ file: index.tsx ~ line 13 ~ awaitforumService.getAllTopicCards ~ topics", topic)
				setTopics((prev: ITopicCard[]) => [...prev, topic])
			});
		}
	});

	return (
		<>
			<Button colorScheme={"teal"} onClick={onOpen}>Crear publicacion</Button>

			<Modal onClose={onClose} isOpen={isOpen} isCentered size={"2xl"}>

				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={(e) => {
							e.preventDefault();
							formik.handleSubmit();
							// close modal
							onClose();
						}}>
							<Flex
								align={'center'}
								justify={'center'}
								bg={useColorModeValue('gray.50', 'gray.800')}>
								<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
									<Box
										rounded={'lg'}
										bg={useColorModeValue('white', 'gray.700')}
										boxShadow={'lg'}
										p={8}>
										<Stack spacing={4}>
											<SimpleGrid columns={2} spacing={2}>
												<Box>
													<FormControl onChange={formik.handleChange} id="title" isRequired>
														<FormLabel>Titulo</FormLabel>
														<Input type="text" />
													</FormControl>
												</Box>
											</SimpleGrid>
											<Stack spacing={10} pt={2}>
												<Button
													loadingText="Submitting"
													size="lg"
													bg={'blue.400'}
													color={'white'}
													_hover={{
														bg: 'blue.500',
													}}
													type="submit">
													Enviar
												</Button>
											</Stack>
										</Stack>
									</Box>
								</Stack>
							</Flex>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default Forum;
