import styled from "styled-components";

// General App Styles (already present)
export const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

export const NavBar = styled.nav`
  margin-bottom: 20px;
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 20px;

    li a {
      text-decoration: none;
      color: #007bff;
      font-weight: bold;

      &:hover {
        color: #0056b3;
      }
    }
  }
`;

// New Styles for Pages
export const PageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
  text-align: left;

  h2 {
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  p {
    color: #555;
    font-size: 1rem;
    line-height: 1.6;
  }
`;
