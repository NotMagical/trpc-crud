// pages/index.tsx
import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import type { AppRouter } from '../../backend/src/server';

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink({
      enabled: opts =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

async function main() {
  await client.getUser.query('id_bilbo');
  // => { id: 'id_bilbo', name: 'Bilbo' };

  await client.createUser.mutate({ name: 'Frodo' });
  // => { id: 'id_frodo', name: 'Frodo' };
}
main();
