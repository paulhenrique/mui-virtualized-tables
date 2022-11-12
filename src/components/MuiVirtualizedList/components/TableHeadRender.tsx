import {
  TableHead,
  TableRow,
  TableCell,
  TableHeadProps,
  TableRowProps,
  TableCellProps,
} from "@material-ui/core";
import { MuiVirtualizedListColumns } from "..";

export interface TableHeadRenderProps extends TableHeadProps {
  columns: MuiVirtualizedListColumns[];
  TableRowProps?: TableRowProps;
  TableCellProps?: TableCellProps;
}

export const TableHeadRender = ({
  columns,
  TableRowProps = {},
  TableCellProps = {},
  ...props
}: TableHeadRenderProps) => {
  return (
    <TableHead {...props}>
      <TableRow {...TableRowProps}>
        {columns?.map((col) => (
          <TableCell {...TableCellProps} {...col.tableCellProps}>
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
