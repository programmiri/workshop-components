import { JSX } from "react";
import { Header } from "src/app/layout/header/Header.tsx";
import { Footer } from "src/app/layout/Footer/Footer.tsx";

type Props = {
  footerContent?: JSX.Element;
  children?: JSX.Element;
};

function Page({ children }: Props) {
  return (
    <>
      <Header />
      <main className={"flex-grow-1"}>
        <div className="container my-5 text-white ">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export { Page };
