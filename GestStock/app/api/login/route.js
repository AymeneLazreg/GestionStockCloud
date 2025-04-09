import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req) {
  // Récupérer les données envoyées par le client
  const { email, password } = await req.json()

  // Vérifier si l'utilisateur existe dans la base de données
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'Email incorrect' }, { status: 401 })
  }

  // Comparer le mot de passe envoyé avec celui stocké (haché)
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  // Si tout est ok, renvoyer une réponse positive
  return NextResponse.json({ success: true, message: 'Connexion réussie' })
}
