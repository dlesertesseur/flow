import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const LinkPage = ({ title, path }) => {
  const navigate = useNavigate();

  return (
    <Button
      key={path}
      onClick={() => {
        navigate(path);
      }}
    >
      <Text>{title}</Text>
    </Button>
  );
};

export default LinkPage;
