import Nav from './components/Nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav></Nav>
      {children}
    </>
  );
}
