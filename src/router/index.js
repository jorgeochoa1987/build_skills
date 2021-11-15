const express = require('express');
const router = express.Router();

const mysqlConnection = require('./database');
router.get('/',(req,res)=>{
    mysqlConnection.query('SELECT * FROM persons', (err, rows, fields)=>{
 
     if(!err){
 res.json(rows);
     }
     else{
        res.json(err);
    }
    });
 
 });
 router.get('/list-adopt',(req,res)=>{
    mysqlConnection.query(`select p.fullname , p.type, (select p.fullname from persons as p  where p.id= pp.id_adopt)as child from persons as p Left JOIN parent_persons as pp on p.id = pp.id_person where p.type ='mother' or p.type ='father'`, (err, rows, fields)=>{
 
     if(!err){
 res.json(rows);
     }
     else{
        res.json(err); 
    }
    });
 
 });


 router.get('/:id',(req, res)=>{
const {id} = req.params;
console.log(id);
mysqlConnection.query('SELECT * from persons where id = ?',[id],(err, rows, fields) =>{
    if(!err){
        res.json(rows[0]);
            }
            else{
               res.json(err);
           } 
        });
 });

router.post('/create',(req,res)=>{
   const{ fullname, birth, type} = req.body;
   const query = `INSERT INTO persons (id, fullname, birth, type) VALUES (NULL, ?, ?, ?)`;
      mysqlConnection.query(query,[fullname, birth, type], (err, rows, fields)=>{
    if(!err){
        res.json({Status:'persons Save'});
            }
            else{
                console.log(err);
               res.json({Status: err});
           } 
   });

});
router.get('/update/:id',(req,res)=>{
    const {id} = req.params; 
    const{ fullname, birthday} = req.body;
    const query = `UPDATE persons SET fullname = ?,birth = ? WHERE id = ?`;
    mysqlConnection.query(query,[fullname,birthday,id],(err, rows, fields) =>{
        if(!err){
            res.json({Status:'persons UPDATE'});
                }
                else{
                   res.json(err);
               } 
            });
});

router.get('/delete/:id',(req,res)=>{
    const {id} = req.params;
    const query = `Delete from  persons WHERE id = ?`;
    mysqlConnection.query(query,[id],(err, rows, fields) =>{
      
     if(!err){
        res.json(rows);
            }
            else{
               res.json(err);
           }
           
            });
});

router.post('/adopt/',(req,res)=>{
    const{ id_adopt, id_person} = req.body;

    const query = `INSERT INTO parent_persons (id, id_adopt, id_person) VALUES (NULL, ?, ?)`;
    mysqlConnection.query(query,[id_adopt, id_person],(err, rows, fields) =>{
        if(!err){
            res.json({Status:'Create Adopt'});
                }
                else{
                   res.json(err);
               } 
            });
});



module.exports = router; 