export type PublisherDto = {
	/** Publisher name */
	name: string;
	/** Year publisher was established */
	establishedYear: number;
};

export type AuthorDto = {
	id: number;
	fullName: string;
	birthDate: string;
};

export type Genre = {
	id: number;
	/** Genre name */
	name: string;
};

export type BookWithRelationsDto = {
	id: number;
	title: string;
	isbn: string;
	publishDate: string;
	copiesTotal: number;
	copiesAvailable: number;
	publisherId: number;
	publisher: PublisherDto;
	authors: AuthorDto[];
	genres: Genre[];
};
