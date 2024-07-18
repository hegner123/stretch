import { TimerSets,Timer } from "../../types";
// Example data for the `sets` table
const exampleSets: TimerSets[] = [
    {
        id: 1,
        userId: 1,
        name: "Morning Routine",
        timerOrder: [1, 2, 3]
    },
    {
        id: 2,
        userId: 2,
        name: "Workout",
        timerOrder: [4, 5, 6]
    }
];

// Example data for the `timers` table
const exampleTimers: Timer[] = [
    {
        id: 1,
        userId: 1,
        setId: 1,
        timeMs: 300000,
        type: "exercise"
    },
    {
        id: 2,
        userId: 1,
        setId: 1,
        timeMs: 150000,
        type: "rest"
    },
    {
        id: 3,
        userId: 1,
        setId: 1,
        timeMs: 600000,
        type: "exercise"
    },
    {
        id: 4,
        userId: 2,
        setId: 2,
        timeMs: 1800000,
        type: "exercise"
    },
    {
        id: 5,
        userId: 2,
        setId: 2,
        timeMs: 300000,
        type: "rest"
    },
    {
        id: 6,
        userId: 2,
        setId: 2,
        timeMs: 1200000,
        type: "exercise"
    }
];

