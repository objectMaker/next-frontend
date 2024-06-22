import fetchWithUrl from '@/lib/fetchWithUrl';
import ButtonDialog from './components/ButtonDialog';
export default async function Home() {
  const userListInfo = await await fetchWithUrl<{
    body: { Name: string; ID: string }[];
  }>('/getUserList', {
    cache: 'no-store',
  });
  return (
    <>
      <div className="flex flex-row justify-end p-2 pr-4">
        <ButtonDialog title="create user" />
      </div>
      {userListInfo?.body?.map(function (item: { Name: string; ID: string }) {
        return (
          <div key={item.ID}>
            id : {item.ID} name : {item.Name}
          </div>
        );
      })}
    </>
  );
}
