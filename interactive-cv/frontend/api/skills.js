import { Client } from 'pg'

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // ← WAJIB untuk Neon
  })

  try {
    await client.connect()
    const { rows } = await client.query('SELECT * FROM skills') // ← cek nama tabel
    res.status(200).json(rows)
  } catch (err) {
    console.error('Database Error:', err)
    res.status(500).json({ error: 'Failed to load skills' })
  } finally {
    await client.end()
  }
}
