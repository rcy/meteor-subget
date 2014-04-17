if (Meteor.isClient) {
  Meteor.subscribe('things');
}

if (Meteor.isServer) {
  Meteor.publish('things', function () {
    return Things.find();
  });
}
