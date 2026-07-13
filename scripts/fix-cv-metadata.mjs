import { promises as fs } from 'node:fs'
import path from 'node:path'
import { PDFDocument } from 'pdf-lib'

const pdfPath = path.resolve('public/cv-marco-de-lisi-2026.pdf')
const bytes = await fs.readFile(pdfPath)
const pdf = await PDFDocument.load(bytes)

pdf.setTitle('Marco De Lisi CV 2026')
pdf.setAuthor('Marco De Lisi')
pdf.setSubject('Curriculum Vitae')
pdf.setKeywords(['CV', 'Marco De Lisi', 'Full Stack Developer', '2026'])
pdf.setProducer('Marco De Lisi Portfolio')
pdf.setCreator('Marco De Lisi')

const updated = await pdf.save()
await fs.writeFile(pdfPath, updated)
console.log('✓ PDF metadata aggiornati: Marco De Lisi CV 2026')
