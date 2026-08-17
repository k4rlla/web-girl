const http = require("http");
const fs = require('node:fs');
const ini = require('ini');

const config = ini.parse(fs.readFileSync('./settings.ini', 'utf-8'));
const port = config.server.port;
const www_dir = config.documents.www_dir;

let server = http.createServer((req, res) => {
  
  let conteudo = '';
  let url = req.url.replace("/", "");

  if(url === ""){
    url = config.navigate.index;
  }
  
  console.log(url);
  
  fs.readFile(`./${www_dir}/${url}.html`, 'utf8', (err,data) =>{    
    conteudo = data;
    res.setHeader('Content-type', 'text/html');
    res.end(conteudo);
    
  }); 
  
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
