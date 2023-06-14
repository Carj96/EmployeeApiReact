import { createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = 'https://reactapi.bsite.net/api/Employee';

export const getEmployees = createAsyncThunk('/employees', async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
});

export const createEmployee = createAsyncThunk('/employees/create', (payload) => {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return payload;
});

export const updateEmployee = createAsyncThunk('/employees/update', (payload) => {
  fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return payload;
});

export const deleteEmployee = createAsyncThunk('employees/delete', (payload) => {
  fetch(`${apiUrl}/${payload.employeeId}`, {
    method: 'DELETE',
  });
});
