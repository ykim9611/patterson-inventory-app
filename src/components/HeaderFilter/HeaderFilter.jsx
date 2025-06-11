import React, { useState } from 'react';
import { Dropdown, Form, Button } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import styles from './HeaderFilter.module.css';

function HeaderFilter({
  showDropdown,
  setShowDropdown,
  filterText,
  handleFilterChange,
  sortOrder,
  clearFilters,
  applyFilter,
  toggleSort,
}) {
  return (
    <Dropdown
      show={showDropdown}
      onToggle={() => setShowDropdown((prev) => !prev)}
    >
      <Dropdown.Toggle variant='light' size='sm' id='dropdown-basic'>
        <FaFilter />
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: '220px', padding: '0.5rem' }}>
        <Form.Group className='mb-2'>
          <Form.Control
            type='text'
            placeholder='Filter...'
            value={filterText}
            onChange={handleFilterChange}
            size='sm'
          />
        </Form.Group>

        <div className='d-flex align-items-center mb-2'>
          <span className='me-2'>Sort:</span>
          <Button variant='outline-secondary' size='sm' onClick={toggleSort}>
            {sortOrder === 'asc'
              ? '↑ A-Z'
              : sortOrder === 'desc'
              ? '↓ Z-A'
              : '↕ Sort'}
          </Button>
        </div>

        <div className='d-flex justify-content-between gap-2'>
          <Button
            variant='outline-danger'
            size='sm'
            onClick={clearFilters}
            className='w-50'
          >
            Clear
          </Button>
          <Button
            variant='primary'
            size='sm'
            onClick={applyFilter}
            className='w-50'
          >
            Apply
          </Button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default HeaderFilter;
