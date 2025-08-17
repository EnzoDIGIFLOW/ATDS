import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    // Récupérer le chemin depuis les paramètres
    const searchParams = request.nextUrl.searchParams
    const imagePath = searchParams.get('path')
    
    if (!imagePath) {
      return new NextResponse('Path parameter is required', { status: 400 })
    }

    // Construire le chemin complet vers l'image
    const fullPath = path.join(process.cwd(), 'src', 'assets', 'menu', imagePath)
    
    // Vérifier que le fichier existe
    if (!fs.existsSync(fullPath)) {

      return new NextResponse('Image not found', { status: 404 })
    }

    // Lire le fichier
    const imageBuffer = fs.readFileSync(fullPath)
    
    // Déterminer le type MIME
    const extension = path.extname(fullPath).toLowerCase()
    const mimeTypes: Record<string, string> = {
      '.webp': 'image/webp',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
    }
    
    const mimeType = mimeTypes[extension] || 'application/octet-stream'
    
    // Retourner l'image avec les bons headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {

    return new NextResponse('Internal server error', { status: 500 })
  }
}