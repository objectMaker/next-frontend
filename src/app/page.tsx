export default async function Home() {
  const res = await fetch('http://127.0.0.1:8080/getUserList', {
    cache: 'no-store',
  });
  const userListInfo = await res.json();
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
