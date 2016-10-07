
var MessageHub = require('message-hub-rest');
var events = require('events');

module.exports = function(Messagehubproxy) {

  var defaultProperties =
  {
    "messagehub": [
    {
      "name": "Message Hub-hk",
      "label": "messagehub",
      "plan": "standard",
      "credentials":   {
          "mqlight_lookup_url": "https://mqlight-lookup-prod02.messagehub.services.eu-gb.bluemix.net/Lookup?serviceId=efbc8efb-920e-4ce0-adcb-77a10c22002f",
          "api_key": "i76hACf78WCmpWlp3owfezyyiYmAnF9l6xWpYTzHVVcxy1FQ",
          "kafka_admin_url": "https://kafka-admin-prod02.messagehub.services.eu-gb.bluemix.net:443",
          "kafka_rest_url": "https://kafka-rest-prod02.messagehub.services.eu-gb.bluemix.net:443",
          "kafka_brokers_sasl": [
            "kafka01-prod02.messagehub.services.eu-gb.bluemix.net:9093",
            "kafka02-prod02.messagehub.services.eu-gb.bluemix.net:9093",
            "kafka03-prod02.messagehub.services.eu-gb.bluemix.net:9093",
            "kafka04-prod02.messagehub.services.eu-gb.bluemix.net:9093",
            "kafka05-prod02.messagehub.services.eu-gb.bluemix.net:9093"
          ],
          "user": "xxxx",
          "password": "xxxx"
      }
   }]
  }

  var services = process.env.VCAP_SERVICES || defaultProperties;

  this.hubInstance = new MessageHub(services);

  Messagehubproxy.topics = function(cb){
    console.log(JSON.stringify(services));
    hubInstance.topics.get()
      .then(function(result) {
        cb (null, result);
      })
      .fail(function(error) {
        console.error(error);
        cb (err, null);
      });
  };

  Messagehubproxy.produce = function (message, topic, cb){
    var list = new MessageHub.MessageList([message]);
    hubInstance.produce(topic, list.messages)
      .then(function(response){
          console.log(response);
          cb(null,response);
      })
      .fail(function(error){
          console.log(error.stack);
          cb(error,null);
      });
  };

  Messagehubproxy.startComsumer = function (topic, cb){
    var consumer;
    var receivedMessage = 0;
    var mhEventEmitter = new events.EventEmitter();
    mhEventEmitter.on('error',function(err){
      console.error(err);
    });
    cb(null,mhEventEmitter);
    hubInstance.consume('order-tracker-group', 'order-tracker-c1', {'auto.offset.reset':'largest'})
      .then(function(response) {
        consumer = response[0];
        var consumeInterval = setInterval(function () {
          consumer.get(topic)
            .then(function(data){
              receivedMessage++;
              mhEventEmitter.emit('order-event',data);
            })
            .fail(function(error){
              console.error(error);
            })
        }, 10000);
      })
  };

};
