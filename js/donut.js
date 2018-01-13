function donutChart() {
	var chart = {},
			data = [],
			selector = "body",
			margin = {top: 30, right: 20, bottom: 20, left: 20},
			legendMargin = {top: margin.top / 2, left: 30},
			color = d3.scaleOrdinal().range(["#D05127", "#F79A00", "#1C789F", "#79388E", "#619504"]);

	// Format percentage label
	var format = d3.format(".0%");

	// Donut
	var pie = d3.pie()
			.sort(null)
			.value(function(d) { return d.value; });

	var arc = d3.arc();

	var labelArc = d3.arc();

	chart.render = function() {
		var width = parseInt(d3.select(selector).style("width")) - margin.left - margin.right;
		var height = parseInt(d3.select(selector).style("height")) - margin.top - margin.bottom;
		var radius = Math.min(width, height) / 2;
		var names = data.map(function(d) { return d.name; });

		// Update the scales
		color
				.domain(names);

		// Select the svg element if it exists
		var svg = d3.select(selector).select("svg");
		var g;
		// Otherwise, create the skeletal chart
		if (!svg.node()) {
			svg = d3.select(selector).append("svg").attr("class", "outer-chart");
			g = svg.append("g").attr("class", "inner-chart");
			g.append("g").attr("class", "chart-body");
			svg.append("g").attr("class", "legend");
		}
		g = svg.select(".inner-chart");
		// Update the dimensions
		svg.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);

		g.attr("transform", "translate(" + (margin.left + width / 2) + "," + (margin.top + height / 2) + ")");

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

		// Update donut
		arc
				.innerRadius(radius * 0.5)
				.outerRadius(radius);

		labelArc
				.innerRadius(radius * 0.75)
				.outerRadius(radius * 0.75);

		var sliceGroupUpdate = g.select(".chart-body").selectAll(".slice-group")
			.data(pie(data));
		var sliceGroupEnter = sliceGroupUpdate.enter()
			.append("g")
				.attr("class", "slice-group");
		var sliceGroupExit = sliceGroupUpdate.exit();

		sliceGroupExit.remove();

		sliceGroupEnter.append("path")
				.attr("class", "arc");

		sliceGroupEnter.append("text")
				.attr("class", "label")
				.attr("dy", "0.35em")
				.style("text-anchor", "middle");

		var sliceGroup = sliceGroupEnter.merge(sliceGroupUpdate);

		sliceGroup.select("path")
				.attr("d", arc)
				.style("fill", function(d) { return color(d.data.name); });

		sliceGroup.select("text")
				.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
				.text(function(d) { return format((d.endAngle - d.startAngle) / (2 * Math.PI)); });
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