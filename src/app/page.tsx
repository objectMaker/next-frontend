import fetchWithUrl from '@/lib/fetchWithUrl';

export default async function Home() {
  const userListInfo = await await fetchWithUrl<{
    body: { Name: string; ID: string }[];
  }>('/getUserList', {
    cache: 'no-store',
  });
  return (
    <>
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
