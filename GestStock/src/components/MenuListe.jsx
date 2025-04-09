"use client"

const MenuListe = ({ items, onItemClick }) => {
  return (
    <div className="menu-container">
      {items.map((item, index) => (
        <button key={index} className="menu-button" onClick={() => onItemClick && onItemClick(item, index)}>
          {item}
        </button>
      ))}
    </div>
  )
}

export default MenuListe

