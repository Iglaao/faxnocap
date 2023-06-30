import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

export default function PlayersPage() {
  return (
    <>
      <NavBar />
      <input type="text"></input>
    </>
  );
}
