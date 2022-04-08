import ReactDOM from "react-dom";
import styled from "styled-components";

import Button from "./Button";

const SizeChart = () => {
    return ReactDOM.createPortal(
        <Container className={`component-sizeChart`}>
            <Content>
                <h4>Size Chart</h4>
            </Content>
        </Container>,
        document.getElementById("root"),
    );
};

export default SizeChart;

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Content = styled.section``;
