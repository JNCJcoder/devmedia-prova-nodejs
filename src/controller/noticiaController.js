const db = require('../database/db');

module.exports = {
    create(titulo, categoria, conteudo){
        db.addData(titulo, categoria, conteudo);
    },

    index(){
        return new Promise(async (resolve) => {
            const data = await db.getAllData();
            resolve([data, data.length]);
        }); 
    }, 

    read(searchString){
        return new Promise(async (resolve) => {
            const data = await db.getData(searchString);
            resolve([data, data.length]);
        }); 
    },

    readID(id) {
        return new Promise(async (resolve) => {
            const data = await db.getDataByID(id);
            resolve(data[0]);
        }); 

    }
}