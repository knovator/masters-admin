import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';

import Master from 'components/Master';
import Provider from 'context';

let newColumns: SchemaType = [
  {
    Header: "Name",
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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGE0NDgzNTI3YzI4MTA0OGFkNjcxMyIsImVtYWlsIjoiYWRtaW5AbWFpbGluYXRvci5jb20iLCJpYXQiOjE2NTQ1NzY1MzMsImV4cCI6MTY1NDY2MjkzM30.aMzDVQxzaL9dtW2nL8Sol62D931NJrjpFpJ_tdoQ3Os"
  return (
    <Provider baseUrl="https://api.orbitjobs.knovator.in" permissions={{}} token={token}>
      <div className="grid grid-cols-2">
        <Master />
        <Master
          table={({ columns, data }) => (
            <Master.Table columns={newColumns} data={data} actions={{ showDelete: false }} />
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
