export type messageI = {
  id: number;
  createdAt: Date;
  active: boolean;
  msg: string;
};

export type insertedMessageI = {
  msg: string;
  order: {
    id: number;
  };
  sender: {
    id: string;
  };
  id: number;
  createdAt: Date;
  active: boolean;
};
