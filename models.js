Things = new Meteor.Collection('things');
Owners = new Meteor.Collection('owners');
Rooms = new Meteor.Collection('rooms');

if (Meteor.isServer) {
  Things.remove({});
  Owners.remove({});
  Rooms.remove({});
  var owners = [ Owners.insert({name: 'alice'}),
                 Owners.insert({name: 'bob'}),
                 Owners.insert({name: 'carol'}) ];
  var rooms = [ Rooms.insert({name: 'kitchen'}),
                Rooms.insert({name: 'bathroom'}),
                Rooms.insert({name: 'living room'}) ];
  Things.insert({name: 'table', roomId: rooms[0], ownerId: owners[0]});
  Things.insert({name: 'chair', roomId: rooms[1], ownerId: owners[0]});
  Things.insert({name: 'desk', roomId: rooms[2], ownerId: owners[1]});
  Things.insert({name: 'couch', roomId: rooms[0], ownerId: owners[1]});
  Things.insert({name: 'sink', roomId: rooms[1], ownerId: owners[2]});
  Things.insert({name: 'window', roomId: rooms[2], ownerId: owners[2]});
}
