import styled from "styled-components";
import "./App.css";
import Building from "./Components/Building";
import Header from "./Components/Header";
import OrangeButton from "./Components/OrangeButton";
import SearchBar from "./Components/SearchBar";
import { useEffect, useState } from "react";
import data from './assets/data.json';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 759px)");

    setIsMobile(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <>
      <FreeRoomPage>
        <Header></Header>
        <hr style={{ border: "1px solid lightgrey" }} />
        {isMobile && <SearchBar></SearchBar>}
        <FilterSection>
          <OrangeButton text="Filter"></OrangeButton>
          {!isMobile && (<SearchBar></SearchBar>
          )}
          <OrangeButton text="Sort"></OrangeButton>
        </FilterSection>
        <section>
          <BuildingSection>
            {data.map((building, index) => (
              <Building
                building={building}
                isMobile={isMobile}
                key={index}
              ></Building>
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
`;

const FreeRoomPage = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
`;

const BuildingSection = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
  gap: 20px;
`;

export default App;
