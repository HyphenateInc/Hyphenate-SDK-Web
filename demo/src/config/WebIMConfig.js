/**
 * git do not control webim.config.js
 * everyone should copy webim.config.js.demo to webim.config.js
 * and have their own configs.
 * In this way , others won't be influenced by this config while git pull.
 *
 */

var location = {
    protocol: "https"
}

var config = {
    /*
     * XMPP server
     */
    xmppURL: "im-api.hyphenate.io",
    // xmppURL: '172.17.2.139:5280',
    /*
     * Backend REST API URL
     */
    // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//api.hyphenate.io',
    // iOS MUST be HTTPS
    apiURL: "https://api.hyphenate.io",
    // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//172.17.3.155:8080',
    /*
     * Application AppKey
     */
    appkey: "hyphenatedemo#hyphenatedemo",
    /*
     * Whether to use HTTPS
     * @parameter {Boolean} true or false
     */
    https: true,
    /*
     * isMultiLoginSessions
     * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
     * false: A visitor can sign in to only one webpage and receive messages at the webpage.
     */
    isMultiLoginSessions: false,
    /**
     * Whether to use window.doQuery()
     * @parameter {Boolean} true or false
     */
    isWindowSDK: false,
    /**
     * isSandBox=true:  xmppURL: 'im-api.sandbox.hyphenate.io',  apiURL: '//api.sdb.hyphenate.io',
     * isSandBox=false: xmppURL: 'im-api.hyphenate.io',          apiURL: '//api.hyphenate.io',
     * @parameter {Boolean} true or false
     */
    isSandBox: false,
    /**
     * Whether to console.log in strophe.log()
     * @parameter {Boolean} true or false
     */
    isDebug: false,
    /**
     * Whether to show logs in strophe
     * @parameter {Boolean} true or false
     */
    isStropheLog: false,
    /**
     * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
     * won't auto connect if autoReconnectNumMax=0.
     */
    autoReconnectNumMax: 2,
    /**
     * the interval secons between each atuo reconnectting.
     * works only if autoReconnectMaxNum >= 2.
     */
    autoReconnectInterval: 2,
    /**
     * webrtc supports WebKit and https only
     */
    isWebRTC: /WebKit/.test(navigator.userAgent) && /^https\:$/.test(window.location.protocol),
    /**
     *  cn: chinese
     *  us: english
     */
    i18n: "us",
    /*
     * Set to auto sign-in
     */
    isAutoLogin: true,
    /**
     * Size of message cache for person to person
     */
    p2pMessageCacheSize: 500,
    /**
     * When a message arrived, the receiver send an ack message to the
     * sender, in order to tell the sender the message has delivered.
     * See call back function onReceivedMessage
     */
    delivery: true,
    /**
     * Size of message cache for group chating like group, chatroom etc
     */
    groupMessageCacheSize: 200,
    /**
     * 5 actual logging methods, ordered and available:
     * 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR'
     */

    loglevel: "ERROR",

    /**
     * enable localstorage for history messages
     */
    enableLocalStorage: true
}

export default config
