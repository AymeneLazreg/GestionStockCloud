"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"

export default function Profile() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("account")
    const [user, setUser] = useState(null)
    const [formData, setFormData] = useState({ nom: "", email: "" })
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await fetch("http://31.207.36.191:8832/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) throw new Error("Erreur lors du chargement du profil")
                const data = await response.json()
                setUser(data)
                setFormData({ nom: data.nom, email: data.email })
            } catch (err) {
                console.error(err)
            }
        }

        fetchProfile()
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handlePasswordChange = e => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        const token = localStorage.getItem("token")
        try {
            const res = await fetch("http://31.207.36.191:8832/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Erreur de mise à jour")

            const updated = await res.json()
            setUser(updated)
            alert("Profil mis à jour avec succès !")
        } catch (err) {
            alert("Erreur lors de la mise à jour du profil.")
        }
    }
    
  const handleBack = () => {
    navigate(-1); // 👈 revient à la page précédente dans l'historique
  };

    const handleChangePassword = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwordData

        if (newPassword !== confirmPassword) {
            alert("Les nouveaux mots de passe ne correspondent pas.")
            return
        }

        try {
            const token = localStorage.getItem("token")
            const res = await fetch("http://31.207.36.191:8832/api/user/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                }),
            })

            if (!res.ok) throw new Error("Échec du changement de mot de passe")

            alert("Mot de passe mis à jour avec succès !")
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
        } catch (err) {
            alert("Erreur lors de la mise à jour du mot de passe.")
        }
    }

    if (!user) return <p>Chargement du profil...</p>

    return (
        <div className="profile-container">
            <Header title="Profil Utilisateur" />

            <div className="profile-content">
                <div className="profile-sidebar">
                    <h2 className="profile-name">{user.nom}</h2>
                    <p className="profile-email">{user.email}</p>

                    <div className="profile-badges">
                        <span className="profile-badge role">{user.role}</span>
                    </div>

                    <button className="logout-btn" onClick={handleLogout}>
                        Déconnexion
                    </button>
                </div>

                <div className="profile-main">
                    <div className="profile-tabs">
                        <button
                            className={`tab-btn ${activeTab === "account" ? "active" : ""}`}
                            onClick={() => setActiveTab("account")}
                        >
                            Compte
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
                            onClick={() => setActiveTab("security")}
                        >
                            Sécurité
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === "account" && (
                            <div className="account-tab">
                                <h3>Informations personnelles</h3>
                                <p>Modifiez votre nom et email</p>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Nom complet</label>
                                        <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                                    </div>
                                </div>

                                <button className="save-btn" onClick={handleSave}>
                                    Enregistrer les modifications
                                </button>
                                <button className="save-btn" 
                                style={{ marginLeft: "10px" }}
                                onClick={handleBack}>
                                    Retour
                                </button>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="security-tab">
                                <h3>Changer le mot de passe</h3>
                                <p>Saisissez votre ancien mot de passe et le nouveau</p>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Mot de passe actuel</label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Nouveau mot de passe</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Confirmer le nouveau mot de passe</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                </div>

                                <button className="save-btn" onClick={handleChangePassword}>
                                    Modifier le mot de passe
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
