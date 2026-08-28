import { Nav } from "@/components/Nav";

export default function ConsolaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col md:flex-row">
      <Nav />
      <main className="min-w-0 flex-1 px-5 py-6 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
