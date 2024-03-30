import { useState, useEffect } from "react";

import "./styles.scss";

export const Spinner = ({ showText = false }: { showText?: boolean }) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount < 3 ? prevCount + 1 : 0));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const renderDots = () => {
    let dots = "";
    for (let i = 0; i < dotCount; i++) {
      dots += ".";
    }
    return dots;
  };

  return (
    <div className="loader">
      <span className="loader__spinner" />
      {showText ? (
        <div className="loader__textContainer">
          <span className="loader__textContainer__text">
            Loading {renderDots()}
          </span>
        </div>
      ) : null}
    </div>
  );
};
