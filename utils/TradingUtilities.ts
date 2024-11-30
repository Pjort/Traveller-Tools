export class TradingUtilities {
	private static PassengerTraffic(dm: number): number {
		if (dm <= 1) {
			return 0;
		} else if (dm <= 3) {
			return 1;
		} else if (dm <= 6) {
			return 2;
		} else if (dm <= 10) {
			return 3;
		} else if (dm <= 13) {
			return 4;
		} else if (dm <= 15) {
			return 5;
		} else if (dm <= 16) {
			return 6;
		} else if (dm <= 17) {
			return 7;
		} else if (dm <= 18) {
			return 8;
		} else if (dm <= 19) {
			return 9;
		} else {
			return 10;
		}
	}

	private static FreightTraffic(dm: number): number {
		if (dm <= 1) {
			return 0;
		} else if (dm <= 3) {
			return 1;
		} else if (dm <= 5) {
			return 2;
		} else if (dm <= 8) {
			return 3;
		} else if (dm <= 11) {
			return 4;
		} else if (dm <= 14) {
			return 5;
		} else if (dm <= 16) {
			return 6;
		} else if (dm <= 17) {
			return 7;
		} else if (dm <= 18) {
			return 8;
		} else if (dm <= 19) {
			return 9;
		} else {
			return 10;
		}
	}

	public static HighPassagePricePerParsec(parsecs: number): number {
		if (parsecs <= 1) {
			return 9000;
		} else if (parsecs <= 2) {
			return 14000;
		} else if (parsecs <= 3) {
			return 21000;
		} else if (parsecs <= 4) {
			return 34000;
		} else if (parsecs <= 5) {
			return 60000;
		} else {
			return 210000;
		}
	}

	public static MiddlePassagePricePerParsec(parsecs: number): number {
		if (parsecs <= 1) {
			return 6500;
		} else if (parsecs <= 2) {
			return 10000;
		} else if (parsecs <= 3) {
			return 14000;
		} else if (parsecs <= 4) {
			return 23000;
		} else if (parsecs <= 5) {
			return 40000;
		} else {
			return 130000;
		}
	}

	public static BasicPassagePricePerParsec(parsecs: number): number {
		if (parsecs <= 1) {
			return 2000;
		} else if (parsecs <= 2) {
			return 3000;
		} else if (parsecs <= 3) {
			return 5000;
		} else if (parsecs <= 4) {
			return 8000;
		} else if (parsecs <= 5) {
			return 14000;
		} else {
			return 55000;
		}
	}

	public static LowPassagePricePerParsec(parsecs: number): number {
		if (parsecs <= 1) {
			return 700;
		} else if (parsecs <= 2) {
			return 1300;
		} else if (parsecs <= 3) {
			return 2200;
		} else if (parsecs <= 4) {
			return 3900;
		} else if (parsecs <= 5) {
			return 7200;
		} else {
			return 27000;
		}
	}

	public static FreightPricePerTonPerParsect(parsecs: number): number {
		if (parsecs <= 1) {
			return 1000;
		} else if (parsecs <= 2) {
			return 1600;
		} else if (parsecs <= 3) {
			return 2600;
		} else if (parsecs <= 4) {
			return 4400;
		} else if (parsecs <= 5) {
			return 8500;
		} else {
			return 32000;
		}
	}

	public static SeekingPassengers(
		roll: number,
		stewardLevel: number,
		brokerLevel: number,
		parsecs: number,
		fromUwp: string,
		toUwp: string,
		highPassage: boolean,
		lowPassage: boolean,
	): number {
		var effect = 0;
		effect += roll;
		effect += stewardLevel;
		effect += brokerLevel;
		effect -= parsecs;
		if (highPassage) effect -= 4;
		if (lowPassage) effect += 1;
		effect += this.PassengerPopulationDM(fromUwp);
		effect += this.PassengerStartportDM(fromUwp);
		effect += this.PassengerPopulationDM(toUwp);
		effect += this.PassengerStartportDM(toUwp);
		effect -= 8; // Avarage roll
		return this.PassengerTraffic(effect);
	}

	private static PassengerPopulationDM(uwp: string): number {
		var pop = parseInt(uwp[4]);
		if (pop <= 1) return -4;
		if (pop <= 5) return 0;
		if (pop <= 7) return 1;
		if (pop <= 8) return 3;
		return 0;
	}

	private static PassengerStartportDM(uwp: string): number {
		var starport = uwp[0];
		if (starport == "A") return 2;
		if (starport == "B") return 1;
		if (starport == "E") return -1;
		if (starport == "X") return -3;
		return 0;
	}

	public static SeekingFreight(
		roll: number,
		brokerLevel: number,
		parsecs: number,
		fromUwp: string,
		toUwp: string,
		majorCargo: boolean,
		incidentalCargo: boolean,
	): number {
		var effect = 0;
		effect += roll;
		effect += brokerLevel;
		effect -= parsecs;
		if (majorCargo) effect -= 4;
		if (incidentalCargo) effect += 2;
		effect += this.FreightPopulationDM(fromUwp);
		effect += this.FreightStartportDM(fromUwp);
		effect += this.FreightTechLevelDM(fromUwp);
		effect += this.FreightPopulationDM(toUwp);
		effect += this.FreightStartportDM(toUwp);
		effect += this.FreightTechLevelDM(toUwp);
		effect -= 8; // Avarage roll
		return this.FreightTraffic(effect);
	}

	public static seekingMail(roll: number, brokerLevel: number, parsecs: number, fromUwp: string, toUwp: string): number {
		var effect = 0;
		effect += roll;
		effect += brokerLevel;
		effect -= parsecs;
		effect += this.FreightPopulationDM(fromUwp);
		effect += this.FreightStartportDM(fromUwp);
		effect += this.FreightTechLevelDM(fromUwp);
		effect += this.FreightPopulationDM(toUwp);
		effect += this.FreightStartportDM(toUwp);
		effect += this.FreightTechLevelDM(toUwp);
		effect -= 8; // Avarage roll
		if (effect >= 12) return 1;
		return 0;
	}

	private static FreightPopulationDM(uwp: string): number {
		var popString = uwp[4];
		if (popString == "A") popString = "10";
		if (popString == "B") popString = "11";
		if (popString == "C") popString = "12";
		if (popString == "D") popString = "13";
		if (popString == "E") popString = "14";
		if (popString == "F") popString = "15";
		var pop = parseInt(popString);
		if (pop <= 1) return -4;
		if (pop <= 5) return 0;
		if (pop <= 7) return 2;
		if (pop <= 8) return 4;
		return 0;
	}

	private static FreightStartportDM(uwp: string): number {
		var starport = uwp[0];
		if (starport == "A") return 2;
		if (starport == "B") return 1;
		if (starport == "E") return -1;
		if (starport == "X") return -3;
		return 0;
	}

	private static FreightTechLevelDM(uwp: string): number {
		var techString = uwp[8];
		if (techString == "A") techString = "10";
		if (techString == "B") techString = "11";
		if (techString == "C") techString = "12";
		if (techString == "D") techString = "13";
		if (techString == "E") techString = "14";
		if (techString == "F") techString = "15";
		var tech = parseInt(techString);
		if (tech <= 6) return -1;
		if (tech <= 8) return 0;
		return 4;
	}
}
