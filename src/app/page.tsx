import { unstable_noStore as noStore } from 'next/cache';
import Nav from './(home)/components/Nav';
import fetchWithUrl from '@/lib/fetchWithUrl';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function Home() {
  noStore();
  const tokenString = cookies().get('token')?.value;
  const res = await fetchWithUrl<{
    code?: number;
    data?: {
      username: string;
      id: string;
    }[];
    message?: string;
  }>('/getUserList', {
    headers: {
      token: tokenString || '',
    },
  });
  if (res.code != 200) {
    redirect('/signIn?redirect="/"');
  }
  return (
    <>
      <Nav></Nav>
      {res.data?.map(function (item) {
        return (
          <div key={item.id} className="text-white">
            id : {item.id} name : {item.username}
          </div>
        );
      })}
    </>
  );
}
