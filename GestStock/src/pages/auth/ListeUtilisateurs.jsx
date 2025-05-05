import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';


const rolesDisponibles = ['client', 'gestionnaire', 'admin'];

const ListeUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);

  const fetchUtilisateurs = async () => {
    try {
      const res = await axios.get('http://31.207.36.191:8832/api/user/utilisateurs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUtilisateurs(res.data);
    } catch (err) {
      console.error(err);
      alert('Vous n\'avez pas les droits pour accéder à cette page.');
    }
  };

  const changerRole = async (id, nouveauRole) => {
    try {
      await axios.put(
        `http://31.207.36.191:8832/api/user/utilisateurs/${id}`,
        { role: nouveauRole },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setUtilisateurs(prev =>
        prev.map(u => (u.id === id ? { ...u, role: nouveauRole } : u))
      );
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour du rôle.');
    }
  };
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1); // 👈 revient à la page précédente dans l'historique
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  return (
    <>
      <Header title="Gestion des utilisateurs" />

      <div className="p-6">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border">Nom</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Rôle</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map(user => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{user.nom}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">
                  <select
                    value={user.role}
                    onChange={e => changerRole(user.id, e.target.value)}
                    className="border rounded px-2 py-1"
                    style={{ color: 'blue',
                        backgroundColor: '#f0f0f0'
                     }}  
                  >
                    {rolesDisponibles.map(role => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
        <button className="save-btn" 
                                style={{ width : '40%',
                                    marginLeft : '30%',
                                    marginTop : '20px',
                                 }}
                                onClick={handleBack}>
                                    Retour
                                </button>
      </div>
    </>
  );
};

export default ListeUtilisateurs;
