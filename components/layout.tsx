import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: any) {
  return (
    <>
      <div className="TOP">
        <Header />
      </div>
      <main>{children}</main>
      <div className="BOTTOM">
        <Footer />
      </div>
    </>
  );
}
