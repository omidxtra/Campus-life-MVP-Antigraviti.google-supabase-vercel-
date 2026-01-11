
export interface ClassSession {
    id: number;
    course: string;
    time: string;
    room: string;
    type: string;
}

export const weeklySchedule: Record<string, ClassSession[]> = {
    Monday: [
        { id: 1, course: 'AIDE1101 Intro to Data Science Programming', time: '09:00 - 11:20', room: 'IKB 13', type: 'Lecture' },
        { id: 2, course: 'AIDE1101 Intro to Data Science Programming', time: '12:20 - 13:50', room: 'E-Lab 1', type: 'Lab' },
    ],
    Tuesday: [
        { id: 3, course: 'CITF1002 Career Planning', time: '10:40 - 12:10', room: 'D5', type: 'Lecture' },
    ],
    Wednesday: [
        { id: 4, course: 'MATH1102 Calculus I', time: '09:00 - 11:20', room: 'D5', type: 'Lecture' },
        { id: 5, course: 'CITF1003 Intro to IT', time: '12:20 - 13:50', room: 'E-Lab 1', type: 'Lab' },
        { id: 6, course: 'ENGL1101 English for Academic Purposes', time: '14:00 - 15:30', room: 'D5', type: 'Lecture' },
    ],
    Thursday: [
        { id: 7, course: 'PHYS1101 Physics I', time: '13:10 - 15:30', room: 'D5', type: 'Lecture' },
    ],
    Friday: [
        { id: 8, course: 'MATH1102-PS Calculus I', time: '14:00 - 15:30', room: 'D5', type: 'Lab' },
        { id: 9, course: 'MATH1102-PS Calculus I', time: '15:40 - 17:10', room: 'IK 204', type: 'Lab' },
    ],
};
