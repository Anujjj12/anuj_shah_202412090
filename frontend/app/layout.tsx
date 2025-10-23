import './globals.css'
export const metadata = { title: 'Exam' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main style={{padding:20}}>{children}</main>
      </body>
    </html>
  )
}
