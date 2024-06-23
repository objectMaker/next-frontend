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
