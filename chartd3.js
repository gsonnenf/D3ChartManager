/**
 *
 */
class SingleChartD3 {

    /**
     *
     * @param svgSelector
     * @param margin
     */
    constructor({ svgSelector, margin = { top: 20, right: 20, bottom: 30, left: 50 } }) {
        this.svg = d3.select(svgSelector);
        this.margin = margin;
        this.width = + parseInt(this.svg.style("width")) - margin.left - margin.right;
        this.height = + parseInt(this.svg.style("height")) - margin.top - margin.bottom;

        //Property list
        this._lineArray = [];
    }

    /**
     * Creates an example line for use in testing.
     * @returns Array
     */
    createExampleLine() {
        return d3.range(0, 100).map(function (i) { return [i , i]; });
    }

    /**
     *
     * @param domain
     */
    createAxis({ xMin = 0, xMax, yMin = 0, yMax }) {
        this.xScale = d3.scaleLinear().rangeRound([0, this.width]).domain([xMin, xMax]);
        this.yScale = d3.scaleLinear().rangeRound([this.height, 0]).domain([yMin, yMax]);
        this.xAxis = d3.axisBottom(this.xScale);
        this.yAxis = d3.axisLeft(this.yScale);
    }



    /**
     *
     * @param x0
     * @param x1
     * @param y0
     * @param y1
     */
    updateAxis({ x0, x1, y0, y1 }) {

        // axis drawing
        this.xAxis = d3.axisBottom(this.xScale);
        this.yAxis = d3.axisLeft(this.yScale);

        this.focus = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");


        this.focus.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(this.xAxis);

        this.focus.append('g')
            .attr('class', 'axis axis--y')
            .call(this.yAxis);
    }


    /**
     *
     * @returns {[]|*[]}
     */
    get lineList() {
        return this._lineArray;
    }
    
    /**
     *
     * @param pointArray
     */
    addLine({ pointArray }) {

        this.xScale.domain( d3.extent( pointArray, (d) => d[0] ) );

        let line = d3.line()
            .x((d) => this.xScale(d[0]))
            .y((d) => this.yScale(d[1]))
            //.y0(this.height)
            .curve(d3.curveMonotoneX); // apply smoothing to the line

        this.focus.append("path")
            .datum(pointArray)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 3)
            .attr("d", line);
    }

    /**
     *
     * @param pointArray1
     */
    addSimpleArea({ pointArray1 }) {
        let line = d3.area()
            .x(function (d) { return x(d[0]); })
            .y1(function (d) { return y(d[1]); })
            .y0(height)
            .curve(d3.curveMonotoneX); // apply smoothing to the line
    }


    /**
     *
     * @param pointArray1
     * @param pointArray0
     */
    addBoundArea({ pointArray1, pointArray0 }) {
        let line = d3.area()
            .x(function (d) { return x(d[0]); })
            .y1(function (d) { return y(d[1]); })
            .y0(height)
            .curve(d3.curveMonotoneX); // apply smoothing to the line
    }

    /**
     *
     * @param pointArray
     */
    addDataPoints({ pointArray }) {
        this.focus.selectAll('circle')
            .data(pointArray)
            .enter()
            .append('circle')
            .attr('r', 3.0)
            .attr('cx', function (d) { return x(d[0]); })
            .attr('cy', function (d) { return y(d[1]); })
            .style('cursor', 'pointer')
            .style('fill', 'steelblue');
    }


    /**
     *
     * @param xAxisLabel
     * @param yAxisLabel
     */
    createLabels({xAxisLabel, yAxisLabel}){

// text label for the x axis
        this.svg.append("text")
            .attr("transform", "translate(" + (this.width/2) + " ," + (this.height + this.margin.top + 30) + ")")
            .style("text-anchor", "middle")
            .text(xAxisLabel);

//Text label for y axis
        this.svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.margin.left + 50)
            .attr("x",0 - (this.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(yAxisLabel);
    }


    /**
     *
     */
    allowDrag() {
        this.focus.selectAll('circle').call(drag);
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

    }


    //Private functions



}