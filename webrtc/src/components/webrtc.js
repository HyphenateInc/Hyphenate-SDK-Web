/**
 * WebRTC
 *
 *                              A                   |                                       B
 *                                                  |
 *   1.createMedia:got streamA                      | 1.createMedia:got streamB
 *   2.new RTCPeerConnection: APeerConnection       | 2.new RTCPeerConnection: BPeerConnection
 *   3.APeerConnection.createOffer:got offerA       |
 *      APeerConnection.setLocalDescription(offerA) |
 *      send offerA ---> ---> ---> --->        ---> |
 *                                                  | ---> 3.got offerA | offerA = new RTCSessionDescription(offerA);
 *                                                  | BPeerConnection.setRemoteDescription(offerA)
 *                                                  |
 *                                                  |
 *                                                  | 4.BPeerConnection.createAnswer: got answerB
 *                                                  | BPeerConnection.setLocalDescription(answerB)
 *                                                  | <---- send answerB
 *                                                  | 5.got answerB <--- <--- <--- <---
 *                                                  | answerB = new RTCSessionDescription(answerB)
 *                                                  |
 * APeerConnection.setRemoteDescription(answerB)    |
 *                                                  |
 * 6.got candidateA ---> --->  ---> --->            | ---> got candidateA
 *                                                  | BPeerConnection.addIceCandidate(new RTCIceCandidate(candidateA))
 *                                                  |
 *                                                  |
 *                                                  | got candidateB <--- <--- <--- <---
 *                                                  | <--- 6.got candidateB APeerConnection.addIceCandidate(candidateB)
 *                                                  |
 *                                                  |
 *                                                  | 7. APeerConnection.addStream(streamA)
 *                                                  | 7.BPeerConnection.addStream(streamB)
 *                                                  |
 *                              streamA >>>>>>>>>>> |  <<<<< see A
 *                              seeB <<<<<<<<<<<    | <<<<< streamB
 *                                                  |
 *
 */
var _util = require('./utils');
var _logger = _util.logger;

var _SDPSection = {
    headerSection: null,

    audioSection: null,
    videoSection: null,


    _parseHeaderSection: function (sdp) {
        var index = sdp.indexOf('m=audio');
        if (index >= 0) {
            return sdp.slice(0, index);
        }

        index = sdp.indexOf('m=video');
        if (index >= 0) {
            return sdp.slice(0, index);
        }

        return sdp;
    },

    _parseAudioSection: function (sdp) {
        var index = sdp.indexOf('m=audio');
        if (index >= 0) {
            var endIndex = sdp.indexOf('m=video');
            return sdp.slice(index, endIndex < 0 ? sdp.length : endIndex);
        }
    },

    _parseVideoSection: function (sdp) {
        var index = sdp.indexOf('m=video');
        if (index >= 0) {
            return sdp.slice(index);
        }
    },

    spiltSection: function (sdp) {
        var self = this;

        self.headerSection = self._parseHeaderSection(sdp);
        self.audioSection = self._parseAudioSection(sdp);
        self.videoSection = self._parseVideoSection(sdp);
    },

    removeSSRC: function (section) {
        var arr = [];

        var _arr = section.split(/a=ssrc:[^\n]+/g);
        for (var i = 0; i < _arr.length; i++) {
            _arr[i] != '\n' && arr.push(_arr[i]);
        }
        // arr.push('');

        return arr.join('\n');
    },

    updateHeaderMsidSemantic: function (wms) {

        var self = this;

        var line = "a=msid-semantic: WMS " + wms;

        var _arr = self.headerSection.split(/a=msid\-semantic: WMS.*/g);
        var arr = [];
        switch (_arr.length) {
            case 1:
                arr.push(_arr[0]);
                break;
            case 2:
                arr.push(_arr[0]);
                arr.push(line);
                arr.push('\n');
                break;
            case 3:
                arr.push(_arr[0]);
                arr.push(line);
                arr.push('\n');
                arr.push(_arr[2]);
                arr.push('\n');
                break;
        }

        return self.headerSection = arr.join('');
    },

    updateAudioSSRCSection: function (ssrc, cname, msid, label) {
        var self = this;

        self.audioSection && (self.audioSection = self.removeSSRC(self.audioSection) + self.ssrcSection(ssrc, cname, msid, label))
    },


    updateVideoSSRCSection: function (ssrc, cname, msid, label) {
        var self = this;

        self.videoSection && (self.videoSection = self.removeSSRC(self.videoSection) + self.ssrcSection(ssrc, cname, msid, label))
    },

    getUpdatedSDP: function () {
        var self = this;

        var sdp = "";

        self.headerSection && (sdp += self.headerSection);
        self.audioSection && (sdp += self.audioSection);
        self.videoSection && (sdp += self.videoSection);

        return sdp;
    },

    parseMsidSemantic: function (header) {
        var self = this;

        var regexp = /a=msid\-semantic: WMS (\S+)/ig;
        var arr = self._parseLine(header, regexp);

        arr && arr.length == 2 && (self.msidSemantic = {
            line: arr[0],
            WMS: arr[1]
        });

        return self.msidSemantic;
    },

    ssrcSection: function (ssrc, cname, msid, label) {
        var lines = [
            'a=ssrc:' + ssrc + ' cname:' + cname,
            'a=ssrc:' + ssrc + ' msid:' + msid + ' ' + label,
            'a=ssrc:' + ssrc + ' mslabel:' + msid,
            'a=ssrc:' + ssrc + ' label:' + label,
            ''
        ];

        return lines.join('\n');
    },

    parseSSRC: function (section) {
        var self = this;

        var regexp = new RegExp("a=(ssrc):(\\d+) (\\S+):(\\S+)", "ig");

        var arr = self._parseLine(section, regexp);
        if (arr) {
            var ssrc = {
                lines: [],
                updateSSRCSection: self.ssrcSection
            };

            for (var i = 0; i < arr.length; i++) {
                var e = arr[i];
                if (e.indexOf("a=ssrc") >= 0) {
                    ssrc.lines.push(e);
                } else {
                    switch (e) {
                        case 'ssrc':
                        case 'cname':
                        case 'msid':
                        case 'mslabel':
                        case 'label':
                            ssrc[e] = arr[++i];
                    }
                }
            }

            return ssrc;
        }
    },

    _parseLine: function (str, regexp) {
        var arr = [];

        var _arr;
        while ((_arr = regexp.exec(str)) != null) {
            for (var i = 0; i < _arr.length; i++) {
                arr.push(_arr[i]);
            }
        }

        if (arr.length > 0) {
            return arr;
        }
    },
};

