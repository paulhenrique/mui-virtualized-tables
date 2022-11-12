import {
  TableRow,
  TableCell,
  TableCellProps,
  TableRowProps,
} from "@material-ui/core";
import { MuiVirtualizedListColumns } from "..";

export const turnDataRowIntoTableRowStyle =
  (
    cols: MuiVirtualizedListColumns[],
    defaultCellProps: TableCellProps,
    defaultRowProps: TableRowProps
  ) =>
  (dataRow: any) => {
    // se não vier um array no columns, estourará erro
    if (!Array.isArray(cols)) {
      throw new Error("columns must be an array");
    }

    return (
      <TableRow {...defaultRowProps}>
        {cols?.map((col) => (
          <TableCell {...defaultCellProps} {...col.tableCellProps}>
            {dataRow[col.id]}
          </TableCell>
        ))}
      </TableRow>
    );
  };
