type FetchParameter = Parameters<typeof fetch>;
export default async function fetchWithUrl<T extends object>(
  requestPath: string,
  initParams?: FetchParameter[1],
): Promise<T> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + requestPath,
    initParams,
  );
  if (res.ok) {
    return await res.json();
  } else {
    return Promise.reject(res.json());
  }
}
