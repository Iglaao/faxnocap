import React from "react";
import { Chart } from "react-charts";

export default function DataChart(props) {
  const data = React.useMemo(
    () => [
      {
        data: props.values,
      },
    ],
    []
  );
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
    console.log(props),
    (
      <>
        <div style={{ width: "400px", height: "300px" }}>
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
            }}
          />
        </div>
      </>
    )
  );
}
