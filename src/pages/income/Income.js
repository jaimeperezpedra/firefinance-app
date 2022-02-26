import React from 'react';
import { Container, IconButton } from '@mui/material';
import { SettingsApplications } from '@mui/icons-material';

import { SimpleTable } from '../../components';

export const Income = () => {
  const listOfIncomes = [
    {
      title: 'Nomina',
      amount: 2798,
      currency: 'GBP',
      id: '1',
      type: 'monthly'
    },
    {
      title: 'Piso MS18',
      amount: 150,
      currency: 'EUR',
      id: '2',
      type: 'monthly'
    }
  ];
  const columns = [
    {
      id: 'title',
      label: 'Title',
    },
    {
      id: 'amount',
      label: 'Amount',
    },
    {
      id: 'type',
      label: 'Type',
    },
    {
      id: 'config',
      label: '',
      render: () => {
        return <IconButton><SettingsApplications color="action" /></IconButton>
      },
    },
  ];
  const finalRow = {
    title: 'Total',
    sum: 'amount',
  }
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
        Working on this page
      <SimpleTable  title={'Incomings'} data={listOfIncomes} columns={columns} finalRow={finalRow} />
    </Container>
  )
};