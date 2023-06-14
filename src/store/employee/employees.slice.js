import { createSlice } from '@reduxjs/toolkit';
import * as Thunks from './employees.thunk';

const employeesSlice = createSlice({
  name: 'employee',
  initialState: [],
  reducers: {
    sortData: (state, action) => {
      const sortedData = state[0].data.slice().sort((current, next) => String(current[action.payload]).localeCompare(String(next[action.payload])));
      const sortedFilteredData = state[0].filteredData?.slice().sort((current, next) => String(current[action.payload]).localeCompare(String(next[action.payload])));
      return [{
        ...state[0],
        data: sortedData,
        filteredData: sortedFilteredData,
      }];
    },
    filterEmployeesData: (state, action) => {
      const filteredData = state[0].data.slice().filter((emp) => String(emp[action.payload.filterSelect]).includes(action.payload.filterInput));
      if (filteredData.length === 0) filteredData.push('not found');
      return [{
        ...state[0],
        filteredData,
      }];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Thunks.getEmployees.pending, (state) => {
        const cashData = sessionStorage.getItem('employeeData');
        if (cashData?.length) state.push({ data: JSON.parse(cashData) });
      })
      .addCase(Thunks.getEmployees.fulfilled, (state, action) => {
        const sessionStorageData = sessionStorage.getItem('employeeData');
        if (JSON.stringify(action.payload) !== sessionStorageData) {
          state.pop();
          sessionStorage.setItem('employeeData', JSON.stringify(action.payload));
          state.push({
            data: action.payload,
            status: 'fullfiled',
          });
        }
      })
      .addCase(Thunks.createEmployee.pending, (state, action) => {
        const newCashData = JSON.parse(sessionStorage.getItem('employeeData'));
        newCashData.push({ ...action.meta.arg });
        sessionStorage.setItem('employeeData', JSON.stringify(newCashData));
        state[0].data.push({ ...action.meta.arg });
        state[0].filteredData?.push({ ...action.meta.arg });
      })
      .addCase(Thunks.updateEmployee.pending, (state, action) => {
        const newData = state[0].data.map((emp) => {
          if (emp.employeeId === action.meta.arg.employeeId) {
            return action.meta.arg;
          }
          return emp;
        });
        const newFilteredData = state[0].filteredData?.map((emp) => {
          if (emp.employeeId === action.meta.arg.employeeId) {
            return action.meta.arg;
          }
          return emp;
        });
        return [{
          ...state[0],
          data: newData,
          filteredData: newFilteredData,
        }];
      })
      .addCase(Thunks.deleteEmployee.pending, (state, action) => {
        const newData = state[0].data.filter((emp) => emp.employeeId !== action.meta.arg.employeeId);
        const newFilteredData = state[0].filteredData?.filter((emp) => emp.employeeId !== action.meta.arg.employeeId);
        sessionStorage.setItem('employeeData', JSON.stringify(newData));
        return [{
          ...state[0],
          data: newData,
          filteredData: newFilteredData,
        }];
      });
  },
});

export const { sortData, filterEmployeesData } = employeesSlice.actions;
export default employeesSlice;
