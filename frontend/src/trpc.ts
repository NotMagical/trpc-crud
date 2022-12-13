// pages/index.tsx
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../backend/src/server';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

async function main() {
  const bilbo = await client.getUser.query('id_bilbo');
  console.log(bilbo);
  // => { id: 'id_bilbo', name: 'Bilbo' };

  const frodo = await client.createUser.mutate({ name: 'Frodo' });
  console.log(frodo);
  // => { id: 'id_frodo', name: 'Frodo' };
}
main();
