import Produit from '../models/produit.model.js';
import Mouvement from '../models/mouvement.model.js';

// GET all
export const getProduits = async (req, res) => {
  const produits = await Produit.findAll();
  res.json(produits);
};

// GET by id
export const getProduit = async (req, res) => {
  const produit = await Produit.findByPk(req.params.id);
  if (produit) res.json(produit);
  else res.status(404).json({ message: 'Produit non trouvé' });
};

// POST
export const createProduit = async (req, res) => {
  const nouveauProduit = await Produit.create(req.body);
  res.status(201).json(nouveauProduit);
};

// PUT
export const updateProduit = async (req, res) => {
  const produit = await Produit.findByPk(req.params.id);
  if (!produit) return res.status(404).json({ message: 'Introuvable' });

  await produit.update(req.body);
  res.json(produit);
};



export const ajouterProduit = async (req, res) => {
  try {
    const { nom, description, prix, quantite_stock, categorieId } = req.body

    const nouveauProduit = await Produit.create({
      nom,
      description,
      prix,
      quantite_stock,
      categorieId
    })

    res.status(201).json(nouveauProduit)
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error)
    res.status(500).json({ message: "Erreur serveur", error: error.message })
  }
}

// DELETE
export const deleteProduit = async (req, res) => {
  const produit = await Produit.findByPk(req.params.id);
  if (!produit) return res.status(404).json({ message: 'Introuvable' });

  await produit.destroy();
  res.json({ message: 'Supprimé' });
};


