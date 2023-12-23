'use client'
import React, { useEffect, useRef, useState } from 'react';
import { PoseLandmarker, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
import { updatescore } from '@/util/api';

type WebcamProps = {
    entry: any;
};

const Webcam: React.FC<WebcamProps> = ({ entry }: { entry: any }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const landmarkKeyMapping = {
        12: 'landmark_shoulder_right',
        11: 'landmark_shoulder_left',
        14: 'landmark_elbow_right',
        13: 'landmark_elbow_left',
        16: 'landmark_wrist_right',
        15: 'landmark_wrist_left',
        20: 'landmark_index_right',
        19: 'landmark_index_left',
        24: 'landmark_hip_right',
        23: 'landmark_hip_left',
    };
    let poseLandmarker: PoseLandmarker;
    const [frameCount, setFrameCount] = useState(0);
    const [rightShoulderLandmarks, setRightShoulderLandmarks] = useState(['', '', '']);
    const [leftShoulderLandmarks, setLeftShoulderLandmarks] = useState(['', '', '']);
    const [rightElbowLandmarks, setRightElbowLandmarks] = useState(['', '', '']);
    const [leftElbowLandmarks, setLeftElbowLandmarks] = useState(['', '', '']);
    const [rightWristLandmarks, setRightWristLandmarks] = useState(['', '', '']);
    const [leftWristLandmarks, setLeftWristLandmarks] = useState(['', '', '']);
    const [rightIndexLandmarks, setRightIndexLandmarks] = useState(['', '', '']);
    const [leftIndexLandmarks, setLeftIndexLandmarks] = useState(['', '', '']);
    const [rightHipLandmarks, setRightHipLandmarks] = useState(['', '', '']);
    const [leftHipLandmarks, setLeftHipLandmarks] = useState(['', '', '']);

    useEffect(() => {
        const activateWebcam = async () => {
            try {
                const vision = await FilesetResolver.forVisionTasks(
                    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
                );
                poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
                        delegate: 'GPU',
                    },
                    runningMode: 'VIDEO',
                    numPoses: 2,
                });

                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                if (videoRef.current) {
                    videoRef.current.addEventListener('loadeddata', predictWebcam);
                }
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        };

        let lastUpdateTime = Date.now();

const predictWebcam = async () => {
    if (canvasRef.current && videoRef.current) {
        const canvasContext = canvasRef.current.getContext('2d');
        const drawingUtils = new DrawingUtils(canvasContext);
        poseLandmarker.detectForVideo(videoRef.current, performance.now(), async (result) => {
            canvasContext.save();
            canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            const landmarkSetters = {
                12: setRightShoulderLandmarks,
                11: setLeftShoulderLandmarks,
                14: setRightElbowLandmarks,
                13: setLeftElbowLandmarks,
                16: setRightWristLandmarks,
                15: setLeftWristLandmarks,
                20: setRightIndexLandmarks,
                19: setLeftIndexLandmarks,
                24: setRightHipLandmarks,
                23: setLeftHipLandmarks,
            };

            for (const landmark of result.landmarks) {
                drawingUtils.drawLandmarks(landmark, {
                    radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
                });
                drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
                if (Date.now() - lastUpdateTime > 5000) { // 1000ms/10 = 100ms
                    lastUpdateTime = Date.now();
                    console.log('frameCount:', frameCount);  // Add this line
                    let newLandmarks = {
                        landmark_shoulder_right: rightShoulderLandmarks,
                        landmark_shoulder_left: leftShoulderLandmarks,
                        landmark_elbow_right: rightElbowLandmarks,
                        landmark_elbow_left: leftElbowLandmarks,
                        landmark_wrist_right: rightWristLandmarks,
                        landmark_wrist_left: leftWristLandmarks,
                        landmark_hip_right: rightHipLandmarks,
                        landmark_hip_left: leftHipLandmarks,
                        landmark_index_right: rightIndexLandmarks,
                        landmark_index_left: leftIndexLandmarks
                    };
                    for (const point of landmark) {
                        const pointArray = [point.x, point.y, point.z];
                        const key = landmarkKeyMapping[landmark.indexOf(point)];
                        if (key) {
                            console.log('Setting landmark:', key, point);
                            newLandmarks[key] = pointArray;
                        }
                    }
            
                    await updatescore(entry.id, newLandmarks);
            
                }
            }
            canvasContext?.restore();
        });
    }

    setFrameCount(prevFrameCount => prevFrameCount + 1);
    window.requestAnimationFrame(predictWebcam);
};

        activateWebcam();
    }, [entry.id]);

    return (
        <>
            <video ref={videoRef} style={{ display: 'none' }} autoPlay />
            <canvas ref={canvasRef} className="w-full h-full" />
        </>
    );
};

export default Webcam;