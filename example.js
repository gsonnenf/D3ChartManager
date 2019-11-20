//import {SingleChartD3} from "chartd3"

var chart1 = new SingleChartD3({ svgSelector: "#svg1"});

chart1.createAxis({xMin:0, xMax:200, yMin:0, yMax:200});
chart1.updateAxis({x0:0,x1:100,y0:0,y1:100});
chart1.createLabels({xAxisLabel:"My X Axis",yAxisLabel: "My Y Axis"});


let line = chart1.createExampleLine();
chart1.addLine({ pointArray: line });


//this.allowDrag();