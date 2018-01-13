function barChart() {
	var chart = {},
			data = [],
			selector = "body",
			margin = {top: 20, right: 20, bottom: 30, left: 50},
			color = "#D05127",
			xScale = d3.scaleBand().padding(0.2),
			yScale = d3.scaleLinear(),
			xAxis = d3.axisBottom().scale(xScale),
			yAxis = d3.axisLeft().scale(yScale).ticks(5, "s");

	chart.render = function() {
		var width = parseInt(d3.select(selector).style("width")) - margin.left - margin.right;
		var height = parseInt(d3.select(selector).style("height")) - margin.top - margin.bottom;

		// Update the scales
		var names = data.map(function(d) { return d.name; });
		xScale
				.domain(names)
				.range([0, width]);

		yScale
				.domain([0, d3.max(data, function(d) { return d.value; })])
				.range([height, 0]);

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

		// Update bar
		var barUpdate = g.select(".chart-body").selectAll(".bar")
			.data(data, function(d) { return d.name; });
		var barEnter = barUpdate.enter();
		var barExit = barUpdate.exit();

		barExit.remove();

		barEnter.append("rect")
				.attr("class", "bar")
			.merge(barUpdate)
				.attr("x", function(d) { return xScale(d.name); })
				.attr("y", function(d) { return yScale(d.value); })
				.attr("width", xScale.bandwidth())
				.attr("height", function(d) { return height - yScale(d.value); })
				.style("fill", color);
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

	chart.color = function(_) {
		if (!arguments.length) return color;
		color = _;
		return chart;
	};

	return chart;
}