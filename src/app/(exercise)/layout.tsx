export default function BreathingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="max-w-lg">{children}</div>;
}
