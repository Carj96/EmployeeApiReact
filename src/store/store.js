import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from './employee/employees.slice';
import modalSlice from './modal/modal.slice';

const store = configureStore({
  reducer: {
    employee: employeesSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export default store;
