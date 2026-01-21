const app = require('./app');

const PORT = 3000;


app.listen(PORT, function(){
    console.log('servidor funcionando en el puerto ' + PORT);
})