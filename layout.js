export const metadata = {
  title: "StudyAI",
  description: "Your personal AI study tutor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
