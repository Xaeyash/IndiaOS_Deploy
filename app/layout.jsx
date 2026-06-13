export const metadata = {
  title: "IndiaOS — Decentralized Democracy Management System",
  description: "Not a complaint app. A permanent public record. Track how your government is performing.",
  openGraph: {
    title: "IndiaOS",
    description: "India's civic accountability layer. Real issues. Real data. Verified by citizens.",
    url: "https://indiaos.vercel.app",
    siteName: "IndiaOS",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IndiaOS — Decentralized Democracy",
    description: "Track how India's government is performing. Real data. Verified by citizens.",
  },
  themeColor: "#FF7020",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "#06080F", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
