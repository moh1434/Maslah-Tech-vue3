import { packageI } from './ServiceI';

export type OrderI = {
	id: number;
	duration: number;
	cost: number;
	active: string;
	createdAt: Date;
	updateddAt: Date;
	title: string;
	statuses: string;
	type: null | string;
	freelancerId: string;
	consumerId: string;
};

export type getOrdersServiceForFreelancerI = {
	createdAt: Date;
	order: OrderI;
	packages: packageI[];
	serviceId: number;
};
