export class SingleChartD3 {

    constructor( {svgSelector, margin = {top: 20, right: 20, bottom: 30, left: 50}  }) {
        this.svg = d3.select(svgSelector);
        this.margin = margin;
        this.width = + parseInt(svg.style("width")) - margin.left - margin.right;
        this.height = + parseInt(svg.style("height")) - margin.top - margin.bottom;

        //Property list
        this._lineArray = [];
    }

    updateAxis({x0, x1, y0, y1}) {
        // axis drawing
        let x = d3.scaleLinear().rangeRound([0, width]).domain([x1,x0]);
        let y = d3.scaleLinear().rangeRound([height, 0]).domain([y1,y0]);

        this.xAxis = d3.axisBottom(x);
        this.yAxis = d3.axisLeft(y);

        focus.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        focus.append('g')
            .attr('class', 'axis axis--y')
            .call(yAxis);

        let focus = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }

    get lineList() {
        return this._lineArray;
    }

    addLine({ pointArray }){
        //points = d3.range(3,39).map( function(i) { return [i/3,100];});
        focus.append("path")
            .datum(points)
            //.attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 3.0)
            .attr("class", "area")
            .attr("d", line);
    }

    addSimpleArea({ pointArray1 }){
        let line = d3.area()
            .x(function(d) { return x(d[0]); })
            .y1(function(d) { return y(d[1]); })
            .y0(height)
            .curve(d3.curveMonotoneX); // apply smoothing to the line
    }

    addBoundArea({pointArray1, pointArray0}) {
        let line = d3.area()
            .x(function(d) { return x(d[0]); })
            .y1(function(d) { return y(d[1]); })
            .y0(height)
            .curve(d3.curveMonotoneX); // apply smoothing to the line
    }

    createAxis() {
        let x = d3.scaleLinear().rangeRound([0, this.width]);
        let y = d3.scaleLinear().rangeRound([this.height, 0]).domain([0,200]);
        let xAxis = d3.axisBottom(x);
        let yAxis = d3.axisLeft(y);
    }

    allowDrag() {
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
}