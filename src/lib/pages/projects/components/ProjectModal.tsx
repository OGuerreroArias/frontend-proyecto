import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
	Modal,
	useDisclosure,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalHeader,
	ModalBody,
	SimpleGrid
} from '@chakra-ui/react';
import { AddIcon, } from '@chakra-ui/icons';
import { useContext } from 'react';
import { AuthContext } from 'lib/@core/contexts/AuthContext';
import {useFormik} from "formik"
import { projectService } from "lib/@core/services/project.service";

export default function ProjectModal({setProjects}: any) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {user,isVolunteer} = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			creationDate: new Date().toISOString(),
			description: '',
			functions: '',
			lat: 0,
			lng: 0,
			location: '',
			mission: '',
			name: '',
			ong_id: user.id,
			photo_urls: '',
			requirements: '',
		},
		onSubmit: values => {
			projectService.create(values).then((res) => {
				console.log(res);
				setProjects(res)
			})
		}
	});


	return (
		<>
			{
				!isVolunteer(user) && (
					<Box display={"flex"} justifyContent={"flex-end"} p={4}>
				<Button
					variant={"solid"}
					colorScheme={"teal"}
					size={"sm"}
					onClick={onOpen}
					leftIcon={<AddIcon />}
				>
				</Button>
			</Box>
				)
			}
			<Modal onClose={onClose} isOpen={isOpen} isCentered size={"2xl"}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Heading as="h3" size="lg" fontWeight="bold">
							New Project</Heading>
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
													<FormControl onChange={formik.handleChange} id="name" isRequired>
														<FormLabel>Name</FormLabel>
														<Input type="text" />
													</FormControl>
												</Box>
												<Box>
													<FormControl onChange={formik.handleChange} id="description">
														<FormLabel>Descripcion</FormLabel>
														<Input type="text" />
													</FormControl>
												</Box>
												<Box>
													<FormControl onChange={formik.handleChange} id="location">
														<FormLabel>Locación</FormLabel>
														<Input type="text" />
													</FormControl>
												</Box>
												<Box>
													<FormControl onChange={formik.handleChange} id="mission">
														<FormLabel>Mision</FormLabel>
														<Input type="text" />
													</FormControl>
												</Box>
												<Box>
													<FormControl onChange={formik.handleChange} id="requirements">
														<FormLabel>Requerimiento</FormLabel>
														<Input type="text" />
													</FormControl>
												</Box>
												<Box>
													<FormControl onChange={formik.handleChange} id="functions">
														<FormLabel>Funciones</FormLabel>
														<Input type="text" />
													</FormControl>
												</Box>
												<Box>
													<FormControl onChange={formik.handleChange} id="photo_urls">
														<FormLabel>Photo URL</FormLabel>
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