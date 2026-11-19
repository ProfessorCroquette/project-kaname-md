import { error } from '@sveltejs/kit';
import { analyses, getAnalysis } from '../../../../lib/analyses';

export const entries = () => analyses.map(({ id }) => ({ slug: id }));

export function load({ params }) {
	const analysis = getAnalysis(params.slug);

	if (!analysis) {
		error(404, 'Analysis not found');
	}

	return { analysis };
}
