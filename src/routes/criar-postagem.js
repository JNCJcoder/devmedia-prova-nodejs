const noticiaController = require('../controller/noticiaController');

const criarPostagemPage = (_req, res) => {
    return res.render("criar-postagem.html");
}

const criarPostagem = (req, res) => {
    const { titulo, categoria, conteudo } = req.body;

    if(!titulo || !categoria || !conteudo){
        return res.render("criar-postagem.html", { msg: "Preencha os campos corretamente!" });
    }

    noticiaController.create(titulo, categoria, conteudo);

    return res.render("criar-postagem.html", { msg: "Criado com Sucesso!" });
}

module.exports = { criarPostagem, criarPostagemPage };