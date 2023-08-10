import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableSelect from "../Components/TableSelect";
import TableNavig from "../Components/TableNavig";
import SearchBar from "../Components/SearchBar";

export default function BattlesTable(props) {
  const [offset, setOffset] = useState(0);
  const [slice, setSlice] = useState(10);
  const [filteredBattles, setFilteredBattles] = useState(props.battles);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleOffset = (s) => {
    setOffset(s);
  };
  const handleSlice = (s) => {
    setOffset(0);
    setSlice(s);
  };

  const navigateToBB = (battleData) => {
    navigate("/battleboard", {
      state: {
        id: battleData[0],
        date: battleData[1].StartTime.toDate()
          .toJSON()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("."),
        season: props.season,
      },
    });
  };

  const updateKeyword = (keyword) => {
    const filtered = props.battles.filter((battle) => {
      return (
        `${battle[1].Title.toLowerCase()}`.includes(keyword.toLowerCase()) ||
        `${battle[1].StartTime.toDate()
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replaceAll("/", ".")}`.includes(keyword.toLowerCase())
      );
    });
    setKeyword(keyword);
    setFilteredBattles(filtered);
  };

  return (
    <>
      <SearchBar keyword={keyword} onChange={updateKeyword} />
      <div className="table-style" style={{ alignItems: "stretch" }}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredBattles
              .slice(offset * slice, (offset + 1) * slice)
              .map((battle, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "left" }}>
                    <a
                      href=""
                      onClick={() => {
                        navigateToBB(battle);
                      }}
                    >
                      {battle[1].Title}
                    </a>
                  </td>
                  <td style={{ textAlign: "center", wordBreak: "keep-all" }}>
                    {battle[1].StartTime.toDate()
                      .toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replaceAll("/", ".")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="table-navig">
          <TableSelect onSelectChange={handleSlice} selectedAmount={slice} />
          <TableNavig
            onTableChange={handleOffset}
            offsetValue={offset}
            sliceValue={slice}
            battles={props.battles.length}
          />
        </div>
      </div>
    </>
  );
}
