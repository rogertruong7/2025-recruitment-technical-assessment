import React from "react";
import styled from "styled-components";

const Building = ({ building }) => {
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
      <BuildingImage src={`/assets/${building.imageSrc}`} alt={building.name} />
      <BuildingButton className="building_name">{building.name}</BuildingButton>
      <RoomsAvailable>
        <GreenCircle size={15} />
        <b style={{ margin: 0 }}>{building.capacity} rooms available</b>
      </RoomsAvailable>
    </BuildingContainer>
  );
};

const BuildingContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  font-family: "Open Sans", sans-serif;
`;

const BuildingImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1.1;
  border-radius: 10px;
  object-fit: cover;
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
`;

export default Building;
