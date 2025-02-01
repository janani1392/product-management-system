import axiosInstance from "../../services/axios"; // Import your configured Axios instance


export const fetchProducts = async (page, size, sort, keyword) => {
  try {
      const response = await axiosInstance.get(`/products`, {
      params: {
        page,
        size,
        sort,
        keyword,
      },
      withCredentials: true, // Explicitly include credentials (optional, axiosInstance already does this)
    });

    if (!response.data || !response.data.content || !response.data.totalElements) {
      return {
        content: [],
        totalElements: 0,
      };
    }

    return response.data; // Return the valid response data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch products."
    );
  }
};