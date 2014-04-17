UI.registerHelper('things', function () {
  return Things.find();
});


UI.body.helpers({
  owner: function () {
    return Owners.get(this.ownerId);
  },
  room: function () {
    return Rooms.get(this.roomId);
  }
});
