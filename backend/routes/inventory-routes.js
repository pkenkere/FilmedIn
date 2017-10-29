var path = require('path');

var controller = require(path.join(__dirname, '..', 'modules', 'inventory-controller'));

module.exports = function(app, db) {
  app.get("/inventory", function(req, res){
    controller.getAllInventoryItems(function(err,announcements){
      if(!err){
        res.send(announcements);
      }
    });
  });

  app.post("/inventory", function(req,res){
    controller.addInvItem(req.body, function (err, o) {
      if(err) res.status(400).send("error-adding-item");
      else {
        res.status(200).send('ok, item added');
      }
    });
  });

  
}
