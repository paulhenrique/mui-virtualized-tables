import { useRef, useEffect } from "react";
import { ListChildComponentProps } from "react-window";

export interface RowProps extends Omit<ListChildComponentProps, "style"> {
  setSize: (index: number, size: number) => void;
  windowWidth: number;
}

export const Row = ({ data, index, setSize, windowWidth }: RowProps) => {
  const rowRef = useRef<any>();

  useEffect(() => {
    setSize(index, rowRef?.current?.getBoundingClientRect()?.height);
  }, [setSize, index, windowWidth]);

  return <div ref={rowRef}>{data[index]}</div>;
};
