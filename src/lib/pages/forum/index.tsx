import { TimeIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Heading, Icon, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { forumService, ITopicCard } from "lib/@core/services/forum.service";
import {useEffect,useState} from "react"


const Forum = () => {
  const [topics, setTopics] = useState<ITopicCard[]>([]);

  const getAllTopics = async() => {
    await forumService.getAllTopicCards().then((topics) => {
      console.log("🚀 ~ file: index.tsx ~ line 13 ~ awaitforumService.getAllTopicCards ~ topics", topics)
      setTopics(topics)
    });
  }

  useEffect( () => {
    getAllTopics();
  }, [topics]);


  return (
    <Box maxW={"1100px"} m={"auto"} h={"100vh"} bg={"blackAlpha.50"}>
      <Box p={8}>
        <Flex gap={4}>
          <Button colorScheme={"teal"}>Crear publicacion</Button>
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
            {topics.map((topic: ITopicCard) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
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

export default Forum;
