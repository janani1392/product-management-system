import React, { useState, useEffect, useCallback } from "react";
import { PageContainer, Content } from "../../../styles";
import { fetchProducts } from "../productService"; // Updated import to use axiosInstance

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [direction, setDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchData = useCallback(() => {
    setLoading(true);
    const sort = `${sortBy},${direction}`;
    fetchProducts(currentPage, pageSize, sort, searchKeyword)
      .then((responseData) => {
        setProducts(responseData.content || []);
        setTotalProducts(responseData.totalElements || 0);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [currentPage, pageSize, sortBy, direction, searchKeyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setCurrentPage(0);
  }, [sortBy, direction, searchKeyword]);

  return (
    <PageContainer>
      <h1>Product List</h1>
      <Content>
        {/* Search Section */}
        <div>
          <label htmlFor="searchKeyword">Search:</label>
          <input
            type="text"
            id="searchKeyword"
            name="searchKeyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="Search products..."
          />
          <button onClick={fetchData}>Search</button>
        </div>

        {/* Items Per Page Section */}
        <div>
          <label htmlFor="pageSize">Items per page:</label>
          <select
            id="pageSize"
            name="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(0);
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* Page Info */}
        <div>
          <p>
            {totalProducts > 0
              ? `Showing ${currentPage * pageSize + 1} to ${Math.min(
                  (currentPage + 1) * pageSize,
                  totalProducts
                )} of ${totalProducts} products`
              : "No products found."}
          </p>
        </div>

        {/* Sorting Section */}
        <div>
          <label htmlFor="sortBy">Sort By:</label>
          <select
            id="sortBy"
            name="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price">Price</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
          </select>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Product List */}
        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <strong>{product.name}</strong> - ${product.price} (
                {product.category})
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found. Please try a different search or sort criteria.</p>
        )}

        {/* Pagination Buttons */}
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={(currentPage + 1) * pageSize >= totalProducts}
          >
            Next
          </button>
        </div>
      </Content>
    </PageContainer>
  );
};

export default ProductList;
