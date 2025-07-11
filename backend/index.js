// backend/index.js
const express = require('express');
const cors = require('cors');
// Impor library untuk konek ke database Vercel Postgres (Neon)
const { sql } = require('@vercel/postgres');

const app = express();

app.use(cors());
app.use(express.json());

// Endpoint untuk mengambil data pendidikan
app.get('/api/education', async (req, res) => {
    try {
        // Menjalankan query SQL ke tabel 'education' di NeonDB
        const { rows } = await sql`SELECT * FROM education;`;
        res.json(rows);
    } catch (error) {
        console.error('Gagal mengambil data education:', error);
        res.status(500).json({ error: 'Gagal mengambil data dari database' });
    }
});

// Endpoint untuk mengambil data skills
app.get('/api/skills', async (req, res) => {
    try {
        // Menjalankan query SQL ke tabel 'skills' di NeonDB
        const { rows } = await sql`SELECT * FROM skills;`;
        res.json(rows);
    } catch (error) {
        console.error('Gagal mengambil data skills:', error);
        res.status(500).json({ error: 'Gagal mengambil data dari database' });
    }
});

// Endpoint untuk mengambil data projects
app.get('/api/projects', async (req, res) => {
    try {
        // Menjalankan query SQL ke tabel 'projects' di NeonDB
        const { rows } = await sql`SELECT * FROM projects;`;
        res.json(rows);
    } catch (error) {
        console.error('Gagal mengambil data projects:', error);
        res.status(500).json({ error: 'Gagal mengambil data dari database' });
    }
});

// Di Vercel, kita tidak perlu app.listen. Cukup ekspor app-nya.
module.exports = app;