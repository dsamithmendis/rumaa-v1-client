import "@/styles/globals.css";

export const metadata = {
  title: {
    default: "Welcome | Rumaa",
    template: "%s | Rumaa",
  },
  description: "Sri Lankan E-commerce Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
