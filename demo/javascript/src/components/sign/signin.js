var React = require("react");
var Notify = require('../common/notify');
var UI = require('../common/webim-demo');

var Input = UI.Input;
var Button = UI.Button;
var Checkbox = UI.Checkbox;

module.exports = React.createClass({
    getInitialState: function () {
        return {
            pageLimit: 8
        };
    },

    validTabs: function () {
        if (!WebIM.config.isMultiLoginSessions || !window.localStorage) {
            return true;
        } else {
            Demo.userTimestamp = new Date().getTime();

            var key = 'easemob_' + Demo.user;
            var val = window.localStorage.getItem(key);
            var count = 0;
            var oneMinute = 60 * 1000;

            if (val === undefined || val === '' || val === null) {
                val = 'last';
            }
            val = Demo.userTimestamp + ',' + val;
            var timestampArr = val.split(',');
            var uniqueTimestampArr = [];
            // Unique

            for (var o in timestampArr) {
                if (timestampArr[o] === 'last')
                    continue;
                uniqueTimestampArr[timestampArr[o]] = 1;
            }

            val = 'last';
            for (var o in uniqueTimestampArr) {
                // if more than one minute, cut it
                if (parseInt(o) + oneMinute < Demo.userTimestamp) {
                    continue;
                }
                count++;
                if (count > this.state.pageLimit) {
                    return false;
                }
                val = o + ',' + val;
            }
            window.localStorage.setItem(key, val);
            return true;
        }
    },

    keyDown: function (e) {
        if (e && e.keyCode === 13) {
            this.signin();
        }
    },

    signin: function () {
        var username = this.refs.name.refs.input.value || (WebIM.config.autoSignIn ? WebIM.config.autoSignInName : '');
        var auth = this.refs.auth.refs.input.value || (WebIM.config.autoSignIn ? WebIM.config.autoSignInPwd : '');
        var type = this.refs.token.refs.input.checked;

        if (!username || !auth) {
            Demo.api.NotifyError(Demo.lan.notEmpty);
            return false;
        }

        var options = {
            apiUrl: this.props.config.apiURL,
            user: username.toLowerCase(),
            pwd: auth,
            accessToken: auth,
            appKey: this.props.config.appkey
        };

        if (!type) {
            delete options.accessToken;
        }
        Demo.user = username;

        this.props.loading('show');


        Demo.conn.autoReconnectNumTotal = 0;

        if (WebIM.config.isWindowSDK) {
            var me = this;
            WebIM.doQuery('{"type":"login","id":"' + options.user + '","password":"' + options.pwd + '"}',
                function (response) {
                    Demo.conn.onOpened();
                },
                function (code, msg) {
                    me.props.loading('hide');
                    Demo.api.NotifyError('open:' + code + " - " + msg);
                });
        } else {
            if (this.validTabs() === true) {
                Demo.conn.open(options);
            }
            else {
                Demo.conn.onError({
                    type: "One account can't open more than " + this.state.pageLimit + ' pages in one minute on the same browser'
                });
                return;
            }
        }
    },

    signup: function () {
        this.props.update({
            signIn: false,
            signUp: true,
            chat: false
        });
    },

    componentDidMount: function () {
        if (WebIM.config.autoSignIn) {
            this.refs.button.refs.button.click();
        }
    },

    render: function () {

        return (
            <div className={this.props.show ? 'webim-sign' : 'webim-sign hide'}>
                <h2>{Demo.lan.signIn}</h2>
                <Input placeholder={Demo.lan.username} defaultFocus='true' ref='name' keydown={this.keyDown}/>
                <Input placeholder={Demo.lan.password} ref='auth' type='password' keydown={this.keyDown}/>
                <div className={WebIM.config.isWindowSDK ? 'hide' : ''}>
                    <Checkbox text={Demo.lan.tokenSignin} ref='token'/>
                </div>
                <Button ref='button' text={Demo.lan.signIn} onClick={this.signin}/>
                <p>{Demo.lan.noaccount},
                    <i onClick={this.signup}>{Demo.lan.signupnow}</i>
                </p>
            </div>
        );
    }
});
