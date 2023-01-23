import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../redux/features/users/userSlice.js";
import { addNewPost } from "../redux/thunk/posts/postsThunk.js";
const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = React.useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        dispatch(addNewPost({ title, body: content, userId }));
        setTitle("");
        setContent("");
        setUserId("");
      } catch (error) {
        console.error("Error saving the post: ", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <Box>
      <Heading>Add New Post</Heading>
      <VStack spacing="1rem">
        <FormControl>
          <FormLabel htmlFor="postTitle">Title:</FormLabel>
          <Input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="postContent">Content:</FormLabel>
          <Textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </FormControl>
        <Select
          placeholder="Select Author"
          value={userId}
          onChange={onAuthorChanged}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </Select>
        <Button
          type="button"
          width="full"
          colorScheme="whatsapp"
          onClick={onSavePostClicked}
          mt="1rem"
          isDisabled={!canSave}
        >
          Save Post
        </Button>
      </VStack>
    </Box>
  );
};

export default AddPostForm;
