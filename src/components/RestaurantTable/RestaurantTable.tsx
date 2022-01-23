import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FilterMenu from "../FilterMenu/FilterMenu";

import ChangeStatusModal from "../ChangeStatusModal/ChangeStatusModal";
import { useChangeRestaurantOrderMutation } from "../../api/apiSlice";
import { useGetRestaurantOrderQuery } from "../../api/apiSlice";

interface Data {
  orderNumber: number;
  type: "delivery" | "hall";
  status: "new" | "cooking" | "assembling" | "done";
  id: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface Prop {
  restrId: number
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  {
    id: 'orderNumber',
    numeric: true,
    disablePadding: false,
    label: 'Номер заказа',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Статус заказа',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Тип заказа',
  },
];

function EnhancedTableHead() {

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const RestaurantTable = (props: Prop) => {
  const [status, setStatus] = React.useState('');
  const [close, setClose] = React.useState(false);
  const [selectedRestrId, setSelectedRestrId] = React.useState(0);
  const [filterChange, setFilterChange] = React.useState(false);
  const [changeRestaurantOrder] = useChangeRestaurantOrderMutation();

  const orderStatus = useGetRestaurantOrderQuery(props.restrId);
  const {
    data: order
  } = useGetRestaurantOrderQuery(props.restrId);

  const onFilterChange = () => {
    setFilterChange(!filterChange);
  }

  React.useEffect(() => {
    orderStatus.refetch();
  }, [filterChange])

  const onHandleOpen = (id: number) => {
    setClose(true);
    setSelectedRestrId(id);
  };

  const onHandleClose = () => {
    setClose(false);
  }

  const onChangeStatus = (status: string) => {
    onHandleClose();
    changeRestaurantOrder({ id: selectedRestrId, status: status }).then(() => orderStatus.refetch()).catch((err) => console.log(err));
  }

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const View = () => {
    if (!order) return;

    return order.map(item => {
      return (
        <TableRow tabIndex={-1} key={item.id}>
          <TableCell
            component="th"
            scope="row"
            padding="normal"
            sx={{ width: "30%", paddingLeft: 5, paddingRight: 5 }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Сменить статус</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Сменить статус"
                onChange={handleChange}
              >
                <MenuItem value={"Сменить статус"} onClick={() => onHandleOpen(item.id)}>Сменить статус</MenuItem>
              </Select>
            </FormControl>
          </TableCell>
          <TableCell align="right">{item.orderNumber}</TableCell>
          <TableCell align="right">{item.status}</TableCell>
          <TableCell align="right">{item.type}</TableCell>
        </TableRow>)
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, borderRadius: 0, height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <TableContainer  >
          <FilterMenu onFilterChange={onFilterChange} />
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
            />
            <TableBody>
              {View()}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ChangeStatusModal openToggle={close} onChangeStatus={onChangeStatus} />
    </Box>
  );
}

export default RestaurantTable;