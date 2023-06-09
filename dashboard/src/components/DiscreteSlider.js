import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { completeColor, completeColor2 } from "./colors";

function scoreValue(value) {
  return value;
}

export default function DiscreteSlider() {
  return (
    <Box sx={{ width: 500 }}>
      <div className="d-flex align-items-center justify-content-between">
        {[
          "Not Demonstrating",
          "Limited",
          "Developing",
          "Applying",
          "Innovating",
        ].map((item) => (
          <span style={{ fontWeight: "300", fontSize: "0.6rem" }}>{item}</span>
        ))}
      </div>
      <Slider
        aria-label="Score"
        defaultValue={0}
        getAriaValueText={scoreValue}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={4}
        // color={completeColor2}
        color="primary"
      />
      {/* <Slider defaultValue={30} step={10} marks min={10} max={110} disabled /> */}
    </Box>
  );
}
