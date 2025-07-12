import { Client } from 'pg'

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  })

  try {
    await client.connect()
    const result = await client.query('SELECT * FROM skills ORDER BY id')
    res.status(200).json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch skills' })
  } finally {
    await client.end()
  }
}
