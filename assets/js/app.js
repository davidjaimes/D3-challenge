// Load data from hours-of-tv-watched.csv
d3.csv("./assets/data/data.csv").then(function(data) {

  // Collect abbreviations and poverty data points.
  var abbr = data.map(d => d.abbr);
  var poverty = data.map(d => d.poverty);

  // Load x and y data points


}).catch(function(error) {
  console.log(error);
});
