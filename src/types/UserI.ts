import { serviceI } from './ServiceI';
import { portfolioI } from './PortfolioI';
export type userI = Record<
	| 'id'
	| 'picture'
	| 'name'
	| 'email'
	| 'bio'
	| 'city'
	| 'phone'
	| 'complete'
	| 'proficiency'
	| 'active'
	| 'createdAt'
	| 'updatedAt'
	| 'lastSeen'
	| 'rate'
	| 'completedProject'
	| 'completedService',
	string
> & { skills: { name: string }[] } & { services: serviceI[] } & {
	portfiloItems: portfolioI[];
};
