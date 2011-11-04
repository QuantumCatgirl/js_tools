function EventHandler() {
  var events = {};
  var self = this;
  this.events = events;
  
  this.log_events = false;
  
  function bind(key, callback) {
    
    // handle multiple events: event_handler.bind(['first_event', 'seccond_event'], callback)
    if (typeof(key) == 'object') {
      for (var e in key) {
        events[key[e]] = events[key[e]] || [];
        events[key[e]].push(callback);
      }
    }
    // handle events identified by strings: event_handler.bind('an_event', callback)
    else {
      events[key] = events[key] || [];
      events[key].push(callback);
    }
  };
  this.bind = bind;

  function unbind(key, callback){
    for (var i in events[key]) {
      if (events[key][i] == callback) {
        events[key].splice(i, 1);
      }
    }
  };
  this.unbind = unbind;

  function fire() {
    var args = Utils.arrayify_arguments(arguments);
    var key = args.shift();
    
    if (self.log_events) console.log(key, self, args);
    
    if (!(args instanceof Array)) { args = [args]; }
    
    if (events[key] && events[key].length > 0) {
      for (var i in events[key]) {
        var func = events[key][i];
        func.apply(self, args);
      }
    }
  };
  this.fire = fire;
};

window.event_handler = new EventHandler();

