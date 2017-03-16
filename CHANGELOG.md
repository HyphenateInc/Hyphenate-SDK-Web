#ChangeLog:

##v1.4.5 @ 2016-12-01

###Feature

- GNU version number: `Major_Version_Number.Minor_Version_Number.Revision_Number` (new v1.4.5 = old v1.1.4.5)
- [demo] friends can video chat to each other (support https + Webkit only)
- [demo] limite of a single user the number of opened tabs in the same browser `isMultiLoginSessions:true`
- [demo] while http access,use ip directly instead of ServerName,avoid DNS hijacking.  `isHttpDNS:true`
- [sdk]
    
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
    
    Hyphenate web SDK is also available on [NPM](https://npmjs.com/package/hyphenate-web):
    
    ```
    npm install hyphenate-web
    ```
    All classes can then be accessed by requiring the module:
    
    ```
    require('hyphenate-web'); 
    
    //
    ... 
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