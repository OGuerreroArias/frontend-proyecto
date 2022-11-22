import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import TextAreaElement from "lib/@core/components/TextArea";
import {
  forumService,
  IOng,
  ITopicCard,
  ITopicComment,
  IVolunteer,
} from "lib/@core/services/forum.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TopicRoom = () => {
  const { id } = useParams<{ id: string }>();

  const [topic, setTopic] = useState<ITopicCard | undefined>({} as any);
  const [topicComments, setTopicComments] = useState<
    ITopicComment[] | undefined
  >([] as any);

  const getTopicCard = async() => {
      const response = await forumService.getTopicCard(id as string)
      console.log("🚀 ~ file: index.tsx ~ line 25 ~ getTopicCard ~ response", response)
      setTopic(response)
      setTopicComments(response.comments)
  }

  useEffect(() => {
    getTopicCard();
  }, []);

  return (
    <Box maxW={"1100px"} m={"auto"}>
      <Box minH={"80vh"} bg={"blackAlpha.50"} p={8}>
        <Heading as="h2" size="lg" color={"blackAlpha.700"}>
          {topic?.title}
        </Heading>
        <Box mt={8}>
          <Flex gap={6} p={3} bg={"blackAlpha.200"} direction="column">
            {Array.isArray(topicComments) &&
              topicComments?.map((comment: ITopicComment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
          </Flex>
        </Box>
      </Box>
      <Box minH={"20vh"}>
        <TextAreaElement id={Number(id)} setTopicComments={setTopicComments} />
      </Box>
    </Box>
  );
};

const whoIsNull = (comment: ITopicComment): string => {
  return comment.ongAuthor === null ? "voluntario" : "ong";
};

const Comment = ({ comment }: { comment: ITopicComment }) => {
  const whoIs = whoIsNull(comment);
  // console.log("🚀 ~ file: index.tsx ~ line 60 ~ Comment ~ whoIs", whoIs);

  return whoIs === "voluntario" ? (
    <Volunteer comment={comment} />
  ) : (
    <Ong comment={comment} />
  );
};

const Ong = ({ comment }: { comment: ITopicComment }) => {
  const ongData = comment.ongAuthor as IOng;

  return (
    <Flex bg={"white"} p={6} gap={8}>
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <Box>
        <Flex mb={2} justifyContent="space-between">
          <Heading id="author" as="h3" size="md" color={"blackAlpha.600"}>
            {ongData?.name}
          </Heading>
          <Text>{comment?.creationDate}</Text>
          {/* <Text as="p"></Text> */}
        </Flex>
        <Box color={"blackAlpha.600"}>{comment?.content}</Box>
      </Box>
    </Flex>
  );
};

const Volunteer = ({ comment }: { comment: ITopicComment }) => {
  const volunteerData = comment.volunteerAuthor as IVolunteer;

  return (
    <Flex bg={"white"} p={6} gap={8}>
      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <Box>
        <Flex mb={2} justifyContent="space-between">
          <Heading id="author" as="h3" size="md" color={"blackAlpha.600"}>
            {volunteerData.name} {volunteerData.lastName}
          </Heading>
          <Text>{comment.creationDate}</Text>
          {/* <Text as="p"></Text> */}
        </Flex>
        <Box color={"blackAlpha.600"}>{comment.content}</Box>
      </Box>
    </Flex>
  );
};

export default TopicRoom;
