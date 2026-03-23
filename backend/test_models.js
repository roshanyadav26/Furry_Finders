const https = require('https');
require('dotenv').config();

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models?key=${process.env.GEMINI_API_KEY}`,
  method: 'GET'
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const list = JSON.parse(data);
    const names = list.models ? list.models.map(m => m.name).filter(n => n.includes('gemini')) : list;
    console.log("AVAILABLE MODELS:", names);
  });
});
req.on('error', (e) => console.error(e));
req.end();
