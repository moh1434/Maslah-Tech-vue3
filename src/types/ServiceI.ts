import { CategoryI } from './Categroy';
import { userI } from './UserI';
export type serviceI = {
	id: number;
	title: string;
	images: string[];
	description: string;
	duration: number;
	cost: number;
	active: boolean;
	isReciving: boolean;
	createdAt: string;
	updatedAt: string;
	rateSum: number;
	rateNum: number;
	sellerNum: number;
	category: Omit<CategoryI, 'children'>;
	packages: packageI[];
	user: userI;
	userId: string;
};

export type packageI = {
	id: number;
	description: string;
	moreCost: number;
	moreDuration: number;
	active: boolean;
};
