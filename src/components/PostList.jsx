import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostStatus,
  getPostError,
} from "../redux/features/posts/postSlice.js";
import { fetchPosts } from "../redux/thunk/posts/postsThunk.js";
import {
  Box,
  HStack,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import PostAuthor from "./PostAuthor.jsx";
import ReactionsButton from "./ReactionsButton.jsx";

const PostList = () => {
  const dispatch = useDispatch();
  const post = useSelector(selectAllPosts);
  // console.log(post);
  const orderedPosts = post
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const postStatus = useSelector(getPostStatus);
  const postError = useSelector(getPostError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
    // dispatch(fetchPosts());
  }, [postStatus, dispatch]);

  const renderPost = orderedPosts.slice(0, 10).map((post, index) => {
    return (
      <Box
        border="1px"
        borderRadius="0.5rem"
        width="100%"
        borderColor="whatsapp.100"
        key={post.id}
        p="1rem"
      >
        <Text fontSize="xl" noOfLines={2}>
          {post.title}
        </Text>
        <HStack>
          <PostAuthor userId={post.userId} />
          <Text color="gray.400">{post.date}</Text>
        </HStack>
        <Text noOfLines={2}>{post.body}</Text>

        <ReactionsButton post={post} />
      </Box>
    );
  });

  const renderLoading = Array.apply(null, Array(10)).map((index) => {
    return (
      <Box
        borderRadius="0.5rem"
        width="100%"
        boxShadow="lg"
        bg="white"
        key={index}
        p="1rem"
      >
        <Stack>
          <SkeletonText noOfLines={1} skeletonHeight="4" />
          <Stack direction="row" alignItems="center">
            <Skeleton height="15px" flex={0.5} />
            <Skeleton height="10px" flex={0.5} />
          </Stack>

          <SkeletonText noOfLines={2} spacing="3" />
          <SkeletonText noOfLines={1} skeletonHeight="8" />
        </Stack>
      </Box>
    );
  });

  return (
    <Box mt="2rem">
      <Heading>Posts</Heading>

      <VStack>
        {postStatus === "loading" ? (
          renderLoading
        ) : postStatus === "succeeded" ? (
          renderPost
        ) : (
          <Text>Error</Text>
        )}
      </VStack>
    </Box>
  );
};

export default PostList;
