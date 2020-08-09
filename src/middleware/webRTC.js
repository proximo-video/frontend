import {localStream} from './getUserMedia';
let socket;
let iceServers;
let connections= new Map();
let remoteStreams = new Map();
const webRTCMiddleware = store => next => action => {
        switch(action.type){
            case 'CONNECTSOCKET':
                connectToWebSocket(action.value);
            break;
            case 'SETICESERVERS':
                iceServers = action.value;
            break;
        }
        return next(action)
}
export default webRTCMiddleware;


const connectToWebSocket = (params) => {
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
            if (!connections.has(toUser))
                createRTCPeerConnection(toUser,params);
            createAndSendOffer(toUser,params);
        }

        switch (jsonData.type) {
            case 'CANDIDATE':
                console.log('Received The Candidate');
                handleCandidate(jsonData.data, jsonData.id, jsonData.from,params);
                break;
            case 'OFFER':
                console.log('Received The Offer');
                handleOffer(jsonData.data, jsonData.id, jsonData.from,params);
                break;
            case 'ANSWER':
                console.log('Received The Answer');
                handleAnswer(jsonData.data, jsonData.id, jsonData.from,params);
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



const createRTCPeerConnection = (toUser,params) => {
    const configuration = {
        iceServers: iceServers
    }

    let connection = new RTCPeerConnection(configuration);

    // Add both video and audio tracks to the connection
    for (const track of localStream.getTracks()) {
        console.log("Sending Stream.")
        connection.addTrack(track, localStream);
    }

    // This event handles displaying remote video and audio feed from the other peer
    connection.ontrack = event => {
        console.log("Recieved Stream.");
        remoteStreams.set(toUser, event.streams);
        console.log(remoteStreams)
    }

    // This event handles the received data channel from the other peer
    connection.ondatachannel = function (event) {
        console.log("Recieved a DataChannel.")
        let channel = event.channel;
        setChannelEvents(channel);
    };

    // This event sends the ice candidates generated from Stun or Turn server to the Receiver over web socket
    connection.onicecandidate = event => {
        if (event.candidate) {
            console.log("Sending Ice Candidate - " + event.candidate.candidate);

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

    // connection.onnegotiationneeded

    // This event logs messages and handles button state according to WebRTC connection state changes
    connection.onconnectionstatechange = function (event) {
        switch (connection.connectionState) {
            case "connected":
                console.log("Web RTC Peer Connection Connected.");
                break;
            case "disconnected":
                console.log("Web RTC Peer Connection Disconnected. Please reload the page to reconnect.");
                // deleteStream(toUser);
                connection.restartIce();
                break;
            case "failed":
                console.log("Web RTC Peer Connection Failed. Please reload the page to reconnect.");
                remoteStreams.delete(toUser);
                console.log(event);
                break;
            case "closed":
                console.log("Web RTC Peer Connection Closed. Please reload the page to reconnect.");
                remoteStreams.delete(toUser);
                break;
            default:
                break;
        }
    }
    connections.set(toUser, connection);
    console.log("Web RTC Peer Connection Created.");
    // document.getElementById("sendOfferButton").disabled = false;
}

const createAndSendOffer = (toUser,params) => {
    // if (channel) {
    //     channel.close();
    // }

    // Create Data channel
    console.log(connections.get(toUser))
    let channel = connections.get(toUser).createDataChannel('channel', {});
    setChannelEvents(channel);

    // Create Offer
    connections.get(toUser).createOffer().then(
        offer => {
            console.log('Sent The Offer.');

            // Send Offer to other peer
            socket.send(JSON.stringify(
                {
                    action: 'MESSAGE',
                    type: 'OFFER',
                    data: offer,
                    id: params.id,
                    to: toUser,
                    from: params.id
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

const setChannelEvents = (channel) => {
    channel.onmessage = function (event) {
        var data = JSON.parse(event.data);
        document.getElementById("chatTextArea").value += data.message + '\n';
    };

    channel.onerror = function (event) {
        console.log('DataChannel Error.');
        console.error(event)
    };

    channel.onclose = function (event) {
        console.log('DataChannel Closed.');
    };
}

const handleCandidate = (candidate, id, toUser,params) => {
    if (!connections.has(toUser))
        createRTCPeerConnection(toUser,params);
    // Avoid accepting the ice candidate if this is a message created by the current peer
    if (params.id !== id) {
        console.log("Adding Ice Candidate - " + candidate.candidate);
        connections.get(toUser).addIceCandidate(new RTCIceCandidate(candidate));
    }
}

/*
    Accepts Offer received from the Caller
*/
const handleOffer = (offer, id, toUser,params) => {
    if (!connections.has(toUser))
        createRTCPeerConnection(toUser,params);
    // Avoid accepting the Offer if this is a message created by the current peer
    if (params.id !== id) {
        console.log("Recieved The Offer.");
        connections.get(toUser).setRemoteDescription(new RTCSessionDescription(offer));
        createAndSendAnswer(toUser, params)
        // document.getElementById("answerButton").disabled = false;
        // document.getElementById("sendOfferButton").disabled = true;
    }
}

/*
    Accetps Answer received from the Receiver
*/
const handleAnswer = (answer, id, toUser,params) => {
    // Avoid accepting the Answer if this is a message created by the current peer
    if (params.id !== id) {
        console.log("Recieved The Answer");
        connections.get(toUser).setRemoteDescription(new RTCSessionDescription(answer));
    }
}

const createAndSendAnswer = (toUser,params) => {

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
                    from: params.id
                }
            ));
        },
        error => {
            console.log('Error when creating an answer.');
            console.error(error);
        }
    );
}
