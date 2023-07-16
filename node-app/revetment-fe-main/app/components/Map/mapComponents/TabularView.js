"use client"
import React, { useState } from 'react';
import { Button, Paper, Drawer, Table, Loader, Pagination } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { BsTablet } from 'react-icons/bs';

const TabularView = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;
  const excludeColumns = ['geom', 'gid', 'fid', 'kml_style', 'kml_folder', 'tessellate', 'gx:balloon', 'orig_fid', 'id', 'layer'];
  const toTitleCase = (str) => {
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const fetchData = async (newPage) => {
    setLoading(true);
    const currentPage = newPage || page;
    try {
      const response = await axios.get(`http://localhost:5001/api/revetment?page=${currentPage}&limit=${limit}`);
      const result = response.data;
      console.log(result,"defasfafafa")
      if (result.data.length > 0) {
        setColumns(Object.keys(result.data[0]).filter(col => !excludeColumns.includes(col)));
      }
      setData(result.data);
      setTotalPages(result.totalPages);      
    } catch (error) {
      notifications.show({
        title: 'Error fetching data',
        message: error.message,
        color: 'red',
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Button leftIcon={<BsTablet />} className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={() => {setShowTable(true); fetchData();}}/>
      <Drawer
        position="bottom"
        opened={showTable}
        onClose={() => setShowTable(false)}
        title="Table View"
        padding="md"
        size="90%"
        className="rounded-lg shadow-lg"
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="px-4 py-5 bg-white shadow overflow-hidden rounded-lg">
            <Paper padding="md" shadow="xs" className="rounded-lg">
              <div className="overflow-x-auto">
                <Table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((col, i) => (
                        <th key={i} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{toTitleCase(col)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, index) => (
                      <tr key={index}>
                        {columns.map((col, i) => (
                          <td key={i} className="px-6 py-4 whitespace-nowrap">{row[col]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Paper>
            <Pagination 
              value={page} 
              onChange={(newPage) => {setPage(newPage); fetchData(newPage);}}
              perPage={limit} 
              total={totalPages}
              className="mt-4 flex justify-end items-center"
            />
          </div>
        )}
      </Drawer>
    </div>
  );
}

export default TabularView;
