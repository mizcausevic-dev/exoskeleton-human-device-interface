import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const payloadRoot = path.resolve('binary-payload')

async function exists(dir) {
  try {
    await readdir(dir)
    return true
  } catch {
    return false
  }
}

if (!(await exists(payloadRoot))) {
  console.log('No binary-payload directory; leaving tracked binaries as they are.')
  process.exit(0)
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else files.push(full)
  }
  return files
}

const parts = (await walk(payloadRoot)).filter((file) => file.endsWith('.b64part'))
const groups = new Map()

for (const file of parts) {
  const relative = path.relative(payloadRoot, file)
  const match = relative.match(/^(.*)\.(\d+)\.b64part$/)
  if (!match) continue
  const target = match[1]
  const index = Number(match[2])
  const list = groups.get(target) ?? []
  list.push({ index, file })
  groups.set(target, list)
}

if (groups.size === 0) {
  console.log('binary-payload contained no .b64part files.')
  process.exit(0)
}

for (const [target, list] of groups) {
  list.sort((a, b) => a.index - b.index)
  const encoded = []
  for (const item of list) encoded.push(await readFile(item.file, 'utf8'))
  const bytes = Buffer.from(encoded.join(''), 'base64')
  const destination = path.resolve(target)
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, bytes)
  console.log(`Decoded ${list.length} parts -> ${target} (${bytes.length} bytes)`)
}
