import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

// Creamos el contexto de la transición de páginas
const PageTransitionContext = createContext<{
  isTransitioning: boolean;
  setIsTransitioning: Dispatch<SetStateAction<boolean>>;
}>({
  isTransitioning: false,
  setIsTransitioning: () => {},
});

export const usePageTransitionContext = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      "PageTransitionContext must be used inside PageTransitionProvider"
    );
  }
  return context;
};

export const PageTransitionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);


  return (
    <PageTransitionContext.Provider
      value={{ isTransitioning, setIsTransitioning }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};
