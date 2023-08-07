import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Group, Stack, Title } from "@mantine/core";
import { useWindowSize } from "../../assets/hook";
import Home from "./Home";
import Page from "./Page";
import LinkPage from "./LinkPage";

const Nav = () => {
  const wSize = useWindowSize();
  return (
    <Stack spacing={"xs"} w={wSize.width}>
      <BrowserRouter>
        <Group position="center" spacing={"xs"}>
          <Title>{"HEADER APP"}</Title>
        </Group>
        <Group position="left">
          <LinkPage title="Register" path="register" />
          <LinkPage title="Login" path="login" />
        </Group>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path={"register"} element={<Page color={"white"} title={"Register"} back />} />
          <Route path={"login"} element={<Page color={"white"} title={"Login"} back />} />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
};

export default Nav;
