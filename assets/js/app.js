// Load data from assets/data/data.csv
d3.csv("./assets/data/data.csv").then(function(data) {

  // Collect state abbreviations and poverty data points
  // and convert to strings to integers.
  var abbr = data.map(d => d.abbr);
  var poverty = data.map(d => +d.poverty);
  var health = data.map(d => +d.healthcare);

  // Load x and y data points


}).catch(function(error) {
  console.log(error);
});
