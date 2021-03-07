import styles from '../stylesheets/components/Profile.module.css';

export function Profile() {
	return (
		<div className={ styles.profileContainer }>
			<img src="https://github.com/joeldorosarioo.png" alt="Joel Oliveira"/>

			<div>
				<strong>Joel Oliveira</strong>

				<p>
					<img src="icons/level.svg" alt="Current Level"/>
					Level 1
				</p>
			</div>
		</div>
	);
}
