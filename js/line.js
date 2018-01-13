function lineChart() {
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

	// Line path
	var line = d3.line()
			.x(function(d) { return xScale(d.date); })
			.y(function(d) { return yScale(d.value); });

	chart.render = function() {
		var width = parseInt(d3.select(selector).style("width")) - margin.left - margin.right;
		var height = parseInt(d3.select(selector).style("height")) - margin.top - margin.bottom;
		var names = Object.keys(data[0]).slice(1);

		// Process data
		var processedData = names.map(function(name) {
			return {
				name: name,
				values: data.map(function(d) {
					return { date: parseTime(d.date), value: d[name] };
				})
			};
		});

		// Update the scales
		xScale
				.domain(d3.extent(data, function(d) { return parseTime(d.date); }))
				.range([0, width]);

		yScale
				.domain([
					d3.min(processedData, function(d) { return d3.min(d.values, function(e) { return e.value; }); }),
					d3.max(processedData, function(d) { return d3.max(d.values, function(e) { return e.value; }); })
				])
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

		// Update line
		var lineUpdate = g.select(".chart-body").selectAll(".line")
			.data(processedData, function(d) { return d.name; });

		lineUpdate.exit().remove();

		lineUpdate.enter()
			.append("path")
			.attr("class", "line")
			.style("fill", "none")
		.merge(lineUpdate)
			.attr("d", function(d) { return line(d.values); })
			.style("stroke", function(d) { return color(d.name); });

		// Update circle
		var circleGroupUpdate = g.select(".chart-body").selectAll(".circle-group")
			.data(processedData, function(d) { return d.name; });

		circleGroupUpdate.exit().remove();

		var circleGroupEnter = circleGroupUpdate.enter().append("g")
				.attr("class", "circle-group");

		var circleUpdate = circleGroupEnter
			.merge(circleGroupUpdate)
			.selectAll("circle")
			.data(function(d) {
				return d.values.map(function(e) {
					e.name = d.name;
					return e;
				});
			});

		circleUpdate.exit().remove();

		circleUpdate
			.enter().append("circle")
				.attr("r", 4)
			.merge(circleUpdate)
					.attr("cx", function(d) { return xScale(d.date); })
					.attr("cy", function(d) { return yScale(d.value); })
					.style("stroke", function(d) { return color(d.name); });
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