var SDPSection = function (sdp) {
    _util.extend(this, _SDPSection);
    this.spiltSection(sdp);
};


/**
 * Abstract
 */
var _WebRTC = {
    mediaStreamConstaints: {
        audio: true,
        video: true
    },

    localStream: null,
    rtcPeerConnection: null,

    offerOptions: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    },


    createMedia: function (constaints, onGotStream) {
        var self = this;

        if (constaints && (typeof constaints === "function")) {
            onGotStream = constaints;
            constaints = null;
        }

        _logger.debug('[WebRTC-API] begin create media ......');

        function gotStream(stream) {
            _logger.debug('[WebRTC-API] got local stream');

            self.localStream = stream;

            var videoTracks = self.localStream.getVideoTracks();
            var audioTracks = self.localStream.getAudioTracks();

            if (videoTracks.length > 0) {
                _logger.debug('[WebRTC-API] Using video device: ' + videoTracks[0].label);
            }
            if (audioTracks.length > 0) {
                _logger.debug('[WebRTC-API] Using audio device: ' + audioTracks[0].label);
            }

            onGotStream ? onGotStream(self, stream) : self.onGotStream(stream);
        }

        return navigator.mediaDevices.getUserMedia(constaints || self.mediaStreamConstaints)
            .then(gotStream)
            .then(self.onCreateMedia)
            .catch(function (e) {
                _logger.debug('[WebRTC-API] getUserMedia() error: ', e);
                self.onError(e);
            });
    },

    setLocalVideoSrcObject: function (stream) {
        this.onGotLocalStream(stream);
        _logger.debug('[WebRTC-API] you can see yourself !');
    },

    createRtcPeerConnection: function (iceServerConfig) {
        _logger.debug('[WebRTC-API] begin create RtcPeerConnection ......');

        var self = this;

        // if (iceServerConfig && iceServerConfig.iceServers) {
        // } else {
        //     iceServerConfig = null;
        // }

        if (iceServerConfig){ //reduce icecandidate number:add default value
            !iceServerConfig.iceServers && (iceServerConfig.iceServers = []);

            iceServerConfig.rtcpMuxPolicy = "require";
            iceServerConfig.bundlePolicy = "max-bundle";

            //iceServerConfig.iceTransportPolicy = 'relay';
            if(iceServerConfig.relayOnly){
                iceServerConfig.iceTransportPolicy = 'relay';
            }
        } else {
            iceServerConfig = null;
        }
        _logger.debug('[WebRTC-API] RtcPeerConnection config:', iceServerConfig);

        self.startTime = window.performance.now();

        var rtcPeerConnection = self.rtcPeerConnection = new RTCPeerConnection(iceServerConfig);
        _logger.debug('[WebRTC-API] Created local peer connection object', rtcPeerConnection);


        rtcPeerConnection.onicecandidate = function (event) {
            //reduce icecandidate number: don't deal with tcp, udp only
            if (event.type == "icecandidate" && ((event.candidate == null) || / tcp /.test(event.candidate.candidate))) {
                return;
            }
            self.onIceCandidate(event);
        };

        rtcPeerConnection.onicestatechange = function (event) {
            self.onIceStateChange(event);
        };

        rtcPeerConnection.oniceconnectionstatechange = function (event) {
            self.onIceStateChange(event);
        };

        rtcPeerConnection.onaddstream = function (event) {
            self._onGotRemoteStream(event);
        };
    },

    _uploadLocalStream: function () {
        this.rtcPeerConnection.addStream(this.localStream);
        _logger.debug('[WebRTC-API] Added local stream to RtcPeerConnection');
    },

    createOffer: function (onCreateOfferSuccess, onCreateOfferError) {
        var self = this;

        self._uploadLocalStream();

        _logger.debug('[WebRTC-API] createOffer start...');

        return self.rtcPeerConnection.createOffer(self.offerOptions).then(
            function (desc) {
                self.offerDescription = desc;

                _logger.debug('[WebRTC-API] Offer ');//_logger.debug('from \n' + desc.sdp);
                _logger.debug('[WebRTC-API] setLocalDescription start');

                self.rtcPeerConnection.setLocalDescription(desc).then(
                    self.onSetLocalSessionDescriptionSuccess,
                    self.onSetSessionDescriptionError
                ).then(function () {
                    (onCreateOfferSuccess || self.onCreateOfferSuccess)(desc);
                });
            },
            (onCreateOfferError || self.onCreateSessionDescriptionError)
        );
    },

    createPRAnswer: function (onCreatePRAnswerSuccess, onCreatePRAnswerError) {
        var self = this;

        _logger.info(' createPRAnswer start');
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        return self.rtcPeerConnection.createAnswer().then(
            function (desc) {
                _logger.debug('[WebRTC-API] _____________PRAnswer ');//_logger.debug('from :\n' + desc.sdp);

                desc.type = "pranswer";
                desc.sdp = desc.sdp.replace(/a=recvonly/g, 'a=inactive');


                self.prAnswerDescription = desc;

                _logger.debug('[WebRTC-API] inactive PRAnswer ');//_logger.debug('from :\n' + desc.sdp);
                _logger.debug('[WebRTC-API] setLocalDescription start');

                self.rtcPeerConnection.setLocalDescription(desc).then(
                    self.onSetLocalSuccess,
                    self.onSetSessionDescriptionError
                ).then(function () {
                    var sdpSection = new SDPSection(desc.sdp);
                    sdpSection.updateHeaderMsidSemantic("MS_0000");
                    sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
                    sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

                    desc.sdp = sdpSection.getUpdatedSDP();

                    _logger.debug('[WebRTC-API] Send PRAnswer ');//_logger.debug('from :\n' + desc.sdp);

                    (onCreatePRAnswerSuccess || self.onCreatePRAnswerSuccess)(desc);
                });
            },
            (onCreatePRAnswerError || self.onCreateSessionDescriptionError)
        );
    },

    createAnswer: function (onCreateAnswerSuccess, onCreateAnswerError) {
        var self = this;

        self._uploadLocalStream();

        _logger.info('[WebRTC-API] createAnswer start');
        // Since the 'remote' side has no media stream we need
        // to pass in the right constraints in order for it to
        // accept the incoming offer of audio and video.
        return self.rtcPeerConnection.createAnswer().then(
            function (desc) {
                _logger.debug('[WebRTC-API] _____________________Answer ');//_logger.debug('from :\n' + desc.sdp);

                desc.type = 'answer';

                var sdpSection = new SDPSection(desc.sdp);
                var ms = sdpSection.parseMsidSemantic(sdpSection.headerSection);

                var audioSSRC = sdpSection.parseSSRC(sdpSection.audioSection);
                var videoSSRC = sdpSection.parseSSRC(sdpSection.videoSection);

                sdpSection.updateAudioSSRCSection(1000, "CHROME0000", ms.WMS, audioSSRC.label);
                sdpSection.updateVideoSSRCSection(2000, "CHROME0000", ms.WMS, videoSSRC.label);
                // mslabel cname


                desc.sdp = sdpSection.getUpdatedSDP();

                self.answerDescription = desc;

                _logger.debug('[WebRTC-API] Answer ');//_logger.debug('from :\n' + desc.sdp);
                _logger.debug('[WebRTC-API] setLocalDescription start');

                self.rtcPeerConnection.setLocalDescription(desc).then(
                    self.onSetLocalSuccess,
                    self.onSetSessionDescriptionError
                ).then(function () {
                    var sdpSection = new SDPSection(desc.sdp);
                    sdpSection.updateHeaderMsidSemantic("MS_0000");
                    sdpSection.updateAudioSSRCSection(1000, "CHROME0000", "MS_0000", "LABEL_AUDIO_1000");
                    sdpSection.updateVideoSSRCSection(2000, "CHROME0000", "MS_0000", "LABEL_VIDEO_2000");

                    desc.sdp = sdpSection.getUpdatedSDP();

                    _logger.debug('[WebRTC-API] Send Answer ');//_logger.debug('from :\n' + desc.sdp);

                    (onCreateAnswerSuccess || self.onCreateAnswerSuccess)(desc);
                });
            },
            (onCreateAnswerError || self.onCreateSessionDescriptionError)
        );
    },

    close: function () {
        var self = this;
        try {
            self.rtcPeerConnection && self.rtcPeerConnection.close();
        } catch (e) {
        }

        if (self.localStream) {
            self.localStream.getTracks().forEach(function (track) {
                track.stop();
            });
        }
        self.localStream = null;
    },

    addIceCandidate: function (candidate) {
        var self = this;

        if (!self.rtcPeerConnection) {
            return;
        }


        _logger.debug('[WebRTC-API] Add ICE candidate: \n', candidate);

        var _cands = _util.isArray(candidate) ? candidate : [];
        !_util.isArray(candidate) && _cands.push(candidate);

        for (var i = 0; i < _cands.length; i++) {
            candidate = _cands[i];

            self.rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidate)).then(
                self.onAddIceCandidateSuccess,
                self.onAddIceCandidateError
            );
        }
    },

    setRemoteDescription: function (desc) {
        var self = this;

        _logger.debug('[WebRTC-API] setRemoteDescription start. ');

        desc.sdp = desc.sdp.replace(/UDP\/TLS\/RTP\/SAVPF/g, "RTP/SAVPF");
        _logger.debug('[WebRTC-API] setRemoteDescription.', desc);

        desc = new RTCSessionDescription(desc);

        return self.rtcPeerConnection.setRemoteDescription(desc).then(
            self.onSetRemoteSuccess,
            self.onSetSessionDescriptionError
        );
    },

    iceConnectionState: function () {
        var self = this;

        return self.rtcPeerConnection.iceConnectionState;
    },

    onCreateMedia: function () {
        _logger.debug('[WebRTC-API] media created.');
    },

    _onGotRemoteStream: function (event) {
        _logger.debug('[WebRTC-API] onGotRemoteStream.', event);

        this.onGotRemoteStream(event.stream);
        _logger.debug('[WebRTC-API] received remote stream, you will see the other.');
    },

    onGotStream: function (stream) {
        _logger.debug('[WebRTC-API] on got a local stream');
    },

    onSetRemoteSuccess: function () {
        _logger.info('[WebRTC-API] onSetRemoteSuccess complete');
    },

    onSetLocalSuccess: function () {
        _logger.info('[WebRTC-API] setLocalDescription complete');
    },

    onAddIceCandidateSuccess: function () {
        _logger.debug('[WebRTC-API] addIceCandidate success');
    },

    onAddIceCandidateError: function (error) {
        _logger.debug('[WebRTC-API] failed to add ICE Candidate: ' + error.toString());
    },

    onIceCandidate: function (event) {
        _logger.debug('[WebRTC-API] onIceCandidate : ICE candidate: \n' + event.candidate);
    },

    onIceStateChange: function (event) {
        _logger.debug('[WebRTC-API] onIceStateChange : ICE state change event: ', event);
    },

    onCreateSessionDescriptionError: function (error) {
        _logger.error('[WebRTC-API] Failed to create session description: ' + error.toString());
    },

    onCreateOfferSuccess: function (desc) {
        _logger.debug('[WebRTC-API] create offer success');
    },

    onCreatePRAnswerSuccess: function (desc) {
        _logger.debug('[WebRTC-API] create answer success');
    },

    onCreateAnswerSuccess: function (desc) {
        _logger.debug('[WebRTC-API] create answer success');
    },

    onSetSessionDescriptionError: function (error) {
        _logger.error('[WebRTC-API] onSetSessionDescriptionError : Failed to set session description: ' + error.toString());
    },

    onSetLocalSessionDescriptionSuccess: function () {
        _logger.debug('[WebRTC-API] onSetLocalSessionDescriptionSuccess : setLocalDescription complete');
    }


};

module.exports = function (initConfigs) {
    _util.extend(true, this, _WebRTC, initConfigs || {});
};
