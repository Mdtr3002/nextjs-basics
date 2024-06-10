export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-[200px] w-[200px] flex justify-center items-center bg-gray-400">
        {children}
      </div>
    </div>
  );
}
