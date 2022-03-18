import React from 'react';
import { Container, IconButton, Modal, Button, Box, TextField, Typography } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { gql, useQuery, useMutation } from '@apollo/client';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast } from 'react-toastify';

import { SimpleTable, ModalBox } from '../../components'
import { CreateExpense } from './CreateExpense';

export const GET_ALL_EXPENSES = gql`
  query getExpenses($input: ExpenseFilter!) {
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
  mutation deleteExpense($id: ID!) {
    deleteExpense(id: $id)
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
    try {
      await deleteExpenseByID({
        variables: { id: idToDelete },
      });
      toast.success('The expense was delete successfully');
      refetch();
      handleClose(false);
    } catch (error) {
      toast.error('There was an error, try again!');
    }
  }
  const openDeleteModal = ({id}) => {
    setIdToDelete(id);
    handleClose(true);
  }
  const finalRow = {
    title: 'Total',
    sum: 'price',
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
      {/* {loading && 'Loading...'} */}
      {error ? 'Error...' :
        <SimpleTable title='List expenses' loading={loading} data={data?.expenses} columns={columns} finalRow={finalRow} />
      }

      <CreateExpense onCreated={() => refetch()} />
      <Modal
        open={open}
        onClose={() => handleClose(false)}
      >
        <ModalBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete expense
          </Typography>
          <p>Are you sure you want to the delete the expense?</p>
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
  mt: 2
};
