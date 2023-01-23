import React from "react";
import { selectAllUsers } from "../redux/features/users/userSlice.js";
import { useSelector } from "react-redux";
import { Text } from "@chakra-ui/react";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  // console.log(users);

  const author = users.find((user) => user.id === userId);
  return (
    <Text color="gray.500">By {author ? author.name : "Unknown author"}</Text>
  );
};

export default PostAuthor;
