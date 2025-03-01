import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <HeaderImage src={`/assets/freeRoomsLogo.png`} alt="freeRoomsLogo" />
        <LogoText>Freerooms</LogoText>
      </LogoContainer>
      <ButtonsContainer>
        <HeaderButton>
          <i class="material-icons top-header">search</i>
        </HeaderButton>
        <HeaderButton>
          <i class="material-icons top-header">grid_view</i>
        </HeaderButton>
        <HeaderButton>
          <i class="material-icons top-header">map</i>
        </HeaderButton>
        <HeaderButton>
          <i class="material-icons top-header">dark_mode</i>
        </HeaderButton>
      </ButtonsContainer>
    </HeaderContainer>
  );
};


const HeaderButton = styled.button`
  border: 1px solid #ef7021;
  aspect-ratio: 1/1;
  border-radius: 2px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #ef7021;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoText = styled.p`
  font-family: "Josefin Sans", sans-serif;
  color: #ef7021;
  font-size: 32px;
  margin: 0;
`;

const HeaderImage = styled.img`
  height: 50px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export default Header;
