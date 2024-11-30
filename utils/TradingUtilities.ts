export class TradingUtilities {
	public static PassengerTraffic(dm: number): number {
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

	public static FreightTraffic(dm: number): number {
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
}
