const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require('body-parser');
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 

app.set('view engine', 'ejs');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'compreprodutos',
    password: '1234'
})

app.get('/', function (req, res) {
    res.render('pages/')
});

app.get('/produtos', function (req, res) {
    conn.query("SELECT * FROM PRODUTOS", function(err, resul) {
        let produtos = resul;
        res.render('pages/produtos', {"produtos":produtos})
    })
})

app.get('/produtos/:id', function (req, res) {
    conn.query("SELECT * FROM PRODUTOS WHERE idProduto=?",[req.params.id] , function(err, resul) {
        let produto = resul;
        res.render('pages/VerProduto', {"produto":produto})
    })
})

app.get('/produtos/cadastrar', function (req, res) {
    res.render('pages/CriarProdutos')
})
app.post('/produtos/cadastrar', function (req, res) {
    conn.query("INSERT INTO PRODUTOS(Nome, Preco, Peso, Categoria, Empresa) VALUES (?,?,?,?,?)", [req.body.nome, req.body.preco, req.body.peso, req.body.categoria, req.body.empresa], function(err, resul) {
        if (err) throw err;
        res.redirect('pages/produtos');
    })
})

app.get('/produtos/editar/:id', function (req, res) {
    conn.query("SELECT * FROM PRODUTOS WHERE idProduto=?", [req.params.id], function(err, resul) {
        let produtos = resul;
        res.render('pages/Editarss',{'produtos': produtos});
    })
})

app.get('/produtos/deletar/:id', function (req, res) {
    conn.query("SELECT * FROM PRODUTOS WHERE idProduto=?", [req.params.id], function(err, resul) {
        let produtos = resul;
        res.render('pages/DeletarProdutos', {'produtos': produtos});
    })
})
app.post('/produtos/deletar/:id', function (req, res) {
    conn.query("DELETE FROM PRODUTOS WHERE idProduto=?", [req.params.id], function(err, resul) {
        res.redirect('../')
    })
})

app.listen(8090);