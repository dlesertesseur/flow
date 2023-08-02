import { Dialog, Group, Button, TextInput, Text, Center } from "@mantine/core";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const UpdateNodo = ({ node, open, setOpen, updateNodeMetadata }) => {
  
    // eslint-disable-next-line react/prop-types
  const [label, setLabel] = useState(node.data.label);

  return (
    <Center>
      <Dialog opened={open} withCloseButton onClose={() => setOpen(false)} size="lg" radius="md">
        <Text size="sm" mb="xs" weight={500}>
          Nombre
        </Text>

        <Group align="flex-end">
          <TextInput sx={{ flex: 1 }} value={label} onChange={(event) => setLabel(event.currentTarget.value)}/>
          <Button onClick={() => {
            setOpen(false);
            // eslint-disable-next-line react/prop-types
            updateNodeMetadata(node.id, label);
            }}>Aceptar</Button>
        </Group>
      </Dialog>
    </Center>
  );
};

export { UpdateNodo };
