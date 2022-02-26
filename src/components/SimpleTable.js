import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';

const Rows = (columns, row) => {
  return columns.map((column) => {
    return <TableCell key={`${row.id} - ${column.id}`} >{column.render !== undefined ? column.render({ row: row, value: row[column.id]} ) : row[column.id]}</TableCell>;
  });
};

export const SimpleTable = ({ data, columns, config, finalRow, title }) => {
  const getTypeTable = () => {
    if (config?.dense) {
      return 'a dense table'
    } else {
      return 'simple table'
    }
  }

  return (
    <TableContainer component={Paper} >
      {title && <Box sx={{p:2}}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
      </Box>}
      <Table sx={{ minWidth: 650 }} aria-label={getTypeTable()}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 && 'No results found'}
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Rows(columns, row)}
            </TableRow>
          ))}
          { finalRow && <FinalRow finalRow={finalRow} data={data} /> }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const FinalRow = ({ finalRow, data }) => {
  let sum = 0;
  data.map(row => sum = sum + row[finalRow.sum]);
  return (
    <TableRow>
      <TableCell key='final-row-title'>
        {finalRow.title}
      </TableCell>
      <TableCell key='final-row-sum'>
        {sum}
      </TableCell>
    </TableRow>
  )
}