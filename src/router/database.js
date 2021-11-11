const mysql =  require('mysql');

const mysqlConnection =  mysql.createConnection({
    host:'127.0.0.1',
    database: 'person',
    port :'3307',
    user:'root',  
    password:'skilltest',
});   
 
mysqlConnection.connect(function (err){
    if(err){
        console.log(err); 
    }else{
        console.log('ok'); 
    }
}); 

module.exports = mysqlConnection;
 
 