const express = require('express');
const app = express();
const  morgan = require('morgan');

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
/* We are stating the server*/
/* with morgen can i get the status server */
app.use(morgan(`combined`)); 
app.use(express.urlencoded({extended:false}));
app.use(express.json());
 
/* now i can create the routes */
app.use(require('./router/index'));

/*Listeners */
app.listen(app.get('port'),()=>{
console.log('server', app.get('port'));
});