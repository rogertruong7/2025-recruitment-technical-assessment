import React from "react";
import styled from "styled-components";

const Building = ({ building, isMobile }) => {
  const GreenCircle = ({ size = 100, radius = 40 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r={radius} fill="#4CAE55" />
    </svg>
  );

  return (
    <BuildingContainer>
      <BuildingImage src={`/assets/${building.building_picture}`} alt={building.name} />
      <BuildingButton className="building_name">{building.name}</BuildingButton>
      <RoomsAvailable>
        <GreenCircle size={15} />
        {!isMobile ? (
          <b style={{ margin: 0 }}>{building.rooms_available} rooms available</b>
        ) : (
          <b>
            {building.rooms_available} / {building.rooms_available}
          </b>
        )}
      </RoomsAvailable>
    </BuildingContainer>
  );
};

const BuildingContainer = styled.div`
  position: relative;
  flex: 1 1 0;
  min-width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  @media (min-width: 2240px) {
    max-width: 350px;
  }

  @media (max-width: 1886px) {
    max-width: 24%;
  }
  @media (max-width: 1499px) {
    max-width: 32%;
  }
  @media (max-width: 1129px) {
    max-width: 49%;
  }
  @media (max-width: 759px) {
    max-width: 99%;
  }
`;

const BuildingImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1.1;
  border-radius: 10px;
  object-fit: cover;

  @media (max-width: 1129px) {
    aspect-ratio: 1/0.5;
  }
  @media (max-width: 759px) {
    aspect-ratio: 1/0.2;
  }
`;

const BuildingButton = styled.button`
  position: absolute;
  z-index: 1;
  width: 95%;
  background-color: #ef7021;
  color: white;
  border-radius: 10px;
  bottom: 2.5%;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 15px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  border: none;

  @media (max-width: 759px) {
    display: none;
  }
`;

const RoomsAvailable = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1;
  right: 0;
  background-color: white;
  color: black;
  gap: 10px;
  padding: 10px;
  border-radius: 15px;
  margin: 0;
  top: 5px;
  right: 5px;
  font-size: 14px;

  @media (max-width: 759px) {
    top: 50%;
    transform: translateY(-50%);
		right: 20px;
  }
`;

export default Building;
