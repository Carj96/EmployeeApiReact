import { clearModalData } from '../../store/modal/modal.slice';

export const handleChangeInputs = (event, setModalData, dispatch) => {
  const { name, value } = event.target;
  return dispatch(setModalData({ name, value }));
};

export const handleCloseModal = (dispatch, setModal, setEditMode) => {
  setEditMode(() => false);
  dispatch(clearModalData());
  dispatch(setModal(false));
};
