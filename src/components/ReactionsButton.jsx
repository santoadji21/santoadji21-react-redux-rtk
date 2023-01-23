import React from "react";
import { useDispatch } from "react-redux";
import { reactionsAdded } from "../redux/features/posts/postSlice.js";

import { Text, HStack, IconButton } from "@chakra-ui/react";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionsButton = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <HStack key={name}>
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "white",
            },
            padding: 0,
          }}
          variant="ghost"
          type="button"
          className="reactionButton"
          leftIcon={emoji}
          onClick={() =>
            dispatch(reactionsAdded({ postId: post.id, reaction: name }))
          }
        />
        <Text fontWeight="medium">{post.reactions[name]}</Text>
      </HStack>
    );
  });

  return <HStack>{reactionButtons}</HStack>;
};

export default ReactionsButton;
