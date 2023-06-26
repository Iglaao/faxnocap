import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import { projectId, apiKey } from "../firebase";

export default function PlayersPage() {
  async function fetchPlayers() {
    await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }

  useEffect(() => {
    fetchPlayers();
  }, []);
  return (
    <>
      <NavBar />
      <input type="text"></input>
    </>
  );
}
