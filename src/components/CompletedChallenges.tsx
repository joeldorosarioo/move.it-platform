import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';

import styles from '../stylesheets/components/CompletedChallenges.module.css';

export function CompletedChallenges () {
	const { challengesCompleted } = useContext(ChallengesContext);

	return (
		<div className={ styles.completdChallengesContainer }>
			<span>Desafios completos</span>
			<span>{ challengesCompleted }</span>
		</div>
	);
}
