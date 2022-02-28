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
> & { skills: userSkill[] };

type userSkill = {
  userId: string;
  skillName: string;
};
