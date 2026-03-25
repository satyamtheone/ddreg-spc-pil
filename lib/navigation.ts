export const goto = (path: string): void => {
  if (typeof window === "undefined") {
    console.error("Navigation can only run on the client side.");
    return;
  }

  window.location.href = path;
};
