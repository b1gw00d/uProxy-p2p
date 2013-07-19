var extPort;

window.freedomcfg = function(register) {
  register("core.view", View_proxy);
}

var View_proxy = function(channel) {
  this.host = null;
  this.win = null;
  this.channel = channel;
};

View_proxy.prototype.open = function(args, continuation) {
  console.log('open w/ ' + args);
  continuation({});
}

View_proxy.prototype.show = function(continuation) {
  continuation();
}

View_proxy.prototype.postMessage = function(args, continuation) {
  continuation();
}

View_proxy.prototype.close = function() {
}

var script = document.createElement('script');
script.setAttribute('data-manifest', 'js/uproxy.json');
script.src = 'js/freedom/freedom.js';
document.head.appendChild(script);

chrome.runtime.onConnectExternal.addListener(function(port) {
  extPort = port;
  extPort.onMessage.addListener(onExtMsg);
});

function onExtMsg(msg) {
  if (msg.cmd == 'emit') {
    freedom.emit(msg.type, msg.data);
  } else if (msg.cmd == 'on') {
    freedom.on(msg.type, function (ret) {
      extPort.postMessage({
        cmd: 'on',
        type: msg.type,
        data: ret
      });
    });
  } else if (msg.cmd == 'once') {
    freedom.once(msg.type, function (ret) {
      extPort.postMessage({
        cmd: 'once',
        type: msg.type,
        data: ret
      });
    });
  }
};
