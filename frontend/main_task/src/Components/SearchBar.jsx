import React from "react";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <i class="material-icons" style={{ color: "#e6e6e6" }}>
        search
      </i>
      <SearchInput
        type="text"
        placeholder="Search for a building..."
      ></SearchInput>
    </SearchBarContainer>
  );
};

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
  color: #d2d2d2;
  background-color: transparent;
`;

const SearchBarContainer = styled.div`
  padding-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  border: 1px solid #e6e6e6;
  width: 50%;
  height: 40px;

  @media (max-width: 759px) {
    width: 98%;
  }
`;

export default SearchBar;
