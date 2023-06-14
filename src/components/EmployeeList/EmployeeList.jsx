import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../store/employee/employees.thunk';
import './EmployeeList.scss';
import Modal from '../Modal/Modal';
import ContentEmployeeList from './ContentEmployeeList';
import * as HandlersEmployee from './handlers';
import * as HandlersModal from '../Modal/handlers';
import { setContentType, setModalData, setOpen } from '../../store/modal/modal.slice';
import { filterEmployeesData, sortData } from '../../store/employee/employees.slice';

function EmployeeList() {
  const Handlers = { ...HandlersEmployee, ...HandlersModal };
  const employee = useSelector((state) => (state.employee[0]?.filteredData?.length ? state.employee[0]?.filteredData : state.employee[0]?.data));
  const isModalOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  const [inputDisable, setInputDisable] = useState(true);
  const [filterData, setFilterData] = useState({
    filterSelect: '',
    filterInput: '',
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, []);
  return (
    <>
      <Modal
        isVisible={isModalOpen}
        content={ContentEmployeeList(Handlers)}
        onClose={() => Handlers.handleCloseModal(dispatch, setOpen)}
      />

      {employee ? (
        <>
          <div className="sort-and-filter">
            <div className="sort">
              <span> Sort by: </span>
              <select defaultValue="notSorted" onChange={(event) => HandlersEmployee.handleSortSelectChanges(event, dispatch, sortData)} name="sortSelect">
                <option value="notSorted" style={{ display: 'none' }}>not sorted</option>
                <option value="lastName">last name</option>
                <option value="firstName">first name</option>
                <option value="birthday">birthday</option>
                <option value="height">height</option>
              </select>
            </div>
            <div className="filter">
              <span>Filter by:</span>
              <select defaultValue="notSorted" onChange={(event) => Handlers.handleChangeFilterData(event, setFilterData, inputDisable, setInputDisable)} name="filterSelect">
                <option value="notFiltered" style={{ display: 'none' }}>not filtered</option>
                <option value="lastName">last name</option>
                <option value="firstName">first name</option>
                <option value="birthday">birthday</option>
                <option value="height">height</option>
              </select>
              <input className="filterInput" name="filterInput" value={filterData.filterInput} placeholder="enter filter data" disabled={inputDisable} onKeyUp={() => Handlers.handleFilter(dispatch, filterEmployeesData, filterData)} onChange={(event) => { Handlers.handleChangeFilterData(event, setFilterData); }} />
            </div>
          </div>
          <table>
            <tbody>
              <tr>
                <th>last name</th>
                <th>first name</th>
                <th>birthday</th>
                <th>height</th>
              </tr>
              {employee[0] !== 'not found' ? employee.map((emp, index) => (
                <tr onClick={() => Handlers.handleCurrentEmployee(emp, setModalData, setOpen, setContentType, dispatch)} key={emp.employeeId || index + new Date(emp.birthday).toString()}>
                  <td name="lastName">{emp.lastName}</td>
                  <td name="firstName">{emp.firstName}</td>
                  <td name="birthday">{new Date(emp.birthday).toDateString()}</td>
                  <td name="height">{emp.height}</td>
                </tr>
              )) : <tr><td colSpan="4"><h2>not found</h2></td></tr>}
            </tbody>
          </table>
          <div className="button">
            <button type="button" name="new" onClick={(event) => (dispatch(setContentType(event.target.name)), dispatch(setOpen(true)))}>add employee</button>
          </div>
        </>
      ) : (
        <svg className="spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
        </svg>
      )}
    </>
  );
}

export default EmployeeList;
