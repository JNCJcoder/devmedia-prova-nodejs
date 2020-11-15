const express = require("express");
const nunjucks = require("nunjucks");
require('dotenv').config();

const indexPage = require("./routes/index");
const noticiaPage = require("./routes/noticia");
const { criarPostagem, criarPostagemPage } = require("./routes/criar-postagem");

class App {
    constructor() {
      this.app = express();
      this.server = express.Router();
  
      this.middlewares();
      this.routes();
      this.app.use(this.server);
    }
  
    middlewares() {
        this.server.use(express.static("public"));
        this.server.use(express.urlencoded({ extended: true }));

        nunjucks.configure("src/views", {
            express: this.app,
            autoescape: false,
            noCache: true,
        });
    }
  
    routes() {
      this.server
        .get("/", indexPage)
        .get("/noticia", noticiaPage)
        .get("/criar-postagem", criarPostagemPage)
        .post("/criar-postagem", criarPostagem);
    }
}

const server = new App().app;

server.listen(process.env.PORT, () => {
    console.log("Server is running");
});