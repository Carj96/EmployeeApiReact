import { createSlice } from '@reduxjs/toolkit';

const dataInitialState = {
  firstName: '',
  lastName: '',
  birthday: '',
  height: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpen: false, contentType: '', data: dataInitialState },
  reducers: {
    setOpen: (state, action) => ({
      ...state,
      isOpen: action.payload,
    }),
    setContentType: (state, action) => ({
      ...state,
      contentType: action.payload,
    }),
    setModalData: (state, action) => {
      const { name, value } = action.payload;
      return name && value ? {
        ...state,
        data: { ...state.data, [name]: value },
      } : { ...state, data: action.payload };
    },
    clearModalData: (state) => ({
      ...state,
      data: dataInitialState,
    }),
  },
});

export const {
  setOpen, setContentType, setModalData, clearModalData,
} = modalSlice.actions;
export default modalSlice;
