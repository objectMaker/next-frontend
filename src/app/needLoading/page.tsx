export default async function CCCC() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });
  return (
    <>
      <div>loading 完成</div>
    </>
  );
}
