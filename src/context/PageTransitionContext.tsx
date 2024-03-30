import { createContext, ReactNode, useContext, useState } from "react";

// Creamos el contexto de la transición de páginas
const PageTransitionContext = createContext<{
  isTransitioning: boolean;
  startTransition: () => void;
}>({
  isTransitioning: false,
  startTransition: () => {},
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

  const startTransition = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 1800);
  };

  return (
    <PageTransitionContext.Provider
      value={{ isTransitioning, startTransition }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};
