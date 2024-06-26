import SignUpForm from './components/form';

export default function signUp() {
  return (
    <div className="border-neutral-200-50 absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4 shadow-xl">
      <SignUpForm></SignUpForm>
    </div>
  );
}
