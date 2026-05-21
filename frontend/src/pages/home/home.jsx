import { useState, useEffect } from "react";
import "./home.css";
import MiniArtCard from "../../components/miniArtCard/miniArtCard";
import axios from "axios";
import { instance } from "../../client/instance";
import NewArrivals from "../../components/newArrivals/newArrivals";

export default function Home() {
  return (
    <main className="home">
      <NewArrivals />
    </main>
  );
}
