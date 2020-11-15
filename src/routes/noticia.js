const noticiaController = require("../controller/noticiaController");

const noticia = async (req, res) => {
    const { id } = req.query;

    if (id == "" || !id) {
        const noticias = await noticiaController.index();
        const total = noticias.length;

        return res.render("index.html", { noticias, total });
    }

    const noticia = await noticiaController.readID(id);

    return res.render("noticia.html", { noticia });
}

module.exports = noticia;