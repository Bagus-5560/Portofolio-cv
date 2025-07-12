// api/test.js
export default function handler(request, response) {
  response.status(200).json({ 
    message: 'Tes API berhasil! Jika kamu lihat ini, routing dasar Vercel bekerja.' 
  });
}