/**
 * webim.config.js is web app configurations and urls to connect to Hyphenate server
 *
 */
var WebIM = {};
WebIM.config = {
    /*
     * XMPP server
     */
    xmppURL: 'im-api.hyphenate.io',
    /*
     * Hyphenate server REST API URL
     */
    apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//api.hyphenate.io',
    /*
     * Application API Key
     */
    appkey: 'hyphenatedemo#hyphenatedemo',
    /*
     * Whether to use wss
     * @parameter {Boolean} true or false
     */
    https: false,
    /*
     * isMultiLoginSessions
     * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
     * false: A visitor can sign in to only one webpage and receive messages at the webpage.
     */
    isMultiLoginSessions: false,
    /*
     * Set to auto sign-in
     */
    isAutoLogin: false,
    /**
     * Whether to use window.doQuery()
     * @parameter {Boolean} true or false
     */
    isWindowSDK: false,
    /**
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
     * after login, send empty message to xmpp server like heartBeat every 45s, to keep the ws connection alive.
     */
    heartBeatWait: 4500,
    /**
     * while http access,use ip directly,instead of ServerName,avoiding DNS problem.
     */
    isHttpDNS: false
};
