import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import Master from 'components/Master';
import Provider from 'context';

let newColumns: ColumnsSchema = [
  {
    Header: <u className="text-lg text-gray-500">Header</u>,
    accessor: "name",
  },
  {
    Header: "Description",
    accessor: "desc",
  },
  {
    Header: "Active",
    accessor: "isActive",
    Cell: ({ row, onUpdate }) => (
      <select value={row.isActive} onChange={(e) => onUpdate(e.target.value)}>
        <option value={"false"}>FALSE</option>
        <option value={"true"}>TRUE</option>
      </select>
    ),
  },
]

function Main() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTlhMjA5ODgwMDA2N2NhOTM2YTNlOSIsImVtYWlsIjoiaW5mb0BvcmJpdHdvcmtzLmNhIiwiaWF0IjoxNjU0NDg5MTY3LCJleHAiOjE2NTU0ODkxNjd9.7PcHPUsph-ovT5Q8Xq6wWt3LD0yPL5kirsjbwHGkepo"

  return (
    <Provider
      baseUrl="https://api.orbitworks.knovator.in"
      permissions={{}}
      token={token}
      dataGetter={(response) => response.data.data}
      paginationGetter={(response) => response.data.paginator}
    >
      <div className="grid grid-cols-2">
        <Master />

        <Master
          table={({ data }) => (
            <Master.Table columns={newColumns} data={data} actions={{ showEdit: false, atFirst: true }} />
          )}
        />
      </div>
    </Provider>
  )
}

ReactDOM.render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>,
	document.getElementById('root')
)
