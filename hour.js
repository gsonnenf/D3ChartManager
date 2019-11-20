


let svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = + parseInt(svg.style("width")) - margin.left - margin.right,
    height = + parseInt(svg.style("height")) - margin.top - margin.bottom;

points = d3.range(3,39).map( function(i) { return [i,i];});

// axis drawing
let x = d3.scaleLinear().rangeRound([0, width]);
let y = d3.scaleLinear().rangeRound([height, 0]).domain([0,200]);

let xAxis = d3.axisBottom(x),
    yAxis = d3.axisLeft(y);

let line = d3.area()
    .x(function(d) { return x(d[0]); })
    .y1(function(d) { return y(d[1]); })
    .y0(height)
    .curve(d3.curveMonotoneX); // apply smoothing to the line

/*
//Adjusts cursor
svg.append('rect')
    .attr('class', 'zoom')
    .attr('cursor', 'move')
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
*/
let focus = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(d3.extent(points, function(d) { return d[0]; }));
//y.domain(d3.extent(points, function(d) { return d[1]; }));


focus.append("path")
    .datum(points)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);


focus.append("path")
    .datum(points)
    //.attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 3.0)
    .attr("class", "area")
    .attr("d", line);


focus.selectAll('circle')
    .data(points)
    .enter()
    .append('circle')
    .attr('r', 3.0)
    .attr('cx', function(d) { return x(d[0]);  })
    .attr('cy', function(d) { return y(d[1]); })
    .style('cursor', 'pointer')
    .style('fill', 'steelblue');



focus.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

focus.append('g')
    .attr('class', 'axis axis--y')
    .call(yAxis);




let drag = d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);


focus.selectAll('circle').call(drag);


//Drag functions
function dragstarted(d) {
    d3.select(this).raise().classed('active', true);
}

function dragged(d) {
    //d[0] = x.invert(d3.event.x);
    d[1] = y.invert(d3.event.y);
    d3.select(this)
        //.attr('cx', x(d[0]))
        .attr('cy', y(d[1]))
    focus.select('path').attr('d', line);
}

function dragended(d) {
    d3.select(this).classed('active', false);
}


// text label for the x axis
svg.append("text")
    .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 30) + ")")
    .style("text-anchor", "middle")
    .text("Month");

//Text label for y axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 50)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Energy (% - AVG)");


