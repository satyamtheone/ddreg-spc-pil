export const setTokens = (data: {
  accessToken?: string;
  refreshToken?: string;
  tempToken?: string;
}) => {
  if (data.accessToken) {
    localStorage.setItem("accessToken", data.accessToken);
  }

  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  if (data.tempToken) {
    localStorage.setItem("tempToken", data.tempToken);
  }
};