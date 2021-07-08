import { getColorFromNumber } from "./utils";
import SVG from "svgjs";

const config = {
  id: "graph",
  w: "100%",
  h: "100%",
  limit: 7,
  padding: 2,
  boxSize: 16,
  width: 220,
  min: -100,
  max: 100,
};
export const generateSquare = (id) => ({
  id: `square-${id}`,
  color: getColorFromNumber(
    Math.random() * (config.max - config.min) + config.min
  ),
});
export const clearGraph = (graphRef) => {
  graphRef.innerHTML = "";
};

export const drawGraph = (squares, graphRef) => {
  // Canvas
  const draw = SVG(graphRef).size(config.w, config.h);
  // Global
  const boxSizePadding = config.boxSize + config.padding;
  let offsetX = 0;
  let offsetY = 0;

  // Squares
  const boxOffsetX = offsetX;
  const boxOffsetY = offsetY;
  squares.forEach((square, index) => {
    // Positions
    const i = boxOffsetX + boxSizePadding * Math.floor(index / config.limit);
    const j = boxOffsetY + boxSizePadding * (index % config.limit);

    // Shape
    draw.rect(config.boxSize, config.boxSize).move(i, j).fill(square.color);
  });

  return draw;
};
