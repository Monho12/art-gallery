import { useState, useEffect } from "react";
import "./home.css";
import { instance } from "../../client/instance";
import NewArrivals from "../../components/newArrivals/newArrivals";
import LandingSection from "../../components/landingSection/landingSection";

export default function Home() {
  const [art, setArt] = useState(null);

  useEffect(() => {
    instance
      .get("/arts")
      .then((res) => {
        setArt(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return art ? (
    <main className="home">
      <LandingSection art={art} />
      <NewArrivals />
    </main>
  ) : (
    <main className="home">
      <h1>Loading...</h1>
    </main>
  );
}
