import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from './ChallengesContexts';

interface CountdownContextData {
	minutes: number;
	seconds: number;
	hasFinished: boolean;
	isActive: boolean;
	startCountdown: () => void;
	resetCountdown: () => void;
}

interface CountdownProviderProps {
	children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
	const { startNewChallenger } = useContext(ChallengesContext);

	const [time, setTime] = useState(0.1 * 60); // 25 multiplied by 60 is equal to 1500 minutes.
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	function startCountdown() {
		setIsActive(true);
	}

	function resetCountdown() {
		clearTimeout(countdownTimeout);
		setIsActive(false);
		setTime(0.1 * 60);
		setHasFinished(false);
	}

	useEffect(() => {
		if (isActive && time > 0) {
			countdownTimeout = setTimeout(() => {
				setTime( time - 1);
			}, 1000);
		}  else if (isActive && time === 0) {
			setHasFinished(true);
			setIsActive(false);
			startNewChallenger();
		}
	}, [isActive, time]);

	return (
		<CountdownContext.Provider value={{
			minutes,
			seconds,
			hasFinished,
			isActive,
			startCountdown,
			resetCountdown
		}}>
			{ children }
		</CountdownContext.Provider>
	)
}
