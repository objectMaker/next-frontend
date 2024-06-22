'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function CreateUser() {
  const [inputValue, setInputValue] = useState('');
  async function handleCreateUser() {
    if (!inputValue) {
      alert('Please enter a username');
      return;
    }
    const fetchRes = await fetch('http://localhost:8080/createUser', {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        Name: inputValue,
      }),
    });
    const res = await fetchRes.json();
    console.log('🚀 ~ handleCreateUser ~ res:', res);
  }
  return (
    <>
      to create user
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></Input>
      <Button onClick={handleCreateUser}>confirm</Button>
    </>
  );
}
