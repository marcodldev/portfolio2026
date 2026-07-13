import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve('public')
const SOURCES = ['pagineweb', 'projects']
const THUMB_WIDTH = 560
const FULL_WIDTH = 1280
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function optimizeFile(srcPath, relDir, fileName) {
  const base = path.parse(fileName).name
  const thumbDir = path.join(ROOT, relDir, 'thumbs')
  const fullDir = path.join(ROOT, relDir, 'full')
  await ensureDir(thumbDir)
  await ensureDir(fullDir)

  const thumbOut = path.join(thumbDir, `${base}.webp`)
  const fullOut = path.join(fullDir, `${base}.webp`)

  await sharp(srcPath)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(thumbOut)

  await sharp(srcPath)
    .rotate()
    .resize({ width: FULL_WIDTH, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(fullOut)

  const [srcStat, thumbStat, fullStat] = await Promise.all([
    fs.stat(srcPath),
    fs.stat(thumbOut),
    fs.stat(fullOut),
  ])

  console.log(
    `${relDir}/${fileName} → thumb ${Math.round(thumbStat.size / 1024)}KB, full ${Math.round(fullStat.size / 1024)}KB (was ${Math.round(srcStat.size / 1024)}KB)`,
  )
}

for (const relDir of SOURCES) {
  const dir = path.join(ROOT, relDir)
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    if (!entry.isFile()) continue
    const ext = path.extname(entry.name).toLowerCase()
    if (!EXT.has(ext)) continue
    await optimizeFile(path.join(dir, entry.name), relDir, entry.name)
  }
}

console.log('Done.')
