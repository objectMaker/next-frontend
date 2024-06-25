import { unstable_noStore as noStore } from 'next/cache';

import fetchWithUrl from '@/lib/fetchWithUrl';
import ButtonDialog from './components/ButtonDialog';

export default async function Home() {
  noStore();
  const userListInfo = await await fetchWithUrl<{
    body: { username: string; id: string }[];
  }>('/getUserList');
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
