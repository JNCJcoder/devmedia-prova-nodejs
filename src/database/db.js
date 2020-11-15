const sqlite = require("sqlite3");

class Database {
    constructor(){
        this.db = new sqlite.Database(process.env.DB_ADDRESS);
        this.createTable();
    }

    createTable(){
        this.db.run('CREATE TABLE IF NOT EXISTS noticias(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT NOT NULL, categoria TEXT NOT NULL, conteudo TEXT NOT NULL)');
    } 

    addData(titulo, categoria, conteudo){
        this.db.run('INSERT INTO noticias(titulo,categoria,conteudo) VALUES(?,?,?)', 
        [titulo, categoria, conteudo], function(err) {
            if (err) {
              return console.log(err.message);
            }

            return true;
        });
    }

    getAllData(){
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM noticias`, function (err, rows) {
                if (err) {
                  console.log(err);
                  reject([]);
                }
    
                resolve(rows);
            });
        });
        
    }

    getData(searchString){
        return new Promise((resolve, reject) => {
            // https://stackoverflow.com/questions/3632413/in-sqlite3-how-can-i-do-sql-escaping-in-a-like-clause
            this.db.all(`SELECT * FROM noticias WHERE titulo LIKE '%' || ? || '%'`,
            [searchString], function (err, rows) {
            if (err) {
              console.log(err);
              reject([]);
            }

            resolve(rows);
            });
        });
    }

    getDataByID(id){
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM noticias WHERE id = ?`,
            [id], function (err, rows) {
            if (err) {
              console.log(err);
              reject([]);
            }

            resolve(rows);
            });
        });
    }
}

module.exports = new Database();