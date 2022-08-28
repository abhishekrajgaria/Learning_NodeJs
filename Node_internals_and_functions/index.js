process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");

// Is the file being executed in master mode ?
if (cluster.isMaster) {
  // Cause index.js to be executed again
  // in child mode
  cluster.fork();
  cluster.fork();
} else {
  // Execute in child mode
  const express = require("express");
  const crypto = require('crypto');
  const app = express();


  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 10000, 512, "sha512", () => {
      res.send('Hi There!');
    });
  });

  app.get('/fast',(req,res)=>{
    res.send('This was fast!');
  });
  app.listen(3000);

}
