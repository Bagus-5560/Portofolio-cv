// backend/data.js
const educationHistory = [
{ id: 1, period: '2019 - 2022', institution: 'SMK Negeri 2 Temanggung', major: 'Teknik Komputer dan Jaringan' },
{ id: 2, period: '2022 - Sekarang', institution: 'Universitas AMIKOM', major: 'S1 - Teknik Informatika' }
];
const skills = [
{ name: 'Vue.js', level: 'Mahir' }, { name: 'JavaScript', level:'Mahir' },
{ name: 'Tailwind CSS', level: 'Mahir' }, { name: 'Node.js', level:'Menengah' },
{ name: 'Express.js', level: 'Menengah' }, { name: 'PostgreSQL',level: 'Menengah' },
{ name: 'Git & GitHub', level: 'Mahir' }, { name: 'HTML5 & CSS3',level: 'Mahir' },
];
const projects = [ 
{ name: 'Vue.js', level: 'Mahir' }, { name: 'JavaScript', level:'Mahir' },
{ name: 'Tailwind CSS', level: 'Mahir' }, { name: 'Node.js', level:'Menengah' },
{ name: 'Express.js', level: 'Menengah' }, { name: 'PostgreSQL',level: 'Menengah' },
{ name: 'Git & GitHub', level: 'Mahir' }, { name: 'HTML5 & CSS3',level: 'Mahir' },
];
module.exports = { educationHistory, skills, projects };