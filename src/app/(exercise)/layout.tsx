export default function BreathingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-sm">{children}</div>;
}
