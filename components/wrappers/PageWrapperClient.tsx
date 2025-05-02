import { MainContextProvider } from "@/context/MainContext";
import PageWrapper from "./PageWrapper";

export const PageWrapperClient = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <MainContextProvider>
        <PageWrapper children={children} />
      </MainContextProvider>
    );
  };