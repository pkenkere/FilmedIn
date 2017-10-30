var path = require('path');

var EM = require(path.join(__dirname, '..', 'modules', 'equipment-manager'));

module.exports = function(app) {
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
};
