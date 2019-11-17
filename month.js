let drag = d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);

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


//x.domain(d3.extent(points, function(d) { return d[0]; }));
//y.domain(d3.extent(points, function(d) { return d[1]; }));

/*
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
*/



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
