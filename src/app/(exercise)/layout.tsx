export default function BreathingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-sm mx-auto">{children}</div>;
}
