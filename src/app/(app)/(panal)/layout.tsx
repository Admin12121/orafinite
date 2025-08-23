import Header from "@/components/global/header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Header>{children}</Header>;
}
