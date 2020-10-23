/**
 * Defines the common attributes of a transformer.
 */
export class Transformer {
    name: string;
    strength: SkillRange;
    intelligence: SkillRange;
    speed: SkillRange;
    endurance: SkillRange;
    rank: SkillRange;
    courage: SkillRange;
    firepower: SkillRange;
    skill: SkillRange;
    type?: TransformerType;

    status: 'skipped' | 'defeated' | 'destroyed';

    constructor(name: string,
                strength: SkillRange,
                intelligence: SkillRange, speed: SkillRange,
                endurance: SkillRange, rank: SkillRange,
                courage: SkillRange, firepower: SkillRange,
                skill: SkillRange,
                type: TransformerType) {
        this.name = name;
        this.strength = strength;
        this.intelligence = intelligence;
        this.speed = speed;
        this.endurance = endurance;
        this.rank = rank;
        this.courage = courage;
        this.firepower = firepower;
        this.skill = skill;
        this.type = type;
    }

    // Calculates the overall rating based on transformer's attribute.
    overallRating(): number {
        return this.strength + this.intelligence + this.speed + this.endurance + this.firepower;
    }
}

/**
 * Defines an Autobot.
 */
export class Autobot extends Transformer {
    constructor(name: string,
                strength: SkillRange,
                intelligence: SkillRange, speed: SkillRange,
                endurance: SkillRange, rank: SkillRange,
                courage: SkillRange, firepower: SkillRange,
                skill: SkillRange) {
        super(name, strength, intelligence, speed, endurance, rank, courage, firepower, skill, 'Autobot');
    }

}

/**
 * Defines a Decepticon.
 */
export class Decepticon extends Transformer {

    constructor(name: string,
                strength: SkillRange,
                intelligence: SkillRange, speed: SkillRange,
                endurance: SkillRange, rank: SkillRange,
                courage: SkillRange, firepower: SkillRange,
                skill: SkillRange) {
        super(name, strength, intelligence, speed, endurance, rank, courage, firepower, skill, 'Decepticon');
    }
}

/** Limits the skill range from 1 to 10 */
export type SkillRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/** Limits the transformer type to either Autobot or Decepticon to prevent errors */
export type TransformerType = 'Autobot' | 'Decepticon';

/** Define an object to return an array of Transformers */
export type Bots = { autobots: Autobot[], decepticons: Decepticon[] };

/** Defines a Fight result */
export type FightResult = { group: 'A' | 'D' | 'T', winner?: Transformer, loser?: Transformer };
