import { Center, Container } from "@chakra-ui/react";
import "./App.css";
import AddPostForm from "./components/AddPostForm.jsx";
import PostList from "./components/PostList";

function App() {
  return (
    <Center>
      <Container mt="2rem">
        <AddPostForm />
        <PostList />
      </Container>
    </Center>
  );
}

export default App;
