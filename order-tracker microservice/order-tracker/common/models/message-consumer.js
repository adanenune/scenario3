module.exports = function(Messageconsumer) {

  Messageconsumer.remoteMethod('startPolling',
        {
            http: {path:'/start', verb:'post'},
            returns: {arg:'state',vtype:'object'}
        }
  );

  Messageconsumer.startPolling = function(callback) {
    Messageconsumer.app.models.MessageHubProxy.startComsumer("order_events",function(err, emitter){
      callback(err, "polling about to start...");
      emitter.on('order-event',function(data){
          console.log("data received by the emitter: " + data);
          for(var i=0; i<data.length; i++){
            myevent = JSON.parse(data[i]);
            newOder = {
              customerId : myevent.customerId,
              description : myevent.description,
              orderId : myevent.orderId,
            };
            newEvent = {
              orderId : myevent.orderId,
              eventId : myevent.eventId,
              time : myevent.time,
              type : myevent.type,
            };
            Messageconsumer.app.models.Order.findById(myevent.orderId,function(err,instance){
              if (err){
                emitter.emit('error',err);
              } else {
                if (!instance){
                  Messageconsumer.app.models.Order.create(newOder, function(err, object){
                    console.log("new order created: " + JSON.stringify(object));
                  });
                }
                Messageconsumer.app.models.OrderEvent.create(newEvent, function(err, object){
                    console.log("new order-event created: " + JSON.stringify(object));
                });
              }
            });
          }
      });
    });
  };


};
