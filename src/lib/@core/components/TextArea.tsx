import { Button, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { AuthContext } from "../contexts/AuthContext";
import { forumService } from "../services/forum.service";

const TextAreaElement = ({
  setTopicComments,
  id,
}: {
    setTopicComments: any;
  id: number;
}) => {
  let [value, setValue] = React.useState("");
  const { user, isVolunteer } = React.useContext(AuthContext);

  let handleInputChange = (e: any) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let type = "";

    isVolunteer(user) ? (type = "volunteer") : (type = "user");

    const comment = {
      [type]: user?.id,
      content: value,
      creationDate: new Date().toDateString(),
    };
    // console.log(
    //   "🚀 ~ file: TextArea.tsx ~ line 31 ~ handleSubmit ~ comment",
    //   comment
    // );

    await forumService.createTopicComment(setTopicComments, comment, id);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text mb="8px">Escribe tu respuesta</Text>
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder="Aqui tu comentario"
        size="md"
      />
      <Button mt={4} colorScheme="teal" type="submit">
        Publicar
      </Button>
    </form>
  );
};

export default TextAreaElement;
