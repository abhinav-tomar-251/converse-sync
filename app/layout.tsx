import './globals.css'
import AuthContext from './context/AuthContext'
import ToasterContext from './context/ToasterContext'
import ActiveStatus from './components/ActiveStatus'


export const metadata = {
  title: 'ConverseSync',
  description: 'A Realtime Chat Application to connect with your friends and family.',
  icons: [ '@app/favicon.ico' ],
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}