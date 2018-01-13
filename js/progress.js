function progressChart() {
	var chart = {},
			data = {current: 0, goal: 1},
			selector = "body",
			margin = {top: 30, right: 20, bottom: 20, left: 20},
			legendMargin = {top: margin.top / 2, left: 30},
			color = "#D05127",
			emptyColor = "#21211F";

	// Format percentage label
	var format = d3.format(".0%");

	// Donut
	var pie = d3.pie()
			.sort(null);

	var arc = d3.arc();

	chart.render = function() {
		var width = parseInt(d3.select(selector).style("width")) - margin.left - margin.right;
		var height = parseInt(d3.select(selector).style("height")) - margin.top - margin.bottom;
		var radius = Math.min(width, height) / 2;

		// Process data
		var processedData = [data.current, data.goal - data.current];

		// Select the svg element if it exists
		var svg = d3.select(selector).select("svg");
		var g;
		// Otherwise, create the skeletal chart
		if (!svg.node()) {
			svg = d3.select(selector).append("svg").attr("class", "outer-chart");
			g = svg.append("g").attr("class", "inner-chart");
			g.append("g").attr("class", "chart-body");
		}
		g = svg.select(".inner-chart");
		// Update the dimensions
		svg.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);

		g.attr("transform", "translate(" + (margin.left + width / 2) + "," + (margin.top + height / 2) + ")");

		// Update donut
		arc
				.innerRadius(radius * 0.6)
				.outerRadius(radius);

		var sliceUpdate = g.select(".chart-body").selectAll(".arc")
			.data(pie(processedData));

		sliceUpdate.enter()
			.append("path")
				.attr("class", "arc")
			.merge(sliceUpdate)
				.attr("d", arc)
				.style("fill", function(d, i) { return [color, emptyColor][i]; });

		// Center text
		var progressLabelUpdate = g.select(".chart-body")
			.selectAll(".progress-label")
			.data([data]);

		progressLabelUpdate
			.enter().append("text")
				.attr("class", "progress-label")
				.attr("dy", "0.35em")
				.style("text-anchor", "middle")
				.style("font-size", 36)
			.merge(progressLabelUpdate)
				.style("fill", color)
				.text(function(d) { return format(data.current / data.goal); });
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
		if (!arguments.length) return color;
		color = _;
		return chart;
	};

	return chart;
}