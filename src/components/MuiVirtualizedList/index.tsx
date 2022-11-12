import {
  makeStyles,
  Table,
  TableBody,
  TableBodyProps,
  TableCell,
  TableCellProps,
  TableHead,
  TableHeadProps,
  TableProps,
  TableRow,
  TableRowProps,
} from "@material-ui/core";
import VirtualizedList, { VirtualizedListProps } from "../VirtualizedList";

export interface MuiVirtualizedListColumns {
  id: string;
  label: string;
  tableCellProps?: TableCellProps;
}

export interface MuiVirtualizedListProps {
  VirtualizedListProps: VirtualizedListProps;
  TableProps?: {
    Root?: TableProps;
    Head?: TableHeadProps;
    Body?: TableBodyProps;
    Row?: TableRowProps;
  };
  columns: MuiVirtualizedListColumns[];
}

const turnDataRowIntoTableRowStyle =
  (cols: MuiVirtualizedListColumns[]) => (dataRow: any) => {
    // se não vier um array no columns, estourará erro
    if (!Array.isArray(cols)) {
      throw new Error("columns must be an array");
    }

    return (
      <TableRow>
        {cols?.map((col) => (
          <TableCell {...col.tableCellProps}>{dataRow[col.id]}</TableCell>
        ))}
      </TableRow>
    );
  };

export interface TableHeadRenderProps {
  columns: MuiVirtualizedListColumns[];
}
const TableHeadRender = ({ columns }: TableHeadRenderProps) => {
  return (
    <TableHead>
      <TableRow>
        {columns?.map((col) => (
          <TableCell {...col.tableCellProps}>{col.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const useTableStyles = makeStyles({
  table: {
    display: "flex",
    flexDirection: "column",
  },
  tableBody: {},
});

export const MuiVirtualizedList = (props: MuiVirtualizedListProps) => {
  const classes = useTableStyles();
  const { VirtualizedListProps, columns } = props;
  const TableBodyWithStyleParameters = (props: TableBodyProps) => (
    <TableBody {...props} style={{ display: "flex", ...props.style }} />
  );
  return (
    <Table className={classes.table}>
      <TableHeadRender columns={columns} />
      <VirtualizedList
        component={TableBodyWithStyleParameters}
        {...VirtualizedListProps}
        rowProps={{
          component: TableRow,
        }}
        itemCount={VirtualizedListProps.data.length}
        data={VirtualizedListProps.data.map(
          turnDataRowIntoTableRowStyle(columns)
        )}
      />
    </Table>
  );
};

export default MuiVirtualizedList;
