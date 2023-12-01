import MainLayout from "@/layout/MainLayout";
import "@/styles/globals.css";
import "@/styles/fonts.css";

export default function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
