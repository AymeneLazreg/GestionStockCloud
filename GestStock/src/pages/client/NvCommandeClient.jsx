// src/pages/client/NvCommandeClient.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NvCommandeClient() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("commandeClientId");
    if (id) {
      navigate(`/details-commande-client/${id}`);
    } else {
      navigate("/commandes-client");
    }
  }, [navigate]);

  return null; // 👈 rien à afficher ici
}

export default NvCommandeClient;
