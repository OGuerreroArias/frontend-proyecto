import {
	Grid,
	Box,
	Heading,
	Link,
	Image,
	Text,
	Divider,
	HStack,
	Tag,
	Wrap,
	WrapItem,
	SpaceProps,
	useColorModeValue,
	Container,
	VStack,
} from "@chakra-ui/react";

interface IBlogTags {
	tags: Array<string>;
	marginTop?: SpaceProps["marginTop"];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
	return (
		<HStack spacing={2} marginTop={props.marginTop}>
			{props.tags.map((tag) => {
				return (
					<Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
						{tag}
					</Tag>
				);
			})}
		</HStack>
	);
};

interface BlogAuthorProps {
	date: Date;
	name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
	return (
		<HStack marginTop="2" spacing="2" display="flex" alignItems="center">
			<Image
				borderRadius="full"
				boxSize="40px"
				src="https://100k-faces.glitch.me/random-image"
				alt={`Avatar of ${props.name}`}
			/>
			<Text fontWeight="medium">{props.name}</Text>
			<Text>—</Text>
			<Text>{props.date.toLocaleDateString()}</Text>
		</HStack>
	);
};

const Blog = () => {
	return (
		<Container maxW={"7xl"} p="12">
			<Heading as="h1">Sobre Nosotros</Heading>
			<VStack paddingTop="40px" spacing="2" alignItems="flex-start">

				<Heading as="h2">Mision</Heading>
				<Text as="p" fontSize="lg">
					Ser el servicio que facilite la gestión de reclutamiento para las ONG y permita a las personas voluntarias obtener más participación en eventos ambientales para el Perú en un año.
				</Text>
				<Heading as="h2">Vision</Heading>
				<Text as="p" fontSize="lg">
					Convertirnos en el mejor servicio de para las ONG y voluntarios con la mejor confianza del mercado latinoamericano en los próximos tres años.
				</Text>
			</VStack>
			<Box
				marginTop={{ base: "1", sm: "5" }}
				display="flex"
				flexDirection={{ base: "column", sm: "row" }}
				justifyContent="space-between"
			>
				<Box
					display="flex"
					flex="1"
					marginRight="3"
					position="relative"
					alignItems="center"
				>
					<Box
						width={{ base: "100%", sm: "85%" }}
						zIndex="2"
						marginLeft={{ base: "0", sm: "5%" }}
						marginTop="5%"
					>
						<Link textDecoration="none" _hover={{ textDecoration: "none" }}>
							<Image
								borderRadius="lg"
								src={
									"https://portal.andina.pe/EDPfotografia3/Thumbnail/2019/02/24/000566405W.jpg"
								}
								alt="some good alt text"
								objectFit="contain"
							/>
						</Link>
					</Box>
					<Box zIndex="1" width="100%" position="absolute" height="100%">
						<Box
							bgGradient={useColorModeValue(
								"radial(orange.600 1px, transparent 1px)",
								"radial(orange.300 1px, transparent 1px)"
							)}
							backgroundSize="20px 20px"
							opacity="0.4"
							height="100%"
						/>
					</Box>
				</Box>
				<Box
					display="flex"
					flex="1"
					flexDirection="column"
					justifyContent="center"
					marginTop={{ base: "3", sm: "0" }}
				>
					<BlogTags tags={["Ocean", "Planet"]} />
					<Heading marginTop="1">
						<Link textDecoration="none" _hover={{ textDecoration: "none" }}>
							Liempieza de Playas
						</Link>
					</Heading>
					<Text
						as="p"
						marginTop="2"
						color={useColorModeValue("gray.700", "gray.200")}
						fontSize="lg"
					>
						Limpiar playas no es la solución a la contaminación plástica. Sin embargo, ver por cuenta propia esta realidad y recoger basura de la arena o del fondo del mar es impactante. Y lo es aún más cuando reconoces productos que consumes con frecuencia o que has probado alguna vez. Con HAZla por tu Playa buscamos generar una respuesta emocional que impulse una serie de acciones conscientes y motiven cambios en nuestros hábitos de consumo
					</Text>
					<BlogAuthor name="John Doe" date={new Date("2021-04-06T19:01:27Z")} />
				</Box>
			</Box>
			<Heading as="h2" marginTop="5">
				Latest articles
			</Heading>
			<Divider marginTop="5" />
			<Grid templateColumns="repeat(3, 1fr)" gap={6}>
				<ArticlePost title={"Cuida areas verdes"} content={"Las Soluciones Basadas en la Naturaleza (SbN) son un concepto amplio y todavía desconocido para muchos actores en cooperación. La imprecisión de su definición y la “clasificación” como SbN de malas prácticas (entre ellas algunas de greenwashing) han hecho que se generen muchas dudas sobre su efectividad. Es importante por tanto seguir estableciendo definiciones acotadas y principios de implementación claros."} src={"https://www.parqueygrama.com/wp-content/uploads/2018/06/cuidar-las-zonas-verdes-y-parques.jpg"} />
				<ArticlePost title={"Planta Arboles "} content={"Los ecosistemas forestales tienen la capacidad de disminuir el efecto invernadero a través de dos procesos relacionados al ciclo del carbono, la fijación o captura de carbono y la reducción de emisiones debidas a la deforestación y degradación forestal."} src={"https://s3-us-west-2.amazonaws.com/cdn01.pucp.education/climadecambios/wp-content/uploads/2020/06/04224953/webclimaDMMA.jpg"} />
				<ArticlePost title={"Recicla la basura"} content={"La recolección y el procesamiento de desechos de papel y cartón, vidrio o plástico supone crear nuevos productos basados en esos mismos materiales. Una nueva oportunidad para la Tierra, a la que se puede proteger si se entienden los beneficios del reciclaje, la manera correcta separar los residuos y los retos a los que se enfrenta esta actividad en los próximos años."} src={"https://encolombia.com/wp-content/uploads/2018/01/Fomentar-Reciclaje.png"} />
			</Grid>
		</Container>
	);
};

const ArticlePost = ({ title, content, src }: any) => {
	return (
		<Box w="100%">
			<Box borderRadius="lg" overflow="hidden">
				<Link textDecoration="none" _hover={{ textDecoration: "none" }}>
					<Image
						transform="scale(1.0)"
						src={
							src
						}
						alt="some text"
						objectFit="contain"
						width="100%"
						transition="0.3s ease-in-out"
						_hover={{
							transform: "scale(1.05)",
						}}
					/>
				</Link>
			</Box>
			<BlogTags tags={["Save", "Green", "Planet"]} marginTop="3" />
			<Heading fontSize="xl" marginTop="2">
				<Link textDecoration="none" _hover={{ textDecoration: "none" }}>
					{title}
				</Link>
			</Heading>
			<Text as="p" fontSize="md" marginTop="2">
				{content}
			</Text>
			<BlogAuthor
				name="John Doe"
				date={new Date("2021-04-06T19:01:27Z")}
			/>

		</Box>
	)
}

export default Blog;
