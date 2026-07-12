import "flag-icons/css/flag-icons.min.css";
import "./globals.css";

export const metadata = {
  title: {
    default: "Global SOF Index",
    template: "%s | Global SOF Index",
  },
  description:
    "ฐานข้อมูลเชิงภาพสำหรับสำรวจหน่วยปฏิบัติการพิเศษทั่วโลก พร้อม Tier, ภารกิจ และรายละเอียดจากข้อมูลสาธารณะ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
