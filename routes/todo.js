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
                    console.log("error querying database1", err);
                    res.sendStatus(500);
                    return;
                }
                res.send(result.rows);

            });
    });
});

router.get('/:id', function(req, res) {
    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        }
        client.query('SELECT * FROM todo WHERE id =$1;', [req.params.id], function(err, result) {
            done();
            if (err) {
                console.log('Error querying to the DB2', err);
                res.sendStatus(500);
                return;
            }
            console.log('Got rows from the DB:', result.rows);
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
        console.log('error querying to db3', err);
        res.sendStatus(500);
        done();
        return;
      }
      console.log('got rows from db', result.rows);
      res.send(result.rows);

    });
  });
});

router.delete('/:id', function(req, res){
  var id = req.params.id;
  pool.connect(function(err,client, done){
    try{
      if(err){
        console.log('Error connecting to the DB', err);
            res.sendStatus(500); //send something to client
            return;
      }
      client.query('DELETE FROM todo WHERE id=$1', [id], function (err){
        if(err){
                  console.log('Error querying database4', err);
                  res.sendStatus(500);
                  return;
                }
                res.sendStatus(204);
      });
    }finally{
      done();
    }
  });
});

router.put('/:id', function(req, res){
  var id = req.params.id;
  var id = req.body.task;
  var id = req.body.complete;

  pool.connect(function(err, client, done) {
      try{
      if (err) {
          //printout err
          console.log('Error connecting to the DB', err);
          res.sendStatus(500); //send something to client
          return;
      }
      client.query('UPDATE todo SET complete=$1 WHERE id=$2 RETURNING *;',
      [complete],
      function(err, result){
                    if (err){
                      console.log('Error querying database', err);
                      res.sendStatus(500);
                      return; //stop executing if error
                    }
                    res.send(result.rows);
                  });
    }finally{
      done();
    }
  });
});

module.exports = router;
