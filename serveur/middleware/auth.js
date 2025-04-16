import jwt from 'jsonwebtoken'

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    console.warn("❌ Aucun token fourni.");
    return res.status(401).json({ message: "Token manquant" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.warn("❌ Token invalide ou expiré :", err.message);
      return res.status(403).json({ message: "Token invalide" });
    }

    console.log("✅ Utilisateur authentifié :", user);
    req.user = user; // doit contenir un champ `id`
    next();
  });
}
