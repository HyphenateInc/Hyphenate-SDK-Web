# Changelog

## v1.4.6

### Features

* add demo.html

### Bug Fixes

* to decoupling from Demo namespaces, delete codes using Demo
* delete connection.prototype.createRoom, which is not supported by server

## v1.4.5

### Features

* GNU version number: `Major_Version_Number.Minor_Version_Number.Revision_Number`
* support webrtc
* while http access,use ip directly instead of ServerName,avoid DNS hijacking.  `isHttpDNS:true`

### Bug Fixes

* does not update contact list UI after destory group
* does not call the callback function after send out the cmd message

## v1.1.4

* add browser version support umd
* remove strophe from sdk because it't too big for webpack or other compiler


# How to install

Run `npm install hyphenate-web --save`

```
require('hyphenate-web');
```

```
Demo.conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    isAutoLogin: false,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval
});
```

# How to release

`npm install`

`npm run build`
