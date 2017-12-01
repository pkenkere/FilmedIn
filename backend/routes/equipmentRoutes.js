var path = require('path');

var EM = require(path.join(__dirname, '..', 'modules', 'equipment-manager'));
var ED = require(path.join(__dirname, '..', 'modules', 'email-dispatcher'));
var PM = require(path.join(__dirname, '..', 'modules', 'profile-manager'));

module.exports = function(app,db) {
  //Initialize the database
  EM.init(db);
  PM.init(db);

  app.post('/equipment', function(req, res) {
    EM.getEquipByName(req.param('name'), function(e, o) {
      if (e) {
        res.status(400).send('error with equipment');
      }
      else if (!o) {
        EM.addEquipment({
          name : req.param('name'),
          category : req.param('category'),
          available : req.param('available')
        }, function(e, o) {
          if (e) {
            res.status(400).send('error adding equipment');
          }
          else {
            res.status(200).send('ok, new equipment added');
          }
        });
      }
      else {
        EM.updateEquipment({
          name : req.param('name'),
          category : req.param('category'),
          available : req.param('available'),
        }, function(e, o) {
          if (e)
            res.status(400).send('error updating equipment');
          else
            res.status(200).send('ok, account updated');
        });
      }
    });
  });

  app.get('/equipments', function(req, res) {
    EM.getAllEquipments(function(e, o) {
      if (e)
        res.send('error in getting all equipments');
      else {
        //res.setHeader('Content-Type', 'application/json');
        res.send(o);
      }
    });
  });

  app.post('/deleteEquipment', function (req, res) {
    EM.deleteEquipment(req.param('name'), function(e, o) {
      if (e) {
        res.status(500).send('error deleting equipment');
      }
      else {
        res.status(200).send('ok, equipment deleted');
      }
    });
  });

  app.post('/cancelEquipment', function(req, res) {
    PM.getProfileByEmail(req.body.email, function(e, o) {
      if (e) {
        res.status(400).send('error cancelling');
      }
      else {
        // send email for cancellation
        // var equips = o.equipments;

        var checkoutReq = {
          user: req.body.email,
          equipments: req.body.equipments
        };

        ED.dispatchEquipmentCancellation(checkoutReq, function(e){
          if (!e) {
            //res.status(200).send('ok, email was dispatched to admin about the equipment request');
            //equips.splice(req.body.index, 1);
            var newData = {
              flag : true,
              equipments : new Array(),
              dateFrom : '',
              dateTo : ''
            }

            PM.updateProfile(req.body.email, newData, function(e, o) {
              if (e) {
                res.status(400).send('error cancelling checked out equipments to account');
              }
              else {
                res.status(200).send('ok, cancel done');
              }
            });
          }
          else {
            res.status(400).send('unable to dispatch cancel equipment request email');
          }
        });
      }
    });
  });

  app.post('/equipment/checkout', function(req, res) {
    var checkoutReq = {
      email : req.body.email,
      //size : req.body.size
      equipments : req.body.equipments,
      dateFrom : req.body.dateFrom,
      dateTo : req.body.dateTo
    };
    //checkoutReq.equipments = req.body.equipments;

    // Update Profile!!!
    ED.dispatchEquipmentCheckout(checkoutReq, function(e){
      if (!e) {
        //res.status(200).send('ok, email was dispatched to admin about the equipment request');
        var newData = {
          flag : false,
          dateFrom : req.body.dateFrom,
          dateTo : req.body.dateTo,
          equipments : req.body.equipments
        };

        PM.updateProfile(req.body.email, newData,
          function (e, o) {
            if (e) {
              res.status(400).send('error adding checked out equipments to account');
            }
            else {
              console.log('new checkout equipments added');
              res.status(200).send(o);
            }
          });
      }
      else {
        res.status(400).send('unable to dispatch equipment request email');
      }
    });
  });

  app.post('/deleteEquipment', function(req, res) {
    EM.deleteEquipment(req.body.id, function(e) {
      if (e)
        res.status(400).send('error while deleting equipment');
      else
        res.status(200).send('equipment deleted');
    });
  });

  app.post('/resetEquipments', function(req, res) {
    EM.delAllRecords(function(){
      res.send('ok');
    });
  });

};
