
let Rula_table_B = [
    [1, 3, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7],
    [2, 3, 2, 3, 4, 5, 5, 5, 6, 7, 7, 7],
    [3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7],
    [5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 8, 8],
    [7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8],
    [8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9],
]
let Rula_table_C = [
    [1, 2, 3, 3, 4, 5, 5],
    [2, 2, 3, 4, 4, 5, 5],
    [3, 3, 3, 4, 4, 5, 6],
    [3, 3, 3, 4, 5, 6, 6],
    [4, 4, 4, 5, 6, 7, 7],
    [4, 4, 4, 5, 6, 7, 7],
    [5, 5, 6, 6, 7, 7, 7],
    [5, 5, 6, 7, 7, 7, 7],
]

interface Point {
    x: number;
    y: number;
    z: number;
}



const calculateAngle = async (a: Point, b: Point, c: Point) => {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    if (angle > 180) {
        angle -= 360;
    }
    return angle;
}

const calculate_upperarm_Score = async (landmark: { [key: string]: [number, number, number] } ) => {
    let upper_arm_score = 0
    const neck_x = await (landmark.landmark_shoulder_left.x + landmark.landmark_shoulder_right.x) / 2
    const trunk_x = await (landmark.landmark_hip_left.x + landmark.landmark_hip_right.x) / 2
    const upperArmleft = await calculateAngle(landmark.landmark_shoulder_left, landmark.landmark_elbow_left, landmark.landmark_hip_left);
    const upperArmright = await calculateAngle(landmark.landmark_shoulder_right, landmark.landmark_elbow_right, landmark.landmark_hip_right);
    if ((-20 < upperArmright && upperArmright < 20) || (-20 < upperArmleft && upperArmleft < 20)) {
        upper_arm_score = upper_arm_score + 1;
    }
    if (upperArmright < -20 || upperArmleft < -20) {
        upper_arm_score = upper_arm_score + 2
    }
    if ((45 > upperArmright && upperArmright > 20) || (45 > upperArmleft && upperArmleft > 20)) {
        upper_arm_score = upper_arm_score + 2
    }
    if ((90 > upperArmright && upperArmright > 45) || (90 > upperArmleft && upperArmleft > 45)) {
        upper_arm_score = upper_arm_score + 3
    }
    if ((180 > upperArmright && upperArmright > 90) || (180 > upperArmleft && upperArmleft > 90)) {
        upper_arm_score = upper_arm_score + 4
    }
    if (neck_x > trunk_x) {
        upper_arm_score = upper_arm_score - 1
    }
    return upper_arm_score

}

const calculate_lower_arm_score = async (landmark: { [key: string]: [number, number, number] }) => {
    let lower_arm_score = 0
    const lowerarmright = await calculateAngle(scoreas.landmark_elbow_right, scoreas.landmark_elbow_right, scoreas.landmark_hip_right)
    const lowerarmleft = await calculateAngle(scoreas.landmark_elbow_left, scoreas.landmark_elbow_left, scoreas.landmark_hip_left)
    if ((60 < lowerarmright && lowerarmright < 100) || (60 < lowerarmleft && lowerarmleft < 100)) {
        lower_arm_score = lower_arm_score + 1
    }
    if ((0 < lowerarmright && lowerarmright < 60) || lowerarmright > 100 || (0 < lowerarmleft && lowerarmleft < 60) || lowerarmleft > 100) {
        lower_arm_score = lower_arm_score + 2
    }

    return lower_arm_score
}

const calculate_wrist_score = async (landmark: { [key: string]: [number, number, number] }) => {
    if (!landmark) {
        throw new Error('Landmark object is undefined');
    }

    const requiredProperties = [
        'landmark_shoulder_right',
        'landmark_shoulder_left',
        'landmark_elbow_right',
        'landmark_elbow_left',
        'landmark_wrist_right',
        'landmark_wrist_left',
        'landmark_hip_right',
        'landmark_hip_left',
        'landmark_index_right',
        'landmark_index_left'
    ];

    for (const property of requiredProperties) {
        if (!landmark[property]) {
            throw new Error(`Landmark object is missing property: ${property}`);
        }
    }

    let wrist_score = 0
    const wristright = await calculateAngle(landmark.landmark_elbow_right, landmark.landmark_wrist_right, landmark.landmark_index_right)
    const wristleft = await calculateAngle(landmark.landmark_elbow_left, landmark.landmark_wrist_left, landmark.landmark_index_left)
    if (wristright === 0 || wristleft === 0) {
        wrist_score = wrist_score + 1;
    }
    if (-15 > wristright && wristright < 15 || -15 > wristleft && wristleft < 15) {
        wrist_score = wrist_score + 2;
    }
    if (wristright > 15 || wristleft > 15) {
        wrist_score = wrist_score + 3;
    }
    return wrist_score
}

export const calculate_score_A = async (entry: { landmark: Point }) => {
    let Rula_table_A: number[][] = [
        [1, 2, 2, 2, 2, 3, 3, 3],
        [2, 2, 2, 2, 3, 3, 3, 3],
        [2, 3, 3, 3, 3, 3, 4, 4],
        [2, 3, 3, 3, 3, 4, 4, 4],
        [3, 3, 3, 3, 3, 4, 4, 4],
        [3, 4, 4, 4, 4, 4, 5, 5],
        [3, 3, 4, 4, 4, 4, 5, 5],
        [3, 4, 4, 4, 4, 4, 5, 5],
        [4, 4, 4, 4, 4, 5, 5, 5],
        [4, 4, 4, 4, 4, 5, 5, 5],
        [4, 4, 4, 4, 4, 5, 5, 5],
        [4, 4, 4, 5, 5, 5, 6, 6],
        [5, 5, 5, 5, 5, 6, 6, 7],
        [5, 6, 6, 6, 6, 7, 7, 7],
        [6, 6, 6, 7, 7, 7, 7, 8],
        [7, 7, 7, 7, 7, 8, 8, 9],
        [8, 8, 8, 8, 8, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9],
    ]
    const wrist_score = await calculate_wrist_score(entry.scoreas)
    const upper_arm_score = await calculate_upperarm_Score(entry.scoreas)
    const lower_arm_score = await calculate_lower_arm_score(entry.scoreas)
    const columnIndex = await (wrist_score - 1) * 2 + 1
    const rowIndex = await (upper_arm_score - 1) * 3 + (lower_arm_score - 1)
    const score_a = await Rula_table_A[rowIndex][columnIndex];
    return score_a;
}
