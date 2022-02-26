import React from 'react';
import { Container, IconButton, Modal, Button, Box, TextField } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { gql, useQuery, useMutation } from '@apollo/client';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { SimpleTable, ModalBox } from '../../components'
import { CreateExpense } from './CreateExpense';


export const GET_ALL_EXPENSES = gql`
  query getExpenses($input: ExpenseFilter) {
    expenses(input: $input) {
      category
      price
      description
      currency
      id
    }
  }
`;

export const DELETE_EXPENSE_BY_ID = gql`
  mutation deleteExpense($input: ID!) {
    deleteExpense(input: $input)
  }
`;


export const ListExpenses = () => {
  const [date, setDate] = React.useState(new Date());
  const input = {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  }
  const { loading, data, error, refetch } = useQuery(GET_ALL_EXPENSES, 
    {
      variables: {
        input
      }
    });
  const [deleteExpenseByID] = useMutation(DELETE_EXPENSE_BY_ID);
  const [open, handleClose] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState('');

  const columns = [
    {
      id: 'price',
      label: 'Price',
      render: ({value}) => {
        return `${value} €`
      },
    },
    {
      id: 'category',
      label: 'Category',
    },
    {
      id: 'description',
      label: 'Description',
    },
    {
      id: 'currency',
      label: 'Currency',
    },
    {
      id: 'custom',
      label: '',
      render: ({row}) => {
        return <IconButton onClick={() => openDeleteModal(row)}><DeleteForeverIcon color="action" /></IconButton>
      },
    }
  ];

  const deleteExpense = async () => {
    await deleteExpenseByID({
      variables: { input: idToDelete },
    });
    refetch();
    handleClose(false);
  }
  const openDeleteModal = ({id}) => {
    setIdToDelete(id);
    handleClose(true);
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={['year', 'month']}
          label="Year and Month"
          value={date}
          onChange={(newDate) => {
            setDate(newDate);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
      {loading && 'Loading...'}
      {error && 'Error...'}
      {data && <SimpleTable data={data.expenses} columns={columns} config={{dense: true}} />}

      <CreateExpense onCreated={refetch} />
      <Modal
        open={open}
        onClose={() => handleClose(false)}
      >
        {/* <div>hollo</div> */}
        <ModalBox>
          <h3>
            Are you sure you want to the delete the expense?
          </h3>
          <Box sx={ButtonsContainer}>
            <Button  variant="contained" onClick={() => handleClose(false)} color="primary">
              Close
            </Button>
            <Button  variant="contained" onClick={deleteExpense} color="error">
              Delete
            </Button>
          </Box>
        </ModalBox>
      </Modal>
    </Container>
  )
}

const ButtonsContainer = {
  display: 'flex',
  gap: 2,
  justifyContent: 'flex-end',
};
