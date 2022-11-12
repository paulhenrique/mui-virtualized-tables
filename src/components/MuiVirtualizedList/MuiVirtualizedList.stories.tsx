import MuiVirtualizedList from ".";
import randomSentence from "random-sentence";

export default {
  title: "Components/MuiVirtualizedList",
  component: MuiVirtualizedList,
};

export const Primary = () => {
  const data = new Array(100).fill(true).map(() => ({
    id: randomSentence(),
    name: randomSentence(),
  }));

  return (
    <MuiVirtualizedList
      columns={[
        {
          id: "id",
          label: "ID",
          tableCellProps: {
            width: "300px",
            style: {
              maxWidth: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          },
        },
        {
          id: "name",
          label: "Name",
          tableCellProps: {
            width: "300px",
            style: {
              maxWidth: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          },
        },
      ]}
      VirtualizedListProps={{
        height: 300,
        width: "100%",
        itemCount: data.length,
        data: data,
      }}
    />
  );
};
