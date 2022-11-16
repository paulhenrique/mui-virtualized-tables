import {
  ComponentType,
  Fragment,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { ListProps, VariableSizeList as List } from "react-window";
import { useWindowResize } from "./hooks/useWindowResize";
import { Row, RowProps } from "./components/Row";

export type dataRowsType<T> = T;

export interface VirtualizedListProps extends Omit<ListProps, "children"> {
  data: dataRowsType<any[]>;
  component?: ComponentType<any> | string;

  rowProps?: Pick<RowProps, "component">;
}

export function VirtualizedList(props: VirtualizedListProps) {
  const { data, rowProps = {} } = props;
  const listRef = useRef<any>();

  const EnvComponent = props.component || "div";

  const sizeMap = useRef({} as { [key: string]: number });
  const setSize = useCallback((index: number, size: number): void => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current.resetAfterIndex(index);
  }, []);
  const getSize = (index: number): number => {
    console.table(sizeMap?.current);
    return sizeMap?.current[index] || 50;
  };
  const [windowWidth] = useWindowResize();

  return (
    <List
      outerElementType={EnvComponent}
      innerElementType={Fragment}
      ref={listRef}
      itemSize={getSize}
      itemData={data}
      {...props}
    >
      {({ data, index, style }) => (
        <Row
          data={data}
          index={index}
          setSize={setSize}
          windowWidth={windowWidth}
          style={style}
          {...rowProps}
        />
      )}
    </List>
  );
}

export default VirtualizedList;
