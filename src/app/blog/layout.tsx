export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="py-4 px-2 max-w-[50vw] flex justify-center items-center bg-gray-400">
        {children}
      </div>
    </div>
  );
}
