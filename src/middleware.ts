import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = (
    request.headers as typeof request.headers & {
      [k: string]: string;
    }
  )['x-token'];
  console.log('middddddddddddddddddddddddddddd');

  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    console.log('redirecctttt++++++++++++++');

    return Response.redirect(new URL('/login', request.url));
  }
}
export const config = {
  matcher: '/',
};
