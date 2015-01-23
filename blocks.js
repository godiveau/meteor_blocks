  var connection = DDP.connect("http://blocks.meteor.com");
  Boxes = new Mongo.Collection("boxes", {connection: connection});

if (Meteor.isClient) {
  // counter starts at 0


  Template.hello.helpers({
boxes: function () {
      return Boxes.find();
      }
  });

  Template.hello.events({
"mousedown shape": function (event) {
      lx = event.layerX; ly = event.layerY;
    },
    "mouseup shape": function (event) {
      if(lx != event.layerX || ly != event.layerY) return;

      if (event.button === 1) {
        // left click to add box

        // calculate new box position based on location of click event
        // in 3d space and the normal of the surface that was clicked
        var x = Math.floor(event.worldX + event.normalX / 2) + 0.5,
          y = Math.floor(event.worldY + event.normalY / 2) + 0.5,
          z = Math.floor(event.worldZ + event.normalZ / 2) + 0.5;
        var c = Random.hexString(2);
        var color = "#"+c+c+c;
        Boxes.insert({ x: x, y: y, z: z, color: color});
      } else if (event.button === 4 || event.button === 2) {
        // right click to remove box
        Boxes.remove(event.currentTarget.id);
      }
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
