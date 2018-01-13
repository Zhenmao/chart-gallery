function horizontalBarChart() {
	var chart = {},
			data = [],
			selector = "body",
			margin = {top: 30, right: 20, bottom: 30, left: 50},
			legendMargin = {top: margin.top / 2, left: 30},
			color = d3.scaleOrdinal().range(["#D05127", "#F79A00", "#1C789F", "#79388E"]),
			xScale = d3.scaleLinear(),
			yScale0 = d3.scaleBand().padding(0.2),
			yScale1 = d3.scaleBand().padding(0.1),
			xAxis = d3.axisBottom().scale(xScale).ticks(5, "s"),
			yAxis = d3.axisLeft().scale(yScale0);

	chart.render = function() {
		var width = parseInt(d3.select(selector).style("width")) - margin.left - margin.right;
		var height = parseInt(d3.select(selector).style("height")) - margin.top - margin.bottom;
		var names = data.map(function(d) { return d.name; });
		var keys = Object.keys(data[0]).slice(1);

		// Update the scales
		xScale
				.domain([0, d3.max(data, function(d) {
					return d3.max(keys, function(key) {
						return d[key];
					});
				})])
				.range([0, width]);

		yScale0
				.domain(names)
				.range([0, height]);

		yScale1
				.domain(keys)
				.range([0, yScale0.bandwidth()]);

		color
				.domain(keys);

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
				.call(xAxis.tickSize(-height));

		g.select(".y.axis")
				.call(yAxis);

		// Axes styling
		g.selectAll(".domain").remove();
		g.selectAll(".y .tick line").remove();

		// Update the legend
		var legend = svg.select(".legend")
				.attr("transform", function(d) { return "translate(" + legendMargin.left + "," + legendMargin.top + ")"; });
		var legendItemWidth = (svg.attr("width") - legendMargin.left * 2) / keys.length;

		var legendGroupUpdate = legend.selectAll(".legend-group")
			.data(keys);
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

		// Update bar
		var barGroupUpdate = g.select(".chart-body").selectAll(".bar-group")
			.data(data);
		var barGroupEnter = barGroupUpdate.enter();
		var barGroupExit = barGroupUpdate.exit();

		barGroupExit.remove();

		var barUpdate = barGroupEnter.append("g")
				.attr("class", "bar-group")
			.merge(barGroupUpdate)
				.attr("transform", function(d) { return "translate(0, " + yScale0(d.name) + ")"; })
			.selectAll(".bar")
			.data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); });
		var barEnter = barUpdate.enter();
		var barExit = barUpdate.exit();

		barExit.remove();

		barEnter.append("rect")
				.attr("class", "bar")
			.merge(barUpdate)
				.attr("x", 0)
				.attr("y", function(d) { return yScale1(d.key); })
				.attr("width", function(d) { return xScale(d.value); })
				.attr("height", yScale1.bandwidth())
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