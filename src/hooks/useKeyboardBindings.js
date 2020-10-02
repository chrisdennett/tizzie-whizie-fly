import React from "react";

export const useKeyboardBindings = (map) => {
  React.useEffect(() => {
    const handlePress = (e) => {
      const handler = map[e.key];

      if (typeof handler === "function") {
        e.preventDefault();
        handler();
      }
    };

    window.addEventListener("keydown", handlePress);

    return () => {
      window.removeEventListener("keydown", handlePress);
    };
  }, [map]);
};
