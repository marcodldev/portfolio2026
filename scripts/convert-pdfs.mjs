import { promises as fs } from 'node:fs'
import path from 'node:path'
import { pdf } from 'pdf-to-img'
import sharp from 'sharp'

const OUT = path.resolve('public/projects')
const DOWNLOADS = 'C:/Users/Marco D/Downloads'

const files = [
  {
    pdf: 'screencapture-192-168-0-52-8092-odoo-action-615-1-2026-07-02-09_25_31.pdf',
    out: 'vestifacile.jpg',
    blur: false,
  },
  {
    pdf: 'screencapture-95-141-47-24-8080-admin-home-2026-07-02-09_25_02.pdf',
    out: 'gateway-sdi.jpg',
    blur: false,
  },
  {
    pdf: 'screencapture-catodoo-catsrlpalermo-it-odoo-action-1164-2-2026-07-02-09_28_22.pdf',
    out: 'odoo-product-sync.jpg',
    blur: true,
  },
]

async function blurSensitiveRegions(buffer) {
  const image = sharp(buffer)
  const meta = await image.metadata()
  const w = meta.width ?? 1200
  const h = meta.height ?? 800

  const zones = [
    { left: 0, top: 0, width: Math.round(w * 0.28), height: h },
    { left: Math.round(w * 0.68), top: 0, width: Math.round(w * 0.32), height: Math.round(h * 0.14) },
    { left: Math.round(w * 0.52), top: Math.round(h * 0.1), width: Math.round(w * 0.46), height: Math.round(h * 0.22) },
    { left: 0, top: Math.round(h * 0.86), width: w, height: Math.round(h * 0.14) },
  ]

  const composites = []
  for (const zone of zones) {
    const blurred = await sharp(buffer)
      .extract(zone)
      .blur(18)
      .toBuffer()
    composites.push({ input: blurred, left: zone.left, top: zone.top })
  }

  return sharp(buffer).composite(composites).jpeg({ quality: 82 }).toBuffer()
}

await fs.mkdir(OUT, { recursive: true })

for (const { pdf: pdfName, out, blur } of files) {
  const src = path.join(DOWNLOADS, pdfName)
  const doc = await pdf(src, { scale: 2 })
  let buffer = await doc.getPage(1)

  if (blur) {
    buffer = await blurSensitiveRegions(buffer)
  } else {
    buffer = await sharp(buffer).jpeg({ quality: 85 }).toBuffer()
  }

  const dest = path.join(OUT, out)
  await fs.writeFile(dest, buffer)
  const info = await sharp(dest).metadata()
  console.log(`✓ ${out} (${info.width}x${info.height})`)
}
