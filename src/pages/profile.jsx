import React from 'react';
import PageLayout from '../components/PageLayout';

export default function Profile() {
	return (
		<PageLayout title="Profile" subtitle="Your account and personal settings">
			<div className="placeholder-grid">
				<div className="panel">
					<h3>Account</h3>
					<p><strong>Username:</strong> demo_user</p>
					<p><strong>Email:</strong> demo@example.com</p>
					<p>Short bio and account metadata go here.</p>
				</div>

				<div className="panel">
					<h3>Activity</h3>
					<p>Recent activity, watchlist changes, and quiz summaries will appear here.</p>
				</div>
			</div>
		</PageLayout>
	);
}