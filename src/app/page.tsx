import { unstable_noStore as noStore } from 'next/cache';
import Nav from './(home)/components/Nav';
import request from '@/request';
export default async function Home() {
  noStore();

  const userListInfo = await request.get<
    {
      username: string;
      id: string;
    }[]
  >('/getUserList');
  return (
    <>
      <Nav></Nav>
      {userListInfo?.map(function (item) {
        return (
          <div key={item.id} className="text-white">
            id : {item.id} name : {item.username}
          </div>
        );
      })}
    </>
  );
}
