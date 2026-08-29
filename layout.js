import "./globals.css";

export const metadata = {
  title: "StudyAI — Your AI Study Companion",
  description: "Personalized study plans, quizzes, explanations and exam preparation."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}