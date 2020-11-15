const noticiaController = require("../controller/noticiaController");

const index = async (req, res) => {
    const { search } = req.query;

    if (search == "" || !search) {
        const [noticias, total] = await noticiaController.index();

        return res.render("index.html", { noticias, total });
    }

    const [noticias, total] = await noticiaController.read(search);

    return res.render("index.html", { noticias, total });
}

module.exports = index;