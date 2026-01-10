import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import type { InvoiceItem } from "../data/InvoiceItem";

const MIN_ROWS = 5;

type Props = {
  items: InvoiceItem[];
  setItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
};

const createEmptyRow = (id: number): InvoiceItem => ({
  id,
  description: "",
  quantity: 0,
  price: 0,
});

const ItemsTable = ({ items, setItems }: Props) => {
  if (items.length === 0) {
    setItems(
      Array.from({ length: MIN_ROWS }, (_, i) => createEmptyRow(i + 1))
    );
  }

  const handleChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ) => {
    const updated = [...items];
    // @ts-ignore
    updated[index][field] =
      field === "description" ? value : Number(value);
    setItems(updated);
  };

  const addRow = () => {
    setItems([...items, createEmptyRow(items.length + 1)]);
  };

  const removeRow = (index: number) => {
    if (items.length <= MIN_ROWS) return;
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <Box mt={4} bgcolor="#fff" p={3} borderRadius={2} boxShadow={1}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item, index) => {
            const rowTotal = item.quantity * item.price;
            const isAddRow = index === MIN_ROWS - 1;
            const canRemove = items.length > MIN_ROWS;

            return (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={item.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    variant="standard"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>
                  <TextField
                    variant="standard"
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                  />
                </TableCell>

                <TableCell>{rowTotal.toFixed(2)}</TableCell>

                <TableCell>
                  {isAddRow && (
                    <IconButton onClick={addRow} color="primary">
                      <AddCircleOutlineIcon />
                    </IconButton>
                  )}
                  {canRemove && (
                    <IconButton
                      onClick={() => removeRow(index)}
                      color="error"
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ItemsTable;
