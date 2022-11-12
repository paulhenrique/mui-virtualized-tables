import { useCallback, useMemo, useRef } from "react";
import { ListProps, VariableSizeList as List } from "react-window";
import { useWindowResize } from "./hooks/useWindowResize";
import { Row } from "./components/Row";

export type dataRowsType<T> = T;

export interface VirtualizedListProps extends Omit<ListProps, "children"> {
  data: dataRowsType<any[]>;
}

export function VirtualizedList(props: VirtualizedListProps) {
  const { data } = props;
  const listRef = useRef<any>();

  const sizeMap = useRef({} as { [key: string]: number });
  const setSize = useCallback((index: number, size: number): void => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current.resetAfterIndex(index);
  }, []);
  const getSize = (index: number): number => sizeMap?.current[index] || 50;
  const [windowWidth] = useWindowResize();

  return (
    <List ref={listRef} itemSize={getSize} itemData={data} {...props}>
      {({ data, index, style }) => (
        <div style={style}>
          <Row
            data={data}
            index={index}
            setSize={setSize}
            windowWidth={windowWidth}
          />
        </div>
      )}
    </List>
  );
}

export default VirtualizedList;
