import { unstable_noStore as noStore } from 'next/cache';

import ButtonDialog from './components/ButtonDialog';
import request from '@/request';
export default async function Home() {
  noStore();
  const userListInfo = await request(
    process.env.NEXT_PUBLIC_BASE_URL + '/getUserList',
  );
  return (
    <>
      <div className="flex flex-row justify-end p-2 pr-4">
        <ButtonDialog title="create user" />
      </div>
      {userListInfo?.body?.map(function (item) {
        return (
          <div key={item.id}>
            id : {item.id} name : {item.username}
          </div>
        );
      })}
    </>
  );
}
