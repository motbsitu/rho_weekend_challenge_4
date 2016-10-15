var router = require('express').Router();
var pg = require('pg');

var config = {
    database: 'weekend4' //provide name of database
};

//initialize the database connection pool
var pool = new pg.Pool(config);

//create new book
router.post('/', function(req, res) {
    pool.connect(function(err, client, done) {
        if (err) {
            //printout err
            console.log('Error connecting to the DB', err);
            res.sendStatus(500); //send something to client
            done(); //releases connection
            return;
        }

        client.query('INSERT INTO todo (task) VALUES ($1) returning *;', //$1, etc placeholder
            [req.body.task],
            function(err, result) {
                done();
                if (err) {
                    console.log("error querying database", err);
                    res.sendStatus(500);
                    return;
                }
                res.send(result.rows);

            });
    });
});

router.get('/', function(req, res){
  pool.connect(function(err, client, done){
    if(err){
      console.log('error connecting to db', err);
      res.sendStatus(500);
      done();
      return;
    }
    client.query('SELECT * from todo', function(err, result){
      done();
      if(err){
        console.log('error querying to db2', err);
        res.sendStatus(500);
        done();
        return;
      }
      console.log('got rows from db', result.rows);
      res.send(result.rows);

    });
  });
});

module.exports = router;
