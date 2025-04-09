import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req) {
  const { email, password } = await req.json()

  // Vérifier si l'email existe déjà
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 })
  }

  // Hacher le mot de passe avant de l'enregistrer
  const hashedPassword = await bcrypt.hash(password, 10)

  // Enregistrer l'utilisateur dans la base de données
  const user = await prisma.user.create({
    data: { email, password: hashedPassword }
  })

  return NextResponse.json({ success: true, message: 'Utilisateur créé avec succès' })
}
