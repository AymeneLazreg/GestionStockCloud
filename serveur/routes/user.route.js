import express from 'express'
import authenticateToken from '../middleware/auth.js'
import User from '../models/user.model.js'
import bcrypt from 'bcrypt' // à ajouter en haut du fichier si ce n'est pas déjà fait


const router = express.Router()

// Récupération du profil utilisateur
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['nom', 'email', 'role']
    })

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })

    res.json(user)
  } catch (error) {
    console.error('Erreur récupération profil:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// Mise à jour du profil utilisateur
router.put('/profile', authenticateToken, async (req, res) => {
  const { nom, email } = req.body

  try {
    const user = await User.findByPk(req.user.id)

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })

    // Met à jour uniquement les champs autorisés
    user.nom = nom ?? user.nom
    user.email = email ?? user.email

    await user.save()

    // Renvoie uniquement les champs visibles
    res.json({
      nom: user.nom,
      email: user.email,
      role: user.role
    })
  } catch (error) {
    console.error('Erreur mise à jour profil:', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})


// Modification du mot de passe
router.put('/password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Champs requis manquants' })
  }

  try {
    const user = await User.findByPk(req.user.id)

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' })
    }

    // Vérifie si le mot de passe actuel est correct
    const isMatch = await bcrypt.compare(currentPassword, user.mdp)
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' })
    }

    // Hash le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Mise à jour
    user.mdp = hashedPassword
    await user.save()

    res.json({ message: 'Mot de passe mis à jour avec succès' })
  } catch (error) {
    console.error('Erreur modification mot de passe :', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

export default router
