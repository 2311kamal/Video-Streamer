export const apiCall = async (apiFunction, ...args) => {
  try {
    const response = await apiFunction(...args);
    return { response: response, error: null };
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    return {
      data: null,
      error: error.response?.data?.message || error.message,
    };
  }
};
