import { VirtualizedList } from ".";
import randomSentence from "random-sentence";
import { Box, Paper, TextField, Typography } from "@material-ui/core";
import { useMemo, useState } from "react";

export default {
  title: "Components/VirtualizedReactTable",
  component: VirtualizedList,
};

export const Primary = () => {
  const data = new Array(100).fill(true).map(() => randomSentence());
  return (
    <VirtualizedList
      height={300}
      width="100%"
      itemCount={data.length}
      data={data}
    />
  );
};

export const RenderingJSXElements = () => {
  const data = new Array(100)
    .fill(true)
    .map(() => [
      <h1>{randomSentence()}</h1>,
      <img src="https://picsum.photos/200/300" />,
    ]);
  return (
    <VirtualizedList
      height={300}
      width="100%"
      itemCount={data.length}
      data={data}
    />
  );
};

export const RenderingMuiBoxAsList = () => {
  const data = new Array(100).fill(true).map((_e: boolean, i: number) => (
    <Box display="flex" justifyContent="space-between">
      <Typography>Left data</Typography>
      <Typography>{i}</Typography>
      <Typography>Right data</Typography>
    </Box>
  ));
  return (
    <VirtualizedList
      height={300}
      width="100%"
      itemCount={data.length}
      data={data}
    />
  );
};

export const RenderingArticles = () => {
  const data = new Array(100).fill(true).map((_e: boolean, i: number) => (
    <Box p={2} width="100%">
      <Paper>
        <Box display="flex" width="100%" flex="1">
          <img src="https://picsum.photos/200/300" />
          <Box p={2}>
            <Typography variant="h1">Article {i}</Typography>
            <Box maxWidth="300px">
              <Typography>{randomSentence({ min: 690, max: 750 })}</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  ));

  return (
    <VirtualizedList
      height={700}
      width="100%"
      itemCount={data.length}
      data={data}
    />
  );
};

const Elem = (_data: any, _onChange: any) => (
  <Box p={2} width="100%">
    <Box p={2}>
      <TextField
        fullWidth
        label="Field "
        defaultValue={_data}
        onChange={({ target: { value } }) => _onChange(value)}
      />
    </Box>
  </Box>
);

export const RenderingTextFields = () => {
  const [data] = useState(new Array(5).fill(true));
  const [updatedDataValues, setUpdatedDataValues] = useState(data);

  const updateDataByIndex = (index: number, value: string) => {
    const newData = [...updatedDataValues];
    newData[index] = value;
    setUpdatedDataValues(newData);
  };

  const translateDataToComponentsForm = (_e: any, i: number) =>
    Elem(data[i], (value: string) => updateDataByIndex(i, value));

  const translatedDataToComponentsForm = data.map(
    translateDataToComponentsForm
  );

  const MemoisedVirtualizedList = useMemo(
    () => (
      <VirtualizedList
        height={700}
        width="100%"
        itemCount={data.length}
        data={translatedDataToComponentsForm}
      />
    ),
    [data]
  );

  return [
    <pre>
      <code>{JSON.stringify({ data, updatedDataValues }, null, 2)}</code>
    </pre>,
    MemoisedVirtualizedList,
  ];
};
