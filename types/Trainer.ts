export type Trainer = {
    id: string;
    name: string;
    rating: number;
    avatarUrl?: string;
  };
  
  export const trainers: Trainer[] = [
    {
      id: 'cma8h108x00007kjwpzferfwe',
      name: 'John de Trainer',
      rating: 5,
      avatarUrl: 'https://ui-avatars.com/api/?name=John+Trainer&background=random&color=fff',
    },
    {
      id: 't2',
      name: 'Lisa Fitcoach',
      rating: 4,
      avatarUrl: 'https://ui-avatars.com/api/?name=Lisa+Fitcoach&background=random&color=fff',
    },
    {
      id: 't3',
      name: 'Max Power',
      rating: 4,
      avatarUrl: 'https://ui-avatars.com/api/?name=Max+Power&background=random&color=fff',
    },
    {
      id: 't4',
      name: 'Anna Strong',
      rating: 5,
      avatarUrl: 'https://ui-avatars.com/api/?name=Anna+Strong&background=random&color=fff',
    },
    {
      id: 't5',
      name: 'Chris Fit',
      rating: 3,
      avatarUrl: 'https://ui-avatars.com/api/?name=Chris+Fit&background=random&color=fff',
    },
  ];
  