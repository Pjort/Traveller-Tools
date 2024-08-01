import { Career, Assignment, DiceCheck, TrainingTable, Reward } from "#imports";

export const Entertainer: Career = new Career(5, "Entertainer", new DiceCheck(5, "DEX or INT"), [], []);
