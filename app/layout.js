export const metadata = {
  title: 'IndiaOS — Decentralized Democracy Management System',
  description: 'Track government performance. Verify public services. Hold representatives accountable. Built by citizens, for citizens.',
  keywords: 'India, democracy, accountability, government, transparency, NEET, civic tech',
  openGraph: {
    title: 'IndiaOS — The System Running India, Visible to All',
    description: 'Not a complaint app. A permanent public record of government performance.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#06080F' }}>
        {children}
      </body>
    </html>
  )
}
