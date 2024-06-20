'use client';

import { useState } from 'react';
import { Button } from '@mui/material';

export default function Gnm() {
  const [a, setA] = useState('');
  async function getUserInfo() {
    console.log(a, 'aaaaaaaaaaaa');
    const res = await fetch('http://localhost:8080/ping');
    const data = await res.json();
    setA(data);
  }
  function handleGetUserInfo() {
    getUserInfo();
  }
  return (
    <>
      <>gnm</>
      <Button onClick={handleGetUserInfo}>get new User info</Button>
      <div>{JSON.stringify(a)}</div>
    </>
  );
}
