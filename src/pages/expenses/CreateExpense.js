import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Add } from '@mui/icons-material';
import { Container, Fab, Modal, Grid, TextField, InputLabel, FormControl, MenuItem, Select, Typography, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

import { ModalBox } from '../../components/ModalBox';

const schema = yup.object().shape({
  currency: yup.string().required(),
  price: yup.number().required(),
  category: yup.string().required(),
  description: yup.string().required(),
}).required();


const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};


export const CREATE_EXPENSE = gql`
  mutation createExpense($input: ExpenseInput!) {
    createExpense(input: $input)
  }
`;

export const CreateExpense = ({onCreated}) => {
  const [open, handleClose] = React.useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm(
    {
      defaultValues: {
        currency: 'euro',
      },
      resolver: yupResolver(schema),
    }
  );
  const [createExpense] = useMutation(CREATE_EXPENSE);

  const saveExpense = async (input) => {
    try {
      await createExpense({
        variables: { input },
      });
      onCreated();
      handleClose(false);
    } catch (error) {
      // Error handling
      return `Error: ${error}`;
    }
  }

  return ( 
    <>
      <Modal
        open={open}
        onClose={() => handleClose(false)}
      >
        <ModalBox>
          <Container>
            <form onSubmit={handleSubmit(saveExpense)}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add an expense
              </Typography>
              <Grid container spacing={1} sx={{ mt: 2, mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <TextField {...register('category')} label="Category" fullWidth variant="standard" />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField {...register('price')} type="number" label="Price" fullWidth variant="standard" />
                <p>{errors.price?.message}</p>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Controller
                    id="currency"
                    name="currency"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth variant="standard">
                        <InputLabel id="currency">Currency</InputLabel>
                        <Select
                          {...field}
                          labelId="currency"
                          label="Currency"
                          value={field.value}
                        >
                          <MenuItem value='euro'>Euro</MenuItem>
                          <MenuItem value='pound'>Pound</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField {...register('description')} label="Description" fullWidth variant="standard" />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={ButtonsContainer}>
                    <Button  variant="contained" onClick={() => handleClose(false)} color="primary">
                      Close
                    </Button>
                    <Button type="submit" variant="contained" color="success">
                      Create
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Container> 
        </ModalBox>
      </Modal>
      <Fab color="primary" aria-label="add" sx={fabStyle} onClick={() => handleClose(true)}>
        <Add />
      </Fab>
    </>
  )
};

const ButtonsContainer = {
  display: 'flex',
  gap: 2,
  justifyContent: 'flex-end',
};


CreateExpense.propTypes = {
  onCreated: PropTypes.func,
}