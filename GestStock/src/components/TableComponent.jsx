import "/home/tabet/gestion-stock-frontend/src/App.css"
const TableComponent = () => {
  return (
    <table className="border border-gray-500 w-full text-center">
      <thead className="bg-">
        <tr>
          <th className="py-1">Colonne 1</th>
          <th className="py-2">Colonne 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-3">Donnée 1</td>
          <td className="py-4">Donnée 2</td>
        </tr>
        <tr>
          <td className="py-5">Donnée 3</td>
          <td className="py-6">Donnée 4</td>
        </tr>
      </tbody>
    </table>
  )
}

export default TableComponent

