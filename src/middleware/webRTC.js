import { localStream } from './getUserMedia';
import { addRemoteStream, deleteRemoteStream, addRemoteUser, deleteRemoteUser, addMessage, setRemoteMediaPreference } from '../redux/actions'
let socket;
let iceServers;
let connections = new Map();
let channels = new Map();
export let remoteStreams = new Map();
const webRTCMiddleware = store => next => action => {
    switch (action.type) {
        case 'CONNECTSOCKET':
            socketAndWebRTC(action.value, store);
            break;
        case 'SETICESERVERS':
            iceServers = action.value;
            break;
        case 'SENDMESSAGE':
            sendMessage(action.value, store);
            break;
        default:
            break;
    }
    return next(action)
}
export default webRTCMiddleware;
// eslint-disable-next-line
const sendMessage = (params, store) => {
    channels.forEach(channel => {
        console.log('channel', channel);
        channel.send(JSON.stringify({
            "from": params.id,
            "action": params.action,
            "message": params.message
        }))
    });
    if (params.action === 'MESSAGE')
        store.dispatch(addMessage({ id: params.id, message: params.message }))
}


const socketAndWebRTC = (params, store) => {
    const connectToWebSocket = () => {
        const webSocketConnection = "wss://proximo-video.herokuapp.com/ws";
        // const webSocketConnection = "ws://localhost:8080/ws";
        if (!socket)
            socket = new WebSocket(webSocketConnection);
        socket.onopen = function (event) {
            console.log('WebSocket Connection Open.');
            socket.send(JSON.stringify(
                {
                    action: params.action,
                    id: params.id,
                    data: params.roomId
                }
            ))
        };    // Create WebRTC connection only if the socket connection is successful.

        // Handle messages recieved in socket
        socket.onmessage = function (event) {
            let jsonData = JSON.parse(event.data);
            if (jsonData.action === "READY") {
                console.log("Got Ready")
                let toUser = jsonData.from;
                if (connections.has(toUser))
                    connections.get(toUser).close();
                createRTCPeerConnection(toUser);
                createAndSendOffer(toUser);
            }

            switch (jsonData.type) {
                case 'CANDIDATE':
                    console.log('Received The Candidate');
                    handleCandidate(jsonData.data, jsonData.id, jsonData.from);
                    break;
                case 'OFFER':
                    store.dispatch(addRemoteUser({ id: jsonData.from, displayName: jsonData.display_name }))
                    handleOffer(jsonData.data, jsonData.id, jsonData.from);
                    break;
                case 'ANSWER':
                    store.dispatch(addRemoteUser({ id: jsonData.from, displayName: jsonData.display_name }))
                    handleAnswer(jsonData.data, jsonData.id, jsonData.from);
                    break;
                default:
                    break
            }
        };

        socket.onerror = function (event) {
            console.error(event);
            console.log('WebSocket Connection Error. Make sure web socket URL is correct and web socket server is up and running at - ' + webSocketConnection);
        };

        socket.onclose = function (event) {
            console.log('WebSocket Connection Closed. Please Reload the page.');
            // document.getElementById("sendOfferButton").disabled = true;
            // document.getElementById("answerButton").disabled = true;
        };
    }



    const createRTCPeerConnection = (toUser) => {
        const configuration = {
            iceServers: iceServers
        }

        let connection = new RTCPeerConnection(configuration);

        // Add both video and audio tracks to the connection
        for (const track of localStream.getTracks()) {
            // console.log("Sending Stream.")
            connection.addTrack(track, localStream);
        }

        // This event handles displaying remote video and audio feed from the other peer
        connection.ontrack = event => {
            // console.log("Recieved Stream.");
            remoteStreams = new Map(remoteStreams.set(toUser, event.streams));
            store.dispatch(addRemoteStream())
            // console.log(remoteStreams)
        }

        // This event handles the received data channel from the other peer
        connection.ondatachannel = function (event) {
            // console.log("Recieved a DataChannel.")
            let channel = event.channel;
            channels.set(toUser, channel)
            setChannelEvents(channel, toUser);
        };

        // This event sends the ice candidates generated from Stun or Turn server to the Receiver over web socket
        connection.onicecandidate = event => {
            if (event.candidate) {
                // console.log("Sending Ice Candidate - " + event.candidate.candidate);

                socket.send(JSON.stringify(
                    {
                        action: 'MESSAGE',
                        type: 'CANDIDATE',
                        data: event.candidate,
                        id: params.id,
                        to: toUser,
                        from: params.id
                    }
                ));
            }
        }

        // connection.oniceconnectionstatechange = () => {
        //     switch (connection.iceConnectionState) {
        //         case 'disconnected':
        //             console.log('Disconnected');
        //             break;
        //         case 'failed':
        //             if (remoteStreams.delete(toUser)) {
        //                 remoteStreams = new Map(remoteStreams);
        //             }
        //             connections.delete(toUser);
        //             connection.close();
        //             channels.delete(toUser);
        //             store.dispatch(deleteRemoteStream());
        //             store.dispatch(deleteRemoteUser(toUser))
        //             break;
        //         case 'closed':
        //             if (remoteStreams.delete(toUser)) {
        //                 remoteStreams = new Map(remoteStreams);
        //             }
        //             store.dispatch(deleteRemoteStream());
        //             store.dispatch(deleteRemoteUser(toUser))
        //             console.log('Closed');
        //             break;
        //         default:
        //             break;
        //     }
        // }

        // This event logs messages and handles button state according to WebRTC connection state changes
        connection.onconnectionstatechange = function (event) {
            switch (connection.connectionState) {
                case "connected":
                    console.log("Web RTC Peer Connection Connected.");
                    break;
                case "disconnected":
                    console.log("Web RTC Peer Connection Disconnected. Please reload the page to reconnect.");
                    // deleteStream(toUser);
                    // try {
                    //     connection.restartIce();
                    // }
                    // catch (e) {
                    //     connection.close();
                    // }
                    break;
                case "failed":
                    console.log("Web RTC Peer Connection Failed. Please reload the page to reconnect.");
                    if (remoteStreams.delete(toUser)) {
                        remoteStreams = new Map(remoteStreams);
                    }
                    connections.delete(toUser);
                    connection.close();
                    channels.delete(toUser);
                    store.dispatch(deleteRemoteStream());
                    store.dispatch(deleteRemoteUser(toUser))
                    console.log(event);
                    break;
                case "closed":
                    console.log("Web RTC Peer Connection Closed. Please reload the page to reconnect.");
                    if (remoteStreams.delete(toUser)) {
                        remoteStreams = new Map(remoteStreams);
                    }
                    connections.delete(toUser);
                    connection.close();
                    channels.delete(toUser);
                    store.dispatch(deleteRemoteStream());
                    store.dispatch(deleteRemoteUser(toUser))
                    break;
                default:
                    break;
            }
        }
        connections.set(toUser, connection);
        console.log("Web RTC Peer Connection Created.");
        // document.getElementById("sendOfferButton").disabled = false;
    }

    const createAndSendOffer = (toUser) => {
        // if (channel) {
        //     channel.close();
        // }

        // Create Data channel
        console.log(connections.get(toUser))
        let channel = connections.get(toUser).createDataChannel('channel', {});
        setChannelEvents(channel);
        channels.set(toUser, channel);

        // Create Offer
        connections.get(toUser).createOffer().then(
            offer => {
                // console.log('Sent The Offer.');

                // Send Offer to other peer
                socket.send(JSON.stringify(
                    {
                        action: 'MESSAGE',
                        type: 'OFFER',
                        data: offer,
                        id: params.id,
                        to: toUser,
                        from: params.id,
                        display_name: params.displayName
                    }
                ));

                // Set Offer for negotiation
                connections.get(toUser).setLocalDescription(offer);
            },
            error => {
                console.log('Error when creating an offer.');
                console.error(error);
            }
        );
    }

    const setChannelEvents = (channel, toUser) => {
        channel.onopen = function (event) {
            channel.send(JSON.stringify({
                "from": params.id,
                "action": "MEDIAPREFERENCE",
                "message": { isAudio: store.getState().userMediaPreference.isAudio, isVideo: store.getState().userMediaPreference.isVideo }
            }))
        }
        channel.onmessage = function (event) {
            var data = JSON.parse(event.data);
            console.log('from', data.from)
            switch (data.action) {
                case 'MESSAGE':
                    store.dispatch(addMessage({ id: data.from, message: data.message }));
                    break;
                case 'MEDIAPREFERENCE':
                    console.log(data.from, data.message.isVideo);
                    store.dispatch(setRemoteMediaPreference({ id: data.from, isAudio: data.message.isAudio, isVideo: data.message.isVideo }))
                    break;
                case 'LEAVEROOM':
                    if (connections.has(data.from)) {
                        console.log("yes", data.from)
                        connections.get(data.from).close();
                        connections.set(data.from, null);
                    }
                    break;
                default:
                    break;
            }

        };

        channel.onerror = function (event) {
            console.log('DataChannel Error.');
            console.error(event)
        };

        channel.onclose = function (event) {
            console.log('DataChannel Closed.');
        };
    }

    const handleCandidate = (candidate, id, toUser) => {
        if (!connections.has(toUser))
            createRTCPeerConnection(toUser);
        // Avoid accepting the ice candidate if this is a message created by the current peer
        if (params.id !== id) {
            // console.log("Adding Ice Candidate - " + candidate.candidate);
            connections.get(toUser).addIceCandidate(new RTCIceCandidate(candidate));
        }
    }

    /*
        Accepts Offer received from the Caller
    */
    const handleOffer = (offer, id, toUser) => {
        if (!connections.has(toUser))
            createRTCPeerConnection(toUser);
        // Avoid accepting the Offer if this is a message created by the current peer
        if (params.id !== id) {
            console.log("Recieved The Offer.");
            connections.get(toUser).setRemoteDescription(new RTCSessionDescription(offer));
            createAndSendAnswer(toUser)
            // document.getElementById("answerButton").disabled = false;
            // document.getElementById("sendOfferButton").disabled = true;
        }
    }

    /*
        Accetps Answer received from the Receiver
    */
    const handleAnswer = (answer, id, toUser) => {
        // Avoid accepting the Answer if this is a message created by the current peer
        if (params.id !== id) {
            console.log("Recieved The Answer");
            connections.get(toUser).setRemoteDescription(new RTCSessionDescription(answer));
        }
    }

    const createAndSendAnswer = (toUser) => {

        // Create Answer
        connections.get(toUser).createAnswer().then(
            answer => {
                console.log('Sent The Answer.');

                // Set Answer for negotiation
                connections.get(toUser).setLocalDescription(answer);

                // Send Answer to other peer
                socket.send(JSON.stringify(
                    {
                        action: 'MESSAGE',
                        type: 'ANSWER',
                        data: answer,
                        id: params.id,
                        to: toUser,
                        from: params.id,
                        display_name: params.displayName
                    }
                ));
            },
            error => {
                console.log('Error when creating an answer.');
                console.error(error);
            }
        );
    }
    connectToWebSocket();
}
