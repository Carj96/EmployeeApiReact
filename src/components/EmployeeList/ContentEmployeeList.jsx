import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, deleteEmployee, updateEmployee } from '../../store/employee/employees.thunk';
import './EmployeeList.scss';
import { setModalData, setOpen } from '../../store/modal/modal.slice';
import { handleDeleteEmployee } from './handlers';
import { handleCloseModal } from '../Modal/handlers';

function ContentEmployeeList(handlers) {
  const modalData = useSelector((state) => state.modal.data);
  const modalContentType = useSelector((state) => state.modal.contentType);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  if (modalContentType === 'new') {
    return (
      createEmployeeModal(modalData, setModalData, handlers, setOpen, dispatch)
    );
  } if (modalContentType === 'current') {
    return (
      currentEmployeeModal(modalData, setModalData, handlers, editMode, setEditMode, dispatch)
    );
  }
}

function createEmployeeModal(modalData, setModalData, handlers, setModal, dispatch) {
  return (
    <div>
      <h3>ADD NEW EMPLOYEE</h3>
      <form onSubmit={(event) => handlers.handleSubmitNewEmployee(event, dispatch, createEmployee, modalData, setModal)}>
        <div>
          <input type="text" name="firstName" placeholder="first name" required value={modalData.firstName} onChange={(e) => handlers.handleChangeInputs(e, setModalData, dispatch)} />
        </div>
        <div>
          <input type="text" name="lastName" placeholder="last name" required value={modalData.lastName} onChange={(e) => handlers.handleChangeInputs(e, setModalData, dispatch)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <span>birthday</span>
          <input type="date" name="birthday" required value={modalData.birthday} onChange={(e) => handlers.handleChangeInputs(e, setModalData, dispatch)} />
        </div>
        <div>
          <input type="text" name="height" placeholder="height" required value={modalData.height} onChange={(e) => handlers.handleChangeInputs(e, setModalData, dispatch)} />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

function currentEmployeeModal(modalData, setModalData, handlers, editMode, setEditMode, dispatch) {
  return !editMode ? (
    <div>
      <h3>
        USER ID#
        {modalData.employeeId}
      </h3>
      <div className="employ-data-container">
        <div className="employ-data">
          <span>first name</span>
          <span>{modalData.firstName}</span>
        </div>
        <div className="employ-data">
          <span>last name</span>
          <span>{modalData.lastName}</span>
        </div>
        <div className="employ-data">
          <span>birthday</span>
          <span>{new Date(modalData.birthday).toDateString()}</span>
        </div>
        <div className="employ-data">
          <span>height</span>
          <span>{modalData.height}</span>
        </div>
      </div>
      <button type="button" onClick={() => setEditMode((prev) => !prev)}> Edit </button>
      <button type="button" onClick={() => { handleDeleteEmployee(modalData, dispatch, deleteEmployee); handleCloseModal(dispatch, setOpen); }}>Delete</button>
    </div>
  ) : (
    <div>
      <h3>
        USER ID#
        {modalData.employeeId}
      </h3>
      <div className="employ-data-container">
        <div className="employ-data">
          <span>first name</span>
          <input name="firstName" value={modalData.firstName} onChange={(event) => handlers.handleChangeInputs(event, setModalData, dispatch)} />
        </div>
        <div className="employ-data">
          <span>last name</span>
          <input name="lastName" value={modalData.lastName} onChange={(event) => handlers.handleChangeInputs(event, setModalData, dispatch)} />
        </div>
        <div className="employ-data">
          <span>birthday</span>
          <input name="birthday" value={modalData.birthday} onChange={(event) => handlers.handleChangeInputs(event, setModalData, dispatch)} />
        </div>
        <div className="employ-data">
          <span>height</span>
          <input name="height" value={modalData.height} onChange={(event) => handlers.handleChangeInputs(event, setModalData, dispatch)} />
        </div>
      </div>
      <button type="button" onClick={() => handlers.handleSubmitChanges({ ...modalData }, dispatch, updateEmployee, setEditMode)}> Submit </button>
    </div>
  );
}

export default ContentEmployeeList;
