export interface BorrowRecord {
	borrower?: {
		name: string;
	};
	borrowedAt?: string;
	returnedAt?: string;
}

export interface BorrowHistoryResponse {
	borrowHistory: BorrowRecord[];
}
