import { filterEmployeesData } from '../../store/employee/employees.slice';
import { clearModalData } from '../../store/modal/modal.slice';

export const handleSubmitNewEmployee = (event, dispatch, asyncAction, modalData, setModal, filterData) => {
  event.preventDefault();
  const newData = { ...modalData, firstName: modalData.firstName.charAt(0).toUpperCase() + modalData.firstName.slice(1), lastName: modalData.lastName.charAt(0).toUpperCase() + modalData.lastName.slice(1) };
  dispatch(setModal(false));
  dispatch(clearModalData());
  dispatch(asyncAction(newData));
  const newFilterData = { ...filterData, filterInput: filterData.filterInput.charAt(0).toUpperCase() + filterData.filterInput.slice(1) };
  dispatch(filterEmployeesData(newFilterData));
};

export const handleCurrentEmployee = (emp, setModalData, setModal, setModalContentType, dispatch) => {
  dispatch(setModalData({ ...emp }));
  dispatch(setModalContentType('current'));
  dispatch(setModal(true));
};

export const handleSubmitChanges = (emp, dispatch, asyncAction, setEditMode) => {
  dispatch(asyncAction({ ...emp }));
  setEditMode(() => false);
};

export const handleDeleteEmployee = (emp, dispatch, asyncAction) => {
  dispatch(asyncAction({ ...emp }));
};

export const handleSortSelectChanges = (event, dispatch, action) => {
  const sortOption = event.target.value;
  dispatch(action(sortOption));
};

export const handleChangeFilterData = (event, setFilterData, inputDisable, setInputDisabled) => {
  if (inputDisable) setInputDisabled((prev) => !prev);
  const { name, value } = event.target;
  setFilterData((prev) => ({ ...prev, [name]: value }));
};

export const handleFilter = (dispatch, action, filterData) => {
  const newFilterData = { ...filterData, filterInput: filterData.filterInput.charAt(0).toUpperCase() + filterData.filterInput.slice(1) };
  dispatch(action(newFilterData));
};
