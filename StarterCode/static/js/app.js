// Drop down function
function dropDownControl(){
  var dropDown = d3.select("#selDataset");
  var selection = dropDown.property("value");
    d3.json("samples.json").then((name)=>{
      var ids = name.names
      console.log('jello')
      console.log(ids)
      d3.select('#selDataset')
        .selectAll('myOptions')
        .data(ids)
        .enter()
        .append("option")
        .text(function(d) {return d})
        .property("value", function (d) {return d})
    userSelector(selection);
    demoSelector(selection);
  });
}
// Bar graph builder
function userSelector(x){
    d3.json("samples.json").then((d)=>{
    //console.log(importedData)
        var samples = d.samples;
        var patRecord = samples.filter(r => r.id === x);
        var sampleNames = patRecord[0].otu_labels;
        var topTenSamples = sampleNames.slice(0,10);
        var values = patRecord[0].sample_values.slice(0,10).reverse();
        var ids = patRecord[0].otu_ids.slice(0,10);
        var labels = ids.map(i => `OTU: ${i}`);
        var data = [{
            type: 'bar',
            x: values,
            y: labels,
            orientation: 'h',
            text: sampleNames
          }];
          Plotly.newPlot('bar', data);
          var trace1 = {
            x: ids,
            y: values,
            mode: 'markers',
            text: labels,
            marker: {
              color: ids, 
              
              size: values
            }
          };
          var data = [trace1];
          var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 1000
          };
          Plotly.newPlot('bubble', data, layout);
    });
}
// Metadata Div 
function demoSelector(a){
  d3.json("samples.json").then((m)=>{
    var metadata = m.metadata
    var user = metadata.filter(id => id.id == a)
    var age = user[0].age;
    var bbtype= user[0].bbtype;
    var ethnicity= user[0].ethnicity;
    var gender= user[0].gender;
    var id= user[0].id;
    var location= user[0].location;
    var wfreq= user[0].wfreq;
    
    d3.select('#sample-metadata').selectAll('div').html("");
    d3.select('#sample-metadata')
      //.append('div')
      .html(`<h5><b>ID: ${id}<br><br>Age: ${age}<br><br>Enthnicity: ${ethnicity}<br><br>Gender: ${gender}<br><br>BB Type: ${bbtype}<br><br>Location: ${location}<br><br>Wfreq: ${wfreq}</h5>`)
  });
}

//Initial Page setup
demoSelector(940);
userSelector('940');

//Call drop down selection
dropDownControl();


