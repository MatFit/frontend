import React from 'react';
import PageLayout from '../components/PageLayout';

export default function Quiz() {
	return (
		<PageLayout title="Quiz Yourself" subtitle="Short quizzes to test market knowledge">
			<div className='q-placeholder' style={{ maxWidth: 760 }}>
				<div className="panel">
					<h3>Start a Quiz</h3>
					<p>Pick a topic or use your watchlist to generate quick multiple-choice quizzes.</p>
					<button style={{ marginTop: 12 }}>Start Quiz</button>
				</div>

				<div className="panel" style={{ marginTop: 16 }}>
					<h3>Recent Scores</h3>
					<p>Your most recent quiz attempts will be shown here.</p>
				</div>
			</div>
		</PageLayout>
	);
}
