<<<<<<< HEAD
#ChangeLog:

# Changelog

## v1.4.10 @ 2017-02-16

### Features

* [sdk] webrtc add voice call

### Bug Fixes

* [sdk] webrtc:Firefox error while close call
* [sdk] webrtc:logical error after multitimes connection and close
* [sdk] webrtc:shoud not warning offline after normal close
* [sdk] webrtc:can't handle IQ message after reconnect

## v1.4.9 @ 2017-01-20

### BugFixes

* [sdk] fix a bug in success/error callback

## v1.4.8 @ 2016-12-27

### Features

* [demo] Add a mute button to the video chat window
* [demo] Create a chat window automaticly
* [demo] Hide the chat window when switch a cate in leftbar
* [demo] Not back to the login page when refresh the webpage if login succeed

### Bug Fixes

* [sdk] Remove all of the log methods
* [sdk] Send an unavailable presence stanza when leave a group

## v1.4.7 @ 2016-12-21

### Features

* [demo] Add video chat and send video file functions into the demo.html

### Bug Fixes

* [sdk] Fix the bug when the browser runs in back end that WebIM can't reconnect on phones
* [demo] Refresh the group list on the front end after create a group succeed on back end
* [demo] The master of a group and the members will be added will receive a notification when add members to group
* [demo] A member will leave group when the master of the group remove this member from group black list

## v1.4.6

### Features

* add demo.html

### Bug Fixes

* to decoupling from Demo namespaces, delete codes using Demo
* delete connection.prototype.createRoom, which is not supported by server

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
=======
# 版本更新说明:

## v2.0.0 @ 2017-09-22

###Feature

* [demo] 响应式布局，一套Demo同时支持PC和H5,自适应不同终端屏幕尺寸
* [demo] 完全基于Reac + Redux的单向数据流
* [demo] 引入ant-design组件库，方便开发者后续开发
* [demo] 专为移动端h5打造的webim 适配微信/QQ 和各种手机浏览器
>>>>>>> origin/2.0
