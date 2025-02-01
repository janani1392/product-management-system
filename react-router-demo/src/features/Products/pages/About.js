import React from "react";
import { PageContainer, Content } from "../../../styles";

function About() {
  return (
    <PageContainer>
      <Content>
        <h2>About This App</h2>
        <p>
          This app demonstrates how to use React Router for navigation. You can navigate
          between pages without refreshing the browser!
        </p>
        <p>It’s built using React and styled-components for styling.</p>
      </Content>
    </PageContainer>
  );
}

export default About;
