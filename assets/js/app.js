// Layout parameters.
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from assets/data/data.csv
d3.csv("./assets/data/data.csv").then(function(data) {

  // Convert to strings to integers.
  data.forEach(d => {
    d.poverty = +d.poverty;
    d.healthcare = +d.healthcare
  });

  // Create x and y scale functions.
  var xLinearScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.poverty))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.healthcare))
    .range([height, 0]);

  // Create axis functions.
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append axes to chart.
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

  // Create circles in chart.
  var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "dodgerblue")
    .attr("opacity", "0.5");

  // Create text state abbreviations in chart.
  var circlesGroup = chartGroup.selectAll()
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("fill", "black")
    .attr("font-size", "10px")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "central")
    .text(d => d.abbr);

  // Initialize tool tip.
  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function (d) {
      return (`${d.state}<br>Poverty: ${d.poverty}%<br>Lacks Healthcare: ${d.healthcare}% `);
    });

  chartGroup.call(toolTip);
  circlesGroup.on("mouseover", function (thedata) {
    toolTip.show(thedata, this);
  }).on("mouseout", function (thedata) {
      toolTip.hide(thedata);
    });

  // Create axes labels.
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2 - margin.right}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + margin.right)
    .attr("x", 0 - (height / 2) - margin.bottom)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

}).catch(function(error) {
  console.log(error);
});
