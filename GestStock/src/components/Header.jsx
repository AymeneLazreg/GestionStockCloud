import { Link } from "react-router-dom"
import profileLogo from "../assets/icon.png"

const Header = ({ title }) => {
  return (
    <div className="header">
      <Link to="/profile">
        <img src={profileLogo || "/placeholder.svg"} className="logo" alt="Profile Logo" />
      </Link>
      <h1>{title}</h1>
    </div>
  )
}

export default Header

