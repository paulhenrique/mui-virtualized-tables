import { VirtualizedList } from ".";
import randomSentence from "random-sentence";

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
