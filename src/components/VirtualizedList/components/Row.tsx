import { useRef, useEffect, ComponentType } from "react";
import { ListChildComponentProps } from "react-window";

export interface RowProps extends Omit<ListChildComponentProps, "style"> {
  setSize: (index: number, size: number) => void;
  windowWidth: number;
  component?: ComponentType<any>;
  style?: React.CSSProperties;
}

export const Row = ({
  data,
  index,
  setSize,
  windowWidth,
  style,
  ...props
}: RowProps) => {
  const rowRef = useRef<any>();
  const EnvComponent = props.component || "div";

  useEffect(() => {
    setSize(index, rowRef?.current?.getBoundingClientRect()?.height);
  }, [setSize, index, windowWidth, rowRef]);

  const { height: _h, ...restStyle } = style || {};

  return (
    <EnvComponent style={restStyle} ref={rowRef}>
      {data[index]}
    </EnvComponent>
  );
};
