import { Route, Routes } from "react-router-dom";
import { Group, Stack, Title } from "@mantine/core";
import About from "./About";
import LinkPage from "./LinkPage";
import Page from "./Page";

// eslint-disable-next-line react/prop-types
const Home = () => {
  return (
    <Stack w={"100%"} align="center">
      <Group position="center" spacing={"xs"}>
        <Title>HOME</Title>
      </Group>
      <Group position="left">
        <LinkPage title="About" path="about" />
      </Group>

      <Routes>
        <Route path={"/"} element={<Page color={"red"} title={"INFO"} back />} />
        <Route path={"about/*"} element={<About />} />
      </Routes>
    </Stack>
  );
};

export default Home;
