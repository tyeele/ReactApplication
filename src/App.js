import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const theme = {
  primary: '#2C3333',
  secondary: '#2E4F4F',
  tertiary: '#0E8388',
  quaternary: '#CBE4DE'
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: ${theme.tertiary};
  border: 1px solid ${theme.quaternary};
  border-radius: 4px;
  color: ${theme.quaternary};
  cursor: pointer;
  font-size: 14px;
  height: 36px;
  line-height: 28px;
  min-width: 54px;
  margin-right: 10px;
  padding: 0 16px;
  user-select: none;
  
  &:hover {
    background-color: ${theme.quaternary};
    color: ${theme.primary};
  }

  &:focus {
    border-color: ${theme.secondary};
    outline: none;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
    min-width: auto;
    padding: 0 8px;
  }
`;

const StyledInput = styled.input `
  flex: 1
  width: 30%;
  box-sizing: border-box;
  border: 2px solid ${theme.quaternary};
  border-radius: 4px;
  font-size: 16px;
  padding: 8px 16px 8px 16px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px 6px 12px;
  }
`;

const StyledTable = styled.table`
  border-spacing: 1; 
  border-collapse: collapse; 
  border-radius: 6px;
  overflow: hidden;
  max-width: 1000px; 
  width: 100%;
  margin: 8px auto;
  position: relative;
  & * { 
    position:relative 
  }
  & th {
    height: 60px;
    background: ${theme.primary};
    color: ${theme.quaternary};
    font-size: 16px;
    padding-left: 8px
  }
  & tbody tr { 
    height: 48px; 
    background: ${theme.quaternary};
    color: ${theme.primary};
    border-bottom: 1px solid ${theme.primary};
    font-size: 14px;
    
    &:last-child { 
      border: 0; 
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    & th {
      font-size: 14px;
      padding-left: 4px
    }
    & tbody tr { 
      font-size: 12px;
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const PaginationButton = styled.button`
  background-color: ${(props) => (props.active ? theme.tertiary : theme.primary)};
  border: 1px solid ${theme.quaternary};
  border-radius: 4px;
  color: ${theme.quaternary};
  cursor: pointer;
  font-size: 14px;
  height: 36px;
  line-height: 28px;
  min-width: 54px;
  padding: 0 16px;
  user-select: none;
  
  &:hover {
    background-color: ${theme.quaternary};
    color: ${theme.primary};
  }

  &:focus {
    border-color: ${theme.secondary};
    outline: none;
  }
  
  &:not(:last-child) {
    margin-right: 8px;
  }
`;


function App() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const sortUsers = (prop) => {
    setSortBy(prop);
    setUsers([...users].sort((a, b) => a[prop].localeCompare(b[prop])));
  };

  const filterUsers = (query) => {
    setFilterBy(query.toLowerCase());
    setCurrentPage(1); // reset current page when filtering
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filterBy) ||
      user.email.toLowerCase().includes(filterBy) ||
      user.phone.toLowerCase().includes(filterBy)
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="App">
      <h1>Users List</h1>
      <StyledContainer>
        <div className="sort-by">
            <span>Sort by:</span>
            <StyledButtonGroup>
              <StyledButton onClick={() => sortUsers('name')}>Name</StyledButton>
              <StyledButton onClick={() => sortUsers('email')}>Email</StyledButton>
              <StyledButton onClick={() => sortUsers('phone')}>Phone</StyledButton>
            </StyledButtonGroup>
        </div>
        <div className="filter-by">
          <span>Filter by:</span>
          <StyledInput type="text" placeholder="Name, Email, or Phone" onChange={(e) => filterUsers(e.target.value)} />
        </div>
      </StyledContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td data-testid="name">{user.name}</td>
              <td data-testid='email'>{user.email}</td>
              <td data-testid='phone'>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Pagination>
      {pageNumbers.map((number) => (
        <PaginationButton key={number} active={number === currentPage} onClick={() => paginate(number)}>
          {number}
        </PaginationButton>
      ))}
    </Pagination>
    </div>
  );
}

export default App;
