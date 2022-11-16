import MuiVirtualizedList from ".";
import randomSentence from "random-sentence";
import { Button } from "@material-ui/core";

export default {
  title: "Components/MuiVirtualizedList",
  component: MuiVirtualizedList,
};

export const BasicComponents = () => {
  const data = new Array(100).fill(true).map(() => ({
    id: randomSentence(),
    name: randomSentence(),
    btn: <button onClick={() => alert("Hello World")}>test</button>,
  }));

  return (
    <MuiVirtualizedList
      columns={[
        {
          id: "id",
          label: "ID",
        },
        {
          id: "btn",
          label: "btn",
        },
        {
          id: "name",
          label: "Name",
        },
      ]}
      TableProps={{
        Root: {
          style: {
            width: "100%",
          },
        },
        Head: {
          TableRowProps: {
            style: {
              display: "flex",
            },
          },
        },
        Row: {
          style: {
            display: "flex",
          },
        },
        Cell: {
          style: {
            flex: "1",
          },
        },
      }}
      VirtualizedListProps={{
        height: 300,
        width: "100%",
        itemCount: data.length,
        data: data,
      }}
    />
  );
};

export const MuiComponents = () => {
  const data = new Array(100).fill(true).map(() => ({
    id: randomSentence(),
    name: randomSentence(),
    btn: (
      <Button variant="contained" onClick={() => alert("Hello World")}>
        test
      </Button>
    ),
  }));

  return (
    <MuiVirtualizedList
      columns={[
        {
          id: "id",
          label: "ID",
        },
        {
          id: "btn",
          label: "btn",
        },
        {
          id: "name",
          label: "Name",
        },
      ]}
      TableProps={{
        Root: {
          style: {
            width: "100%",
          },
        },
        Head: {
          TableRowProps: {
            style: {
              display: "flex",
            },
          },
        },
        Row: {
          style: {
            display: "flex",
          },
        },
        Cell: {
          style: {
            flex: "1",
          },
        },
      }}
      VirtualizedListProps={{
        height: 300,
        width: "100%",
        itemCount: data.length,
        data: data,
      }}
    />
  );
};
