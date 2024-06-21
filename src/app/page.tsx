export default async function Home() {
  const res = await fetch('http://localhost:8080/getUserList');
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
