import React, { useMemo } from 'react';
import BooksData from './BooksData.json';
import { useTable, useSortBy } from 'react-table';
import './Table.css'

const Table = () => {
  const COLUMNS = [
    {
      Header: 'S.No',
      accessor: 'Id',
    },
    {
      Header: 'Title',
      accessor: 'title',
    },
    {
      Header: 'Author',
      accessor: 'author',
    },
    {
      Header: 'Language',
      accessor: 'language',
    },
    {
      Header: 'Year',
      accessor: 'year',
    },
    {
      Header: 'No. of Pages',
      accessor: 'pages',
    },
  ];
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => BooksData, []);
  const tableInstance = useTable({
    columns: columns,
    data: data,
  },
  useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
      <div className="table-wrapper">
          <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
              <span className='sort-icon'>{
                  column.isSorted ?(column.isSortedDesc ? <i class="fas fa-caret-down"></i>:<i class="fas fa-caret-up"></i> ):''
                  }</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>

      </div>
    
  );
};

export default Table;
