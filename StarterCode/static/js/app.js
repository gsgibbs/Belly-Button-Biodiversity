//Build function to read json file using d3
function buildMetaData(sample) {
    d3.json("samples.json").then((data) => {
      var bellydata = data.metadata;
      console.log(bellydata);

    // Filter the data
    var bellyArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var bellyresult = bellyArray[0];
    // Use d3 to select the required panel
    var bellyData = d3.select("#sample-metadata");

    // Clear the existing data in the html
    bellyData.html("");

    // Use `Object.entries` to add each key and value pair to the panelData
    Object.entries(result).forEach(([key, value]) => {
      bellyData.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var sampleData = data.samples;
      var bellyArray = sampleData.filter(sampleObj => sampleObj.id == sample);
      var bellyresult = buildingArray[0];

      var belly_ids = result.otu_ids;
      var belly_labels = result.otu_labels;
      var belly_values = result.sample_values;

      // Build a Bubble Chart
    var bubbleChart = {
        title: "Cultures Per Sample",
        hovermode: "closest",
        xaxis: { title: "BACTERIA ID" },
      };
      var bubbleData = [
        {
          x: belly_ids,
          y: belly_values,
          text: belly_labels,
          mode: "markers",
          marker: {
            size: belly_values,
            color: belly_ids,
            colorscale: "Earth"
          }
        }
      ];

      Plotly.newPlot("bubble", bellyData, bellyChart);

      //Create a horizontal bar chart
      var horiz = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var horizData = [
        {
          y: horiz,
          x: horiz_values.slice(0, 10).reverse(),
          text: horiz_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];

      var chartLayout = {
        title: "Top Ten Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };

      Plotly.newPlot("bar", horizData, chartLayout);
    });
  };

  function init() {
    // Grab a reference to the dropdown select element
    var bellyDropdown = d3.select("#selDataset");
  
    // Populate the select options by using the list of sample names
    d3.json("samples.json").then((data) => {
      var name = data.names;

      name.forEach((sample) => {
        selectDropdown
          .append("option")
          .text(sample)
          .property("value", sample);
      })

      // Use the sample data from the list to build the plots
      var sampleData = name[0];
      buildCharts(sampleData);
      buildMetaData(sampleData);
    });
  };

  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetaData(newSample);
  };


// Initialize the dashboard
  init()
