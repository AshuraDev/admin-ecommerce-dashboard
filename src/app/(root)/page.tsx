import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-4">
      <p>Ceci est une route protéger</p>
      <UserButton />
    </div>
  );
}
