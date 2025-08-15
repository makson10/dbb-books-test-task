import type { Publisher } from './publisher.types';
import type { Author } from './author.types';
import type { Genre } from './genre.types';

export interface Book {
	id: number;
	title: string;
	isbn: string;
	publishDate: string;
	copiesTotal: number;
	copiesAvailable: number;
	publisher: Publisher;
	authors: Author[];
	genres: Genre[];
}

export type SortBy = 'title' | 'publishDate';
export type Order = 'asc' | 'desc';
