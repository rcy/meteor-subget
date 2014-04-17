if (Meteor.isClient) {
  SubGet = new Meteor.Collection(null);

  Meteor.Collection.prototype.sub = function (publication) {
    var self = this;

    if (self._sub) return;
    self._sub = true;

    Deps.autorun(function () {
      var ids = SubGet.find({collection: self._name},
                            {fields: {collection: 1, id: 1}})
            .map(function (doc) {
              return doc.id;
            });
      publication = (publication || ('subget-' + self._name));

      Meteor.subscribe(publication, ids, {
        onError: function (error) {
          console.warn(error.reason, ':', publication, ids);
        },
        onReady: function () {
          console.info('subscription ready:', publication, ids);
        }
      });
    });
  };

  Meteor.Collection.prototype.get = function (id) {
    check(id, String);
    var self = this;

    SubGet.upsert({collection: self._name, id: id},
                  {$set: {collection: self._name, id: id, updated: new Date()},
                   $inc: {gets: 1}});


    // Subscribe automatically.  Wrap in defer so we do not have the
    // subscription autorun nested a reactive computation.
    Meteor.defer(function () {
      self.sub();
    });

    return self.findOne({_id: id});
  };
}
