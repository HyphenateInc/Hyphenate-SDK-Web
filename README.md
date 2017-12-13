# Hyphenate-SDK-Web
<<<<<<< HEAD
--------
The demo app demonstrates how to use the Hyphenate Mobile Instant Messaging (MIM) platform, SDK and backend API to build and deploy a mobile app with integrated chat features. Developers can leverage this app as a reference example to build their own apps integrated with the Hyphenate MIM service. Some of the cool features available:

- Demo is based on React.
- Sign in multiple sessions/devices simutaneously ```isMultiLoginSessions:true```
=======

The demo app demonstrates how to use the Hyphenate Mobile Instant Messaging (MIM) platform, SDK and backend API to build and deploy a mobile app with integrated chat features. Developers can leverage this app as a reference example to build their own apps integrated with the Hyphenate MIM service. Some of the cool features available:

- Demo is based on React.
- Sign in multiple sessions/devices simultaneously ```isMultiLoginSessions:true```
>>>>>>> origin/2.0
- Perform extra layer of security check for HTTP/IP to prevent DNS hijacking. ```isHttpDNS:true```
- Real-time one-to-one and group chat 
- File, photo/video, and location sharing with your friends
- Video/Voice calling for browsers support https+Webkit. 

Live demo app
https://demo.hyphenate.io/

Further details
[Hyphenate web SDK](https://docs.hyphenate.io/docs/web-install-sdk)

<<<<<<< HEAD
=======


## Intro
1. Single demo support both PC browser and H5. Adjust to display resolution dynamically. 
2. Based on React framework and Redux
3. Use ant-design component library for easy customization
4. Support most browsers, except IE6-11


## Installation

1. Init installation
	- run `npm i` under the folder /demo 
2. To edit sdk  `cd sdk && npm link && cd .. && npm link hyphenate-websdk`

3. To edit webrtc `cd webrtc && npm link && cd .. && npm link hyphenate-webrtc`

4. Run demo
	- `cd demo && npm start` （requires node@>=6）
	
	   http://localhost:3001
	- `cd demo && HTTPS=true npm start` (webrtc supports HTTPS only)
	
	   https://localhost:3001

5. Deploy demo
`cd demo && npm run build`
Run and deploy the version under /demo/build

 
## FAQ

### npm start related issue

```
./src/config/WebIM.js
Module not found: Can't resolve 'easemob-websdk/dist/strophe-1.2.8-g.js' in '<YourRootDir>/demo/src/config'
```
FIX: run `npm link easemob-websdk`

### npm start related issue

```
> node scripts/start.js

/Users/wenke/www/web-im/demo/scripts/start.js:23
const {
      ^

SyntaxError: Unexpected token {
    at exports.runInThisContext (vm.js:53:16)
    at Module._compile (module.js:373:25)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:974:3
```
FIX: check node version if v6.0+ 

### Redux State data strcuture

```
{
	// ---------------------------------
	// resolution 
	// ---------------------------------
	//xs: "480px"
	//sm: "768px"
 	//md: "992px"
	//lg: "1200px"
	//xl: "1600px"
	breakpoint: {
		xs: false,
		sm: false,
		md: false,
		lg: false,
		xl: false
	},
	
	// ---------------------------------
	// UI related
	// ---------------------------------
	common: {
		fetching: false,
		isGetGroupAlready: true,
		isGetChatRoomAlready: false,
		showGroupRequestModal: false   // message when member reques to join group
	},
	
	// ---------------------------------	
	// User login notification
	// ---------------------------------
	login: {
		username: 'sunylt',
		password: null,
		token: "YWMtZ0m-opwTEeeS-e0Ko59rsU1-S6DcShHjkNXh_7qs2vV",
		fetching: false,
		error: false
		isLogin: true,
	},
	
	// ---------------------------------
	// Multi-languages
	// ---------------------------------
	i18n: {
	
		// languages
		translations: {
			cn: {},
			us: {},
		},
		
		// current language
		locale: "us"
	},
	
	
	// Registration info. Empty {} if no operation
	register: {
		username: "123abcdbb",
		password: "123",
		fetching: false,
		registerError: null
	},
	
	// placeholder, current not used
	contacts: {}
	
	// placeholder, current not used
    im: {}

	// ---------------------------------	
	// data structure
	// ---------------------------------
	entities: {
	    	// contacts
		roster: {
			byName: {
				name: { subscription,jid, ask, name, groups }
				...
			},
			names: ['lwz2' ...],
			// contact list, which is based on roster
			friends: [],
		},
		// groups
		group: {
			loadingFailed: <Boolean>,
			isLoading: <Booleadn>,
			rightSiderOffset: <Number>, // right side control panel
			byId: {
				groupId: {groupid, groupname},
				....
			},
			names: [groupName_#-#_groupId, ....]
		},
		// chat room
		chatroom: {
			byId: {
				chatId: {chatId, name, owner, affiliations_count}
				...
			},
			names: [chatName_#-#_chatId, ....]
		},
		// stranger
		stranger: {
		},
		
		// group info
		groupMember: {
			groupId: {
				muted: {byName: {}}, // Only group admin able to see the muted user list
				byName: {
					name: {name: <String: name>, affiliation: 'member'}
				},
				names: [],
				admins: [],  // Only group admin able to see the list
			},
			...
		}
		
		// subscribe notification
		subscribe: {
			byFrom: {}
		},
		
		// blacklist
		blacklist: {
			byName: {}
			name: []
		},
		
		// message
		message: {
		
			// all the messages
			byId: {
				mid: {"type":"chat|groupchat|chatroom|stranger|error", "chatId": <String: chatId>},
				...
			}
			
			// list of one-to-one chat
			chat: {
				chatId: [
                         {message},
                         ...
                        ]
			},
			
			// list of group chat
			groupChat: {
				chatId: [
                         {message},
                         ...
                        ]
			},
			
			// list of chat room chat 
			chatroom: {
				chatId: [
                         {message},
                         ...
                        ]
			},
			
			// list of strangers
			stranger: {
				chatId: [
                         {message},
                         ...
                        ]
			},
			
			// placeholder, currently not used
			extra: {}
			
			// unread messages
			unread: {
			    	// contact
				chat: {
					chatId: <Number: unreadNum>,
					...
				},
				// group
				groupchat: {
					chatId: <Number: unreadNum>,
					...
				},
				// chat room
				chatroom: {
					chatId: <Number: unreadNum>,
					...
				},
				// stranger
				stranger: {
					chatId: <Number: unreadNum>,
					...
				}
			}
			
			// compare the message mid sent from self with local message id
			byMid: {
				messageId: {id: <String: localId>},
				...
			},
		},
		
		// request to join group
		groupRequest: {
			byGid: {}
		}
	}
}
```



>>>>>>> origin/2.0
