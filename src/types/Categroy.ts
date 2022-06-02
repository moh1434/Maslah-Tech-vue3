export interface CategoryI {
	id: number;
	arTitle: string;
	enTitle: string;
	image: string;
	description: string;
	parentId: number | null;
	active?: boolean;
	children: CategoryI[];
}
