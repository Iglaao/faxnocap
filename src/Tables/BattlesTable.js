import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableSelect from "../Components/TableSelect";
import TableNavig from "../Components/TableNavig";

export default function BattlesTable(props) {
  const [offset, setOffset] = useState(0);
  const [slice, setSlice] = useState(10);
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
  return (
    <>
      <div className="table-style" style={{ alignItems: "stretch" }}>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {props.battles
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
                  <td style={{ textAlign: "center", wordWrap: "normal" }}>
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
