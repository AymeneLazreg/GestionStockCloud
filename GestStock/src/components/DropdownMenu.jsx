"use client"

import { useState } from "react"
import "/home/tabet/gestion-stock-frontend/src/App.css"
const DropdownMenu = ({ options, label }) => {
  const [selected, setSelected] = useState(options[0])

  return (
    <div className="dropdown mt-4">
      <label className="block">{label}</label>
      <select
        className="border border-gray-400 px-3 py-2 rounded-md"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropdownMenu

