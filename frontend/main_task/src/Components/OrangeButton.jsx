import React from "react";
import styled from "styled-components";

const OrangeButton = ({ text }) => {
  return (
    <Button>
      {text === "Filter" ? (
        <>
          <i class="material-icons">filter_alt</i>
          <ButtonText>Filter</ButtonText>
        </>
      ) : (
        text === "Sort" && (
          <>
            <i class="material-icons">filter_list</i>
            <ButtonText>Sort</ButtonText>
          </>
        )
      )}
    </Button>
  );
};

const Button = styled.button`
  border: 2px solid #ef7021;
  font-family: "Open Sans", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 5px 20px;
  background-color: white;
  border-radius: 10px;
`;
const ButtonText = styled.b`
  color: #ef7021;
  font-size: 14px;
`;

export default OrangeButton;
