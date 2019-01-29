import React from 'react';

const getTable = data => {
    return (
        <table className="table table-hover">
            {gethead()}
            <tbody>
                {data && data.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.userName}</td>
                            <td>{item.password}</td>
                            <td>{item.gender}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const gethead = () => {
    return <thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">User Name</th>
        <th scope="col">Password</th>
        <th scope="col">Gender</th>
    </tr>
</thead>
}

export default getTable;