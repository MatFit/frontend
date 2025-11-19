import React from 'react';
import PageLayout from '../components/PageLayout';

export default function WatchlistHistory() {
	return (
		<PageLayout title="Watchlist History" subtitle="Trades and changes to your watchlists">
			<div className="placeholder-grid-wh">
				<div className="panel">
					<h3>History</h3>
					<p>Recent additions, removals, and trade notes will appear here.</p>
				</div>

				<div className="panel">
					<h3>Watchlist</h3>
					<p>List of your saved watchlists and a quick summary.</p>
				</div>
			</div>
		</PageLayout>
	);
}
