import React, { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../stylesheets/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown () {
	const { startNewChallenger } = useContext(ChallengesContext);

	const [time, setTime] = useState(0.1 * 60); // 25 multiplied by 60 is equal to 1500 minutes.
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
	const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

	function startCountdown() {
		setIsActive(true);
	}

	function resetCountdown() {
		clearTimeout(countdownTimeout);
		setIsActive(false);
		setTime(0.1 * 60);
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
		<React.Fragment>
			<div className={styles.countdownContainer}>
				<div>
					<span>{ minuteLeft }</span>
					<span>{ minuteRight }</span>
				</div>

				<span>:</span>

				<div>
					<span>{ secondLeft }</span>
					<span>{ secondRight }</span>
				</div>
			</div>

			{ hasFinished ? (
				<button
					disabled
					className={ styles.countdownButton }
				>
					Ciclo encerrado
				</button>
			) : (
				<React.Fragment>
					{ isActive ? (
						<button
							type="button"
							className={`${ styles.countdownButton } ${ styles.countdownButtonActive }`}
							onClick={ resetCountdown }
						>
							Abandonar ciclo
						</button>
					) : (
						<button
							type="button"
							className={ styles.countdownButton }
							onClick={ startCountdown }
						>
							Iniciar um ciclo
						</button>
					) }
				</React.Fragment>
			) }
		</React.Fragment>
	);
}
