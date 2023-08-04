import React from "react";
import { Chart } from "react-charts";

export default function DataChart(props) {
  const data = props.values;

  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.key,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.value,
      },
    ],
    []
  );
  return (
    <>
      <div
        style={{
          height: "300px",
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            dark: true,
          }}
        />
      </div>
    </>
  );
}
