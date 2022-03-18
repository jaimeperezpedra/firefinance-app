import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';

const Rows = (columns, row) => {
  return columns.map((column) => {
    return <TableCell key={`${row.id} - ${column.id}`} >{column.render !== undefined ? column.render({ row: row, value: row[column.id]} ) : row[column.id]}</TableCell>;
  });
};

export const SimpleTable = ({ data, columns, finalRow, title, loading }) => {
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
      <Table sx={{ minWidth: 650 }} loading={true}>
        <TableHead>
          <TableRow>
            {loading ? 
            <TableCell>
              <Skeleton animation="wave" height={64} />
            </TableCell>
            : 
            columns.map((column) => (<TableCell key={column.id} align={column.align}>{column.label}</TableCell>))
            }
            
          </TableRow>
        </TableHead>
        <TableBody>
          { loading ? 
            <>
              <TableRow>
                <TableCell>
                  <Skeleton animation="wave" height={32} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton animation="wave" height={32} />
                </TableCell>
              </TableRow>
            </>
          :
          data.length === 0 ? 'No results found':
          data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {Rows(columns, row)}
            </TableRow>
          ))
          }

          { !loading && finalRow && <FinalRow finalRow={finalRow} data={data} /> }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const FinalRow = ({ finalRow, data }) => {
  let sum = 0;
  data?.map(row => sum = sum + row[finalRow.sum]);
  return (
    <TableRow>
      <TableCell key='final-row-title'>
        {finalRow.title}
      </TableCell>
      <TableCell key='final-row-sum'>
        {sum.toFixed(2)} €
      </TableCell>
    </TableRow>
  )
}

FinalRow.propTypes = {
  finalRow: PropTypes.obj,
  data: PropTypes.array
}

SimpleTable.propTypes = {
  finalRow: PropTypes.obj,
  data: PropTypes.array,
  columns: PropTypes.array,
  title: PropTypes.string,
  loading: PropTypes.bool.isRequired
}