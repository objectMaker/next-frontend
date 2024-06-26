import { unstable_noStore as noStore } from 'next/cache';
import Nav from './(home)/components/Nav';
import request from '@/request';
export default async function Home() {
  noStore();
  const userListInfo = await request<{
    body: { id: string; username: string }[];
  }>(process.env.NEXT_PUBLIC_BASE_URL + '/getUserList');
  return (
    <>
      <Nav></Nav>
      {userListInfo?.body?.map(function (item) {
        return (
          <div key={item.id} className="text-white">
            id : {item.id} name : {item.username}
          </div>
        );
      })}
    </>
  );
}
