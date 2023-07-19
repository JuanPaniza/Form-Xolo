import "./globals.css";
import Head from "next/head";

export const metadata = {
  title: "Xolo | Consent form",
  description: "Generated by create next app",
  charset: "UTF-8"
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Head>
       <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="any"/>
        <meta charSet={metadata.charset} />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </Head>
      <body className="bg-overlay">
        <div className=" relative min-h-screen flex flex-col items-center mt-12">
          {children}
        </div>
      </body>
    </html>
  );
}
