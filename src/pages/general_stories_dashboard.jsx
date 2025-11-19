import React from 'react';
import PageLayout from '../components/PageLayout';

export default function GeneralStoriesDashboard() {
	return (
		<PageLayout title="News & Stories" subtitle="Curated market stories and sentiment">
			<div className="placeholder-grid">
				<div className="panel">
					<h3>Filters</h3>
					<p>Sector, source, time range, and sentiment filters.</p>
				</div>

				<div className="panel">
					<h3>Top Stories</h3>
					<ul>
						<li>Headline 1 — short summary</li>
						<li>Headline 2 — short summary</li>
						<li>Headline 3 — short summary</li>
					</ul>
				</div>
			</div>
		</PageLayout>
	);
}
