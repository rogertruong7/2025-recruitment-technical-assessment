import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styled from "styled-components";
import "./App.css";
import Building from "./Components/Building";
import Header from "./Components/Header";
import OrangeButton from "./Components/OrangeButton";
import SearchBar from "./Components/SearchBar";

function App() {
  const [count, setCount] = useState(0);

  const buildings = [
    { imageSrc: "agsm.webp", name: "AGSM", capacity: 9 },
    { imageSrc: "ainsworth.webp", name: "Ainsworth Building", capacity: 16 },
    { imageSrc: "anitab.webp", name: "Anita B Lawrence Centre", capacity: 44 },
    {
      imageSrc: "biologicalScience.webp",
      name: "Biological Sciences",
      capacity: 6,
    },
    {
      imageSrc: "biologicalScienceWest.webp",
      name: "Biological Sciences (West)",
      capacity: 8,
    },
    { imageSrc: "blockhouse.webp", name: "Blockhouse", capacity: 42 },
    { imageSrc: "businessSchool.webp", name: "Business School", capacity: 18 },
    {
      imageSrc: "civilBuilding.webp",
      name: "Civil Engineering Building",
      capacity: 8,
    },
    { imageSrc: "colombo.webp", name: "Colombo Building", capacity: 5 },
    {
      imageSrc: "cseBuilding.webp",
      name: "Computer Science & Engineering (K17)",
      capacity: 7,
    },
  ];

  return (
    <>
      <FreeRoomPage>
        <Header></Header>
        <hr style={{ border: "1px solid lightgrey" }} />
        <FilterSection>
          <OrangeButton text="Filter"></OrangeButton>
          <SearchBar></SearchBar>
          <OrangeButton text="Sort"></OrangeButton>
        </FilterSection>
        <section>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <BuildingSection>
            {buildings.map((building, index) => (
              <Building building={building} key={index}></Building>
            ))}
          </BuildingSection>
        </section>
      </FreeRoomPage>
    </>
  );
}

const FilterSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`

const FreeRoomPage = styled.div`
  margin-left: 20px;
  margin-right: 20px;

`

const BuildingSection = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`

export default App;
