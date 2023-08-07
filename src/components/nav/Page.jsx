import { Button, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { useWindowSize } from "../../assets/hook";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Page = ({ color = "blue", title, actions, back }) => {
  const wSize = useWindowSize();
  const navigate = useNavigate();
  // eslint-disable-next-line react/prop-types
  const links = actions?.map((a) => {
    const ret = (
      <Button
        key={a.path}
        onClick={() => {
          navigate(a.path);
        }}
      >
        <Text>{a.title}</Text>
      </Button>
    );
    return ret;
  });

  return (
    <Stack justify="flex-start" bg={color} w={wSize.width} spacing={"xs"}>
      <Group position="center" spacing={"xs"}>
        <Title>{title}</Title>
      </Group>
      <Divider />
      <Group position="apart" px={"xs"}>
        <Group position="left">{links}</Group>

        {back ? (
          <Group position="left">
            <Button
              onClick={() => {
                navigate("../");
              }}
            >
              <Text>{"BACK"}</Text>
            </Button>
          </Group>
        ) : null}
      </Group>
    </Stack>
  );
};

export default Page;
