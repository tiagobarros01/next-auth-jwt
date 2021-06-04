import { v4 as uuid } from 'uuid';

interface signRequestData {
  email: string;
  password: string;
}

const delay = (amount = 750) => new Promise((resolve) => setTimeout(resolve, amount));

export async function signRequest(data: signRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: 'Tiago Barros',
      email: 'tiago@teste.com',
      avatar_url: 'https://github.com/tiagobarros01.png',
    },
  };
}
