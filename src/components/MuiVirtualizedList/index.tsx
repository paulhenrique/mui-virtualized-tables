import {
  Table,
  TableBody,
  TableBodyProps,
  TableCellProps,
  TableProps,
  TableRow,
  TableRowProps,
} from "@material-ui/core";
import clsx from "clsx";
import VirtualizedList, { VirtualizedListProps } from "../VirtualizedList";
import {
  TableHeadRender,
  TableHeadRenderProps,
} from "./components/TableHeadRender";
import { turnDataRowIntoTableRowStyle } from "./helpers/turnDataRowIntoTableRowStyle";
import { useTableStyles } from "./hooks/useTableStyles";

export interface MuiVirtualizedListColumns {
  id: string;
  label: string;
  tableCellProps?: TableCellProps;
}

export interface MuiVirtualizedListProps {
  VirtualizedListProps: VirtualizedListProps;
  TableProps?: {
    Root?: TableProps;
    Head?: Omit<TableHeadRenderProps, "columns">;
    Body?: TableBodyProps;
    Row?: TableRowProps;
    Cell?: TableCellProps;
  };
  columns: MuiVirtualizedListColumns[];
}

interface Props<T> {
  a: T;
}

export const MuiVirtualizedList = (props: MuiVirtualizedListProps) => {
  const classes = useTableStyles();
  const { VirtualizedListProps, columns, TableProps = {} } = props;
  const { Root = {}, Head = {}, Body = {}, Cell = {}, Row = {} } = TableProps;

  const TableBodyWithStyleParameters = (props: TableBodyProps) => (
    <TableBody
      {...props}
      {...Body}
      className={clsx(classes.tableBody, props.className)}
    />
  );

  return (
    <Table className={classes.table} {...Root}>
      <TableHeadRender columns={columns} {...Head} TableCellProps={Cell} />
      <VirtualizedList
        component={TableBodyWithStyleParameters}
        {...VirtualizedListProps}
        rowProps={{
          component: TableRow,
        }}
        itemCount={VirtualizedListProps.data.length}
        data={VirtualizedListProps.data.map(
          turnDataRowIntoTableRowStyle(columns, Cell, Row)
        )}
      />
    </Table>
  );
};

export default MuiVirtualizedList;
