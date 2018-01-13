function areaChart() {
	var chart = {},
			data = [],
			selector = "body",
			margin = {top: 30, right: 20, bottom: 30, left: 50},
			legendMargin = {top: margin.top / 2, left: 30},
			color = d3.scaleOrdinal().range(["#D05127", "#F79A00", "#1C789F", "#79388E"]),
			xScale = d3.scaleTime(),
			yScale = d3.scaleLinear(),
			xAxis = d3.axisBottom().scale(xScale).ticks(5, "%b %d"),
			yAxis = d3.axisLeft().scale(yScale).ticks(5);

	// Time parser
	var parseTime = d3.timeParse("%Y%m%d");

	// Stack
	var stack = d3.stack();

	// Area
	var area = d3.area()
			.x(function(d) { return xScale(d.data.date); })
			.y0(function(d) { return yScale(d[0]); })
			.y1(function(d) { return yScale(d[1]); });

	chart.render = function() {
		var width = parseInt(d3.select(selector).style("width")) - margin.left - margin.right;
		var height = parseInt(d3.select(selector).style("height")) - margin.top - margin.bottom;
		var names = Object.keys(data[0]).slice(1);

		// Process data
		var processedData = data.map(function(d) {
			var e = Object.assign({}, d); // Make a copy of the obj, so the next line won't change the original obj
			e.date = parseTime(e.date);
			return e;
		});

		// Update the scales
		xScale
				.domain(d3.extent(processedData, function(d) { return d.date; }))
				.range([0, width]);

		yScale
				.domain([0,
					d3.max(processedData, function(d) {
						return names.reduce(function(sum, name) {
							sum = sum + d[name];
							return sum;
						}, 0);
					})])
				.range([height, 0]);

		color
				.domain(names);

		// Select the svg element if it exists
		var svg = d3.select(selector).select("svg");
		var g;
		// Otherwise, create the skeletal chart
		if (!svg.node()) {
			svg = d3.select(selector).append("svg").attr("class", "outer-chart");
			g = svg.append("g").attr("class", "inner-chart");
			g.append("g").attr("class", "x axis");
			g.append("g").attr("class", "y axis");
			g.append("g").attr("class", "chart-body");
			svg.append("g").attr("class", "legend");
		}
		g = svg.select(".inner-chart");
		// Update the dimensions
		svg.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);

		g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Update the axes
		g.select(".x.axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

		g.select(".y.axis")
				.call(yAxis.tickSize(-width));

		// Axes styling
		g.selectAll(".domain").remove();
		g.selectAll(".x .tick line").remove();

		// Update the legend
		var legend = svg.select(".legend")
				.attr("transform", function(d) { return "translate(" + legendMargin.left + "," + legendMargin.top + ")"; });
		var legendItemWidth = (svg.attr("width") - legendMargin.left * 2) / names.length;

		var legendGroupUpdate = legend.selectAll(".legend-group")
			.data(names);
		var legendGroupEnter = legendGroupUpdate.enter().append("g").attr("class", "legend-group");
		var legendGroupExit = legendGroupUpdate.exit();

		legendGroupExit.remove();

		legendGroupEnter.append("circle")
				.attr("cx", 5)
				.attr("cy", 0)
				.attr("r", 5);

		legendGroupEnter.append("text")
				.attr("x", 15)
				.attr("y", 0)
				.attr("dy", "0.35em");

		var legendGroup = legendGroupEnter
			.merge(legendGroupUpdate)
				.attr("transform", function(d, i) { return "translate(" + legendItemWidth * i + ",0)"; });

		legendGroup.select("circle")
				.style("fill", function(d) { return color(d); });

		legendGroup.select("text")
				.text(function(d) { return d; });

		// Update area
		var layerUpdate = g.select(".chart-body").selectAll(".layer")
			.data(stack.keys(names)(processedData), function(d) { return d.key; });

		layerUpdate.exit().remove();

		var layerEnter = layerUpdate.enter()
			.append("g")
				.attr("class", "layer");

		layerEnter.append("path")
				.attr("class", "area");

		layerEnter
			.merge(layerUpdate)
		.select("path")
			.attr("d", area)
			.style("fill", function(d) { return color(d.key); });
	};

	chart.data = function(_) {
		if (!arguments.length) return data;
		data = _;
		return chart;
	};

	chart.selector = function(_) {
		if (!arguments.length) return selector;
		selector = _;
		return chart;
	};

	chart.margin = function(_) {
		if (!arguments.length) return margin;
		margin = _;
		return chart;
	};

	chart.legendMargin = function(_) {
		if (!arguments.length) return legendMargin;
		legendMargin = _;
		return chart;
	};

	chart.color = function(_) {
		if (!arguments.length) return color.range();
		color = d3.scaleOrdinal(_);
		return chart;
	};

	return chart;
}