const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API = 'https://why-mba360-api.onrender.com';
const count = process.argv[2] || 3;

(async () => {
  for (let i = 0; i < count; i++) {
    const id = Math.floor(Math.random() * 10000);
    const res = await fetch(API + '/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Seed ' + id,
        email: 'seed' + id + '@test.com',
        phone: '900000' + String(id).padStart(4, '0')
      })
    });
    console.log(await res.text());
  }
})();
