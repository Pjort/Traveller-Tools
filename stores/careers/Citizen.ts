import { Career, Assignment, DiceCheck, TrainingTable, Reward } from "#imports";

export const Citizen: Career = new Career(3, "Citizen", new DiceCheck(5, "EDU"), [], []);
