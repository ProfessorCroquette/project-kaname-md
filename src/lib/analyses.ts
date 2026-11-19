export interface Analysis {
	id: string;
	title: string;
	date: string;
	category: string;
	description: string;
}

interface AnalysisMetadata {
	title: string;
	date: string;
	category: string;
	description: string;
}

const metadataFiles = import.meta.glob<unknown>('/src/content/analyses/*.md', {
	eager: true,
	query: '?metadata',
	import: 'default'
});

function createAnalysis(path: string, metadata: unknown): Analysis {
	if (typeof metadata !== 'object' || metadata === null) {
		throw new Error(`Analysis "${path}" must have frontmatter metadata.`);
	}

	const values = metadata as Record<string, unknown>;
	const filename = path.slice(path.lastIndexOf('/') + 1);
	const id = filename.slice(0, -'.md'.length);
	const { title, date, category, description } = values;

	if (
		!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
		typeof title !== 'string' ||
		typeof category !== 'string' ||
		typeof description !== 'string'
	) {
		throw new Error(
			`Analysis "${path}" must have a slug filename and title, category, and description frontmatter.`
		);
	}

	const normalizedDate =
		date instanceof Date
			? Number.isNaN(date.valueOf())
				? ''
				: date.toISOString().slice(0, 10)
			: typeof date === 'string'
				? date
				: '';

	if (!normalizedDate || Number.isNaN(Date.parse(normalizedDate))) {
		throw new Error(`Analysis "${path}" must have a valid date in its frontmatter.`);
	}

	const analysisMetadata: AnalysisMetadata = {
		title,
		date: normalizedDate,
		category,
		description
	};

	return { id, ...analysisMetadata };
}

export const analyses = Object.entries(metadataFiles)
	.map(([path, metadata]) => createAnalysis(path, metadata))
	.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export function getAnalysis(id: string): Analysis | undefined {
	return analyses.find((analysis) => analysis.id === id);
}
