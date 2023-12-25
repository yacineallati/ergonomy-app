interface Point {
    x: number;
    y: number;
    z: number;
}


const createLandmark = (x: number, y: number, z: number): Point => ({
    x,
    y,
    z,
});
const convertArrayToPoint = (arr: number[]): Point => ({ x: arr[0], y: arr[1], z: arr[2] });




const calculateAngle3D = async (a: Point, b: Point, c: Point) => {
    const ba = { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
    const bc = { x: c.x - b.x, y: c.y - b.y, z: c.z - b.z };

    const dotProduct = ba.x * bc.x + ba.y * bc.y + ba.z * bc.z;
    const magnitudeA = Math.sqrt(ba.x * ba.x + ba.y * ba.y + ba.z * ba.z);
    const magnitudeC = Math.sqrt(bc.x * bc.x + bc.y * bc.y + bc.z * bc.z);

    // Avoid division by zero
    if (magnitudeA * magnitudeC === 0) return 0;

    let angleRatio = dotProduct / (magnitudeA * magnitudeC);
    angleRatio = Math.max(-1, Math.min(1, angleRatio)); 
    
    let angle = Math.acos(angleRatio) * 180.0 / Math.PI;
    
    return angle;
};

const calculate_upperarm_Score = async (a, c, d ,e) => {
    let upper_arm_score = 0

    if ((-20 < a && a < 20) ) {
        upper_arm_score = upper_arm_score + 1;
    }
    if (a < -20 ) {
        upper_arm_score = upper_arm_score + 2
    }
    if ((45 > a && a > 20) ) {
        upper_arm_score = upper_arm_score + 2
    }
    if ((90 > a && a > 45) ) {
        upper_arm_score = upper_arm_score + 3
    }
    if ((180 > a && a > 90) ) {
        upper_arm_score = upper_arm_score + 4
    }
    if (c > d || e === true ) {
        upper_arm_score = upper_arm_score - 1
    }
    return upper_arm_score

}

const calculate_lower_arm_score = async (a) => {
    let lower_arm_score = 0
    if ((60 < a && a < 100) ) {
        lower_arm_score = lower_arm_score + 1
    }
    if ((0 < a && a < 60) || a > 100 ) {
        lower_arm_score = lower_arm_score + 2
    }

    return lower_arm_score
}

const calculate_wrist_score = async (a) => {
    let wrist_score = 0

    if (a === 0) {
        wrist_score = wrist_score + 1;
    }
    if (-15 > a && a < 15) {
        wrist_score = wrist_score + 2;
    }
    if (a > 15 ) {
        wrist_score = wrist_score + 3;
    }
    return wrist_score
}

const calculate_neck_score = async (a, b, c) => {
    let neck_score = 0
    if (a>0 && a<10) {
        neck_score = neck_score + 1
    }
    if (a>10 && a<20) {
        neck_score = neck_score + 2
    }
    if (a>20) {
        neck_score = neck_score + 3
    }
    if (a<0) {
        neck_score = neck_score + 4
    }
    if (Math.abs(b-180) > 10) {
        neck_score = neck_score + 1
    }
    if (Math.abs(c-90) > 10) {
        neck_score = neck_score + 1
    }
    return neck_score
}
const calculate_trunk_score = async (a , b , c) => {
    let trunk_score =0
    if (a === 0) {
        trunk_score = trunk_score + 1
    }
    if (a>0 && a<20) {
        trunk_score = trunk_score + 2
    }
    if (a>20 && a<60) {
        trunk_score = trunk_score + 3
    }
    if (a>60) {
        trunk_score = trunk_score + 4
    }
    if (Math.abs(b-180) > 10) {
        trunk_score = trunk_score + 1
    }
    if (Math.abs(c-90) > 10) {
        trunk_score = trunk_score + 1
    }
    return trunk_score
}


export const calculate_score_A = async (entry, input) => {
    const arm_supported = input.supportedarms
    const landmark_elbow_right = convertArrayToPoint(entry.landmark_elbow_right)
    const landmark_elbow_left = convertArrayToPoint(entry.landmark_elbow_left)
    const landmark_wrist_right = convertArrayToPoint(entry.landmark_wrist_right)
    const landmark_wrist_left = convertArrayToPoint(entry.landmark_wrist_left)
    const landmark_index_right = convertArrayToPoint(entry.landmark_index_right)
    const landmark_index_left = convertArrayToPoint(entry.landmark_index_left)
    const landmark_shoulder_right = convertArrayToPoint(entry.landmark_shoulder_right)
    const landmark_shoulder_left = convertArrayToPoint(entry.landmark_shoulder_left)
    const landmark_hip_right = convertArrayToPoint(entry.landmark_hip_right)
    const landmark_hip_left = convertArrayToPoint(entry.landmark_hip_left)
    const neck_x = await ( landmark_shoulder_left.x + landmark_shoulder_right.x) / 2
    const trunk_x = await (landmark_hip_left.x + landmark_hip_right.x) / 2
    const wristright = await calculateAngle3D(landmark_elbow_right, landmark_wrist_right, landmark_index_right)
    const wristleft = await calculateAngle3D(landmark_elbow_left, landmark_wrist_left, landmark_index_left)
    const upperarmright = await calculateAngle3D(landmark_shoulder_right, landmark_elbow_right, landmark_hip_right)
    const upperarmleft = await calculateAngle3D(landmark_shoulder_left, landmark_elbow_left, landmark_hip_left)
    const lowerarmleft = await calculateAngle3D(landmark_shoulder_left, landmark_elbow_left, landmark_wrist_left)
    const lowerarmright = await calculateAngle3D(landmark_shoulder_right, landmark_elbow_right, landmark_wrist_right)
    const wrist_score = await calculate_wrist_score(wristright)
    const upper_arm_score = await calculate_upperarm_Score(upperarmright, neck_x, trunk_x, arm_supported)
    const lower_arm_score = await calculate_lower_arm_score(lowerarmright)


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
    if (wrist_score > 0 && upper_arm_score > 0 && lower_arm_score > 0) {
        const columnIndex = (wrist_score - 1) * 2;
        const rowIndex = (upper_arm_score - 1) * 3 + (lower_arm_score - 1) - 1;
        if (rowIndex >= Rula_table_A.length || columnIndex >= Rula_table_A[0].length) {
            return 9;
        }
        const score_a = Rula_table_A[rowIndex][columnIndex];
        console.log('score_a:', score_a);
        return score_a;
    } else {
        return 0;
    }
}

export const calculate_score_B = async (entry, input) => {
    const convertArrayToPoint = (arr: number[]): Point => ({ x: arr[0], y: arr[1], z: arr[2] });
    const leg_supported = input.supportedlegs
    const support = leg_supported? 2 : 1
    const landmark_nose = convertArrayToPoint(entry.landmark_nose)
    const landmark_ear_left = convertArrayToPoint(entry.landmark_ear_left)
    const landmark_ear_right = convertArrayToPoint(entry.landmark_ear_right) 
    const lankmark_knee_right = convertArrayToPoint(entry.landmark_knee_right)
    const landmark_shoulder_right = convertArrayToPoint(entry.landmark_shoulder_right)
    const landmark_shoulder_left = convertArrayToPoint(entry.landmark_shoulder_left)
    const landmark_hip_right = convertArrayToPoint(entry.landmark_hip_right)
    const landmark_hip_left = convertArrayToPoint(entry.landmark_hip_left)
    const neck_x = await ( landmark_shoulder_left.x + landmark_shoulder_right.x) / 2
    const trunk_x = await (landmark_hip_left.x + landmark_hip_right.x) / 2
    const neck_y = await (landmark_shoulder_left.y + landmark_shoulder_right.y) / 2
    const trunk_y = await (landmark_hip_left.y + landmark_hip_right.y) / 2
    const neck_z = await (landmark_shoulder_left.z + landmark_shoulder_right.z) / 2
    const trunk_z = await (landmark_hip_left.z + landmark_hip_right.z) / 2
    const neckLandmark = createLandmark(neck_x, neck_y, neck_z);
    const trunkLandmark = createLandmark(trunk_x, trunk_y, trunk_z);
    const neck = await calculateAngle3D(trunkLandmark, neckLandmark, landmark_nose)
    const trunk = await calculateAngle3D(lankmark_knee_right, trunkLandmark, neckLandmark)
    const headtwist = await calculateAngle3D(landmark_nose,landmark_ear_left, landmark_ear_right)
    const headbent = await calculateAngle3D(landmark_nose, neckLandmark, landmark_shoulder_right)
    const trunktwist = await calculateAngle3D(trunkLandmark, landmark_shoulder_left, landmark_shoulder_right)
    const trunkbent = await calculateAngle3D(neckLandmark, trunkLandmark, landmark_hip_right)
    const neck_score = await calculate_neck_score(neck, headtwist, headbent)
    const trunk_score = await calculate_trunk_score(trunk, trunktwist, trunkbent)
    let Rula_table_B = [
        [1, 3, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7],
        [2, 3, 2, 3, 4, 5, 5, 5, 6, 7, 7, 7],
        [3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 7],
        [5, 5, 5, 6, 6, 7, 7, 7, 7, 7, 8, 8],
        [7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8],
        [8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9],
    ]
    if (neck_score > 0 && trunk_score > 0) {
        const columnIndex = (trunk_score - 1) * 2 + (support - 1) - 1;
        const rowIndex = neck_score - 1;

        if (rowIndex >= Rula_table_B.length || columnIndex >= Rula_table_B[0].length) {
            return 9;
        }

        const score_b = Rula_table_B[rowIndex][columnIndex];
        console.log('score_b:', score_b);
        return score_b;
    } else {
        return 0;
    }
}

export const calculate_Rula_score_C = async (a, b, input) => {
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
    let wrist_arm_score = a + input.muscle + input.type - 3;
    let neck_trunk_score = b + input.muscle + input.type - 3;

    if (wrist_arm_score >= Rula_table_C.length) {
        wrist_arm_score = Rula_table_C.length - 1;
    }
    if (neck_trunk_score >= Rula_table_C[0].length) {
        neck_trunk_score = Rula_table_C[0].length - 1;
    }

    return Rula_table_C[wrist_arm_score][neck_trunk_score];
}

