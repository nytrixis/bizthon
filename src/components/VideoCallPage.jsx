import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import ChatComponent from './ChatComponent';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaSignOutAlt } from 'react-icons/fa'; // Import icons

const socket = io('http://localhost:3000');

function VideoCallPage() {
    const { sessionId } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);

    useEffect(() => {
        const constraints = { video: true, audio: true };
        const newPeerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        setPeerConnection(newPeerConnection);

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                setMediaStream(stream);
                localVideoRef.current.srcObject = stream;
                stream.getTracks().forEach(track => {
                    if (newPeerConnection.signalingState !== 'closed') {
                        newPeerConnection.addTrack(track, stream);
                    } else {
                        console.error('Peer connection is closed. Cannot add track.');
                    }
                });
            })
            .catch((error) => {
                console.error('Error accessing media devices:', error);
            });

        newPeerConnection.ontrack = (event) => {
            console.log('Remote track received:', event);
            if (event.streams && event.streams[0]) {
                remoteVideoRef.current.srcObject = event.streams[0];
            } else {
                console.error('No remote stream found.');
            }
        };

        socket.on('offer', (offer) => {
            console.log('Received offer:', offer);
            newPeerConnection.setRemoteDescription(new RTCSessionDescription(offer))
                .then(() => newPeerConnection.createAnswer())
                .then(answer => {
                    newPeerConnection.setLocalDescription(answer);
                    socket.emit('answer', answer);
                })
                .catch((error) => {
                    console.error('Error handling offer:', error);
                });
        });

        socket.on('answer', (answer) => {
            console.log('Received answer:', answer);
            newPeerConnection.setRemoteDescription(new RTCSessionDescription(answer))
                .catch((error) => {
                    console.error('Error setting remote description:', error);
                });
        });

        socket.on('ice-candidate', (candidate) => {
            console.log('Received ICE candidate:', candidate);
            newPeerConnection.addIceCandidate(new RTCIceCandidate(candidate))
                .catch((error) => {
                    console.error('Error adding ICE candidate:', error);
                });
        });

        newPeerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', event.candidate);
            }
        };

        // Cleanup on component unmount
        return () => {
            if (newPeerConnection.signalingState !== 'closed') {
                newPeerConnection.close();
            }
            socket.disconnect();
        };
    }, [sessionId]);

    const handleDisconnect = () => {
        if (peerConnection) {
            peerConnection.close();
            setPeerConnection(null);
        }
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
        socket.disconnect();
        navigate('/patient'); // Redirect to /patient
    };

    const handleMute = () => {
        if (mediaStream) {
            mediaStream.getAudioTracks().forEach(track => {
                track.enabled = !isMuted;
            });
            setIsMuted(!isMuted);
        }
    };

    const handleCameraToggle = () => {
        if (mediaStream) {
            mediaStream.getVideoTracks().forEach(track => {
                track.enabled = !isCameraOff;
    
                // If the camera is turned off, stop the track to release the camera resource
                if (isCameraOff) {
                    track.stop();
                }
            });
            setIsCameraOff(!isCameraOff);
        }
    };
    

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Virtual Consultation</h1>
            <div style={styles.videoContainer}>
                <video ref={localVideoRef} autoPlay muted={isMuted} style={styles.video} />
                <video ref={remoteVideoRef} autoPlay style={styles.video} />
            </div>
            <ChatComponent />
            <div style={styles.controls}>
                <button style={styles.button} onClick={handleMute}>
                    {isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
                </button>
                <button style={styles.button} onClick={handleCameraToggle}>
                    {isCameraOff ? <FaVideoSlash /> : <FaVideo />}
                </button>
                <button style={styles.button} onClick={handleDisconnect}>
                    <FaSignOutAlt />
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 93px)', // Adjust for the navbar height
        backgroundColor: 'transparent', // Remove background
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    videoContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px', // Space between videos
    },
    video: {
        width: '45%',
        height: 'auto',
        border: '2px solid #ccc',
        borderRadius: '8px',
    },
    controls: {
        marginTop: '20px',
        display: 'flex',
        gap: '10px', // Space between buttons
    },
    button: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#000',
    },
};

export default VideoCallPage;
