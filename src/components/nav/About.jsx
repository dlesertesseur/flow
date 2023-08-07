import { Route, Routes } from "react-router-dom";
import { Group, Stack, Title } from "@mantine/core";
import Page from "./Page";
import LinkPage from "./LinkPage";

// eslint-disable-next-line react/prop-types
const About = () => {
  return (
    <Stack w={"100%"} align="center">
      <Group position="center" spacing={"xs"}>
        <Title>ABOUT</Title>
      </Group>
      <Group position="left">
        <LinkPage title="UNO" path="uno" />
        <LinkPage title="DOS" path="dos" />
        <LinkPage title="TRES" path="tres" />
        <LinkPage title="BACK" path="../" />
      </Group>

      <Routes>
        <Route index path={"uno"} element={<Page color={"grey"} title={"ABOUT/UNO"} back />} />
        <Route path={"dos"} element={<Page color={"pink"} title={"ABOUT/DOS"} back />} />
        <Route path={"tres"} element={<Page color={"white"} title={"ABOUT/TRES"} back />} />
      </Routes>
    </Stack>
  );
};

export default About;
