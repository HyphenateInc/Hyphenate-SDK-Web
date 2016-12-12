#ChangeLog:

##v1.4.5 @ 2016-12-01

###Feature

- GNU version number: `Major_Version_Number.Minor_Version_Number.Revision_Number` (new v1.4.5 = old v1.1.4.5)
- [demo] friends can video chat to each other (support https + Webkit only)
- [demo] limite of a single user the number of opened tabs in the same browser `isMultiLoginSessions:true`
- [demo] while http access,use ip directly instead of ServerName,avoid DNS hijacking.  `isHttpDNS:true`
- [sdk]  add tow way to load websdk:
    -  `<script>` tag
    
    ```
    <script src='http://downloads.easemob.com/downloads/cdn/websdk-1.4.5.js'></script>
    or
    <script src='http://downloads.easemob.com/downloads/cdn/websdk-1.4.5.min.js'></script>
    ```
    All classes can then be accessed via the WebIM namespace:
    
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
	
    - NPM 
    
    websdk is also available on [NPM](https://www.npmjs.com/package/easemob-websdk):
    
    ```
    npm install easemob-websdk --save
    ```
    All classes can then be accessed by requiring the module:
    
    ```
    require('easemob-websdk'); 
    //... blablabla
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
###BugFix

- [sdk] does not update catact list UI after destory group
- [sdk] does not call the callback function after send out the cmd message

##v1.1.3 @ 2016-11-01

* [demo] support Windows SDK. <http://www.easemob.com/download/im>
* [demo] add blacklist feature.
* [demo] paging getChatrooms, add 2 params:pagenum and pagesize. 
* [demo] easy debug, webpack support development and production mode。
    * `npm run dev`  debug mode, support hot reload, start a webserver and listen at http://localhost:3000.
    * `npm run prod` product mode, faster than before.
* [demo] groups add features: createGroup,changeGroupSubject,changeGroupDesc,adminGroupMembers,joinPublicGroup.
* [sdk]  upgrade strophe from v1.2.2 to v1.2.8, and use strophe-1.2.8.min.js in the product mode, use strophe.js in the debug mode.
* [sdk]  auto reconnect while configured `autoReconnectNumMax` and `autoReconnectInterval` in webim.config.js.

* Bug fixes:
    1. [demo] Fixed a bug of HTML5 elements are not supported in IE by add `babel-core/browser-polyfill.js`.
    2. [demo] Fixed a bug of friends contact is not clickable while there are unread messages.
    3. [sdk] Fixed a bug of strophe.js v1.2.8 using BOSH in IE9.  <https://github.com/strophe/strophejs/issues/213>
    4. [sdk] Fixed a bug of send/receive message delay while there was a lot of offline messages.Client should limit the speed of sending ack messages  up to 5/s, the other nomal send/recv will not be influenced.
    5. [sdk] switch heartBeat from empty body json message to ping/pong iq, the former will be cached as offline message by XMPP Server.

