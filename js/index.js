///////////////
// Bar chart //
///////////////
var dataBar = [
	{name: "Mon", value: 13400},
	{name: "Tue", value: 16600},
	{name: "Wed", value: 14200},
	{name: "Thu", value: 12800},
	{name: "Fri", value: 18200},
	{name: "Sat", value: 20500},
	{name: "Sun", value: 18800}
];
var dataBar2 = [
	{name: "Mon", value: 16400},
	{name: "Tue", value: 12600},
	{name: "Wed", value: 13200},
	{name: "Thu", value: 15400},
	{name: "Fri", value: 19400}
];
var dataBar3 = [
	{name: "East", value: 36400},
	{name: "Central", value: 26600},
	{name: "West", value: 43200}
];
var barChart = barChart().selector("#bar-chart").data(dataBar);
barChart.render();
document.querySelector("#btn-bar-chart-1").addEventListener("click", function() {
	barChart.data(dataBar);
	barChart.render();
});
document.querySelector("#btn-bar-chart-2").addEventListener("click", function() {
	barChart.data(dataBar2);
	barChart.render();
});
document.querySelector("#btn-bar-chart-3").addEventListener("click", function() {
	barChart.data(dataBar3);
	barChart.render();
});

///////////////////////
// Grouped Bar Chart //
///////////////////////
var dataGroupedBar = [
	{name: "Q1", East: 436500, Central: 824300, West: 763500},
	{name: "Q2", East: 673200, Central: 523400, West: 638200},
	{name: "Q3", East: 653844, Central: 489300, West: 843000},
	{name: "Q4", East: 883400, Central: 823400, West: 923400},
];
var dataGroupedBar2 = [
	{name: "East", Q1: 436500, Q2: 673200, Q3: 763500, Q4: 763500},
	{name: "Central", Q1: 824300, Q2: 523400, Q3: 638200, Q4: 763500},
	{name: "West", Q1: 763500, Q2: 638200, Q3: 843000, Q4: 923400}
];
var groupedBarChart = groupedBarChart().selector("#grouped-bar-chart").data(dataGroupedBar);
groupedBarChart.render();
document.querySelector("#btn-grouped-bar-chart-1").addEventListener("click", function() {
	groupedBarChart.data(dataGroupedBar);
	groupedBarChart.render();
});
document.querySelector("#btn-grouped-bar-chart-2").addEventListener("click", function() {
	groupedBarChart.data(dataGroupedBar2);
	groupedBarChart.render();
});

///////////////////////
// Stacked Bar Chart //
///////////////////////
var dataStackedBar = dataGroupedBar;
var dataStackedBar2 = dataGroupedBar2;
var stackedBarChart = stackedBarChart().selector("#stacked-bar-chart").data(dataStackedBar);
stackedBarChart.render();
document.querySelector("#btn-stacked-bar-chart-1").addEventListener("click", function() {
	stackedBarChart.data(dataStackedBar);
	stackedBarChart.render();
});
document.querySelector("#btn-stacked-bar-chart-2").addEventListener("click", function() {
	stackedBarChart.data(dataStackedBar2);
	stackedBarChart.render();
});

/////////////////////////
// Horizontal Bar Chat //
/////////////////////////
var dataHorizontalBar = dataGroupedBar;
var dataHorizontalBar2 = dataGroupedBar2;
var horizontalBarChart = horizontalBarChart().selector("#horizontal-bar-chart").data(dataHorizontalBar);
horizontalBarChart.render();
document.querySelector("#btn-horizontal-bar-chart-1").addEventListener("click", function() {
	horizontalBarChart.data(dataHorizontalBar);
	horizontalBarChart.render();
});
document.querySelector("#btn-horizontal-bar-chart-2").addEventListener("click", function() {
	horizontalBarChart.data(dataHorizontalBar2);
	horizontalBarChart.render();
});

////////////////
// Line Chart //
////////////////
var dataLine = [
	{date: "20170117",	East: 528,	Central: 611,	West: 481},
	{date: "20170118",	East: 508,	Central: 592,	West: 480},
	{date: "20170119",	East: 521,	Central: 589,	West: 536},
	{date: "20170120",	East: 551,	Central: 572,	West: 574},
	{date: "20170121",	East: 556,	Central: 564,	West: 643},
	{date: "20170122",	East: 544,	Central: 607,	West: 724},
	{date: "20170123",	East: 544,	Central: 651,	West: 724},
	{date: "20170124",	East: 548,	Central: 609,	West: 725},
	{date: "20170125",	East: 579,	Central: 561,	West: 727},
	{date: "20170126",	East: 546,	Central: 546,	West: 734},
	{date: "20170127",	East: 544,	Central: 561,	West: 707},
	{date: "20170128",	East: 425,	Central: 581,	West: 568}
];
var dataLine2 = [
	{date: "20170115",	East: 646,	West: 684},
	{date: "20170116",	East: 616,	West: 701},
	{date: "20170117",	East: 611,	West: 711},
	{date: "20170118",	East: 692,	West: 709},
	{date: "20170119",	East: 689,	West: 618},
	{date: "20170120",	East: 672,	West: 577},
	{date: "20170121",	East: 564,	West: 646},
	{date: "20170122",	East: 507,	West: 720},
	{date: "20170123",	East: 551,	West: 725},
	{date: "20170124",	East: 509,	West: 720},
	{date: "20170125",	East: 561,	West: 726},
	{date: "20170126",	East: 546,	West: 734},
	{date: "20170127",	East: 561,	West: 706},
	{date: "20170128",	East: 481,	West: 568},
	{date: "20170129",	East: 475,	West: 517},
	{date: "20170130",	East: 377,	West: 547},
	{date: "20170131",	East: 451,	West: 585}
];
var dataLine3 = [
	{date: "20170115",	East: 517,	Central: 646,	West: 480},
	{date: "20170116",	East: 518,	Central: 616,	West: 456},
	{date: "20170117",	East: 528,	Central: 611,	West: 481},
	{date: "20170118",	East: 508,	Central: 592,	West: 480},
	{date: "20170119",	East: 521,	Central: 589,	West: 536},
	{date: "20170120",	East: 551,	Central: 572,	West: 574},
	{date: "20170121",	East: 556,	Central: 564,	West: 643},
	{date: "20170122",	East: 544,	Central: 607,	West: 724},
	{date: "20170123",	East: 544,	Central: 651,	West: 724},
	{date: "20170124",	East: 548,	Central: 609,	West: 725},
	{date: "20170125",	East: 579,	Central: 561,	West: 727},
	{date: "20170126",	East: 546,	Central: 546,	West: 734},
	{date: "20170127",	East: 544,	Central: 561,	West: 707},
	{date: "20170128",	East: 425,	Central: 581,	West: 568},
	{date: "20170129",	East: 409,	Central: 575,	West: 510},
	{date: "20170130",	East: 386,	Central: 577,	West: 549},
	{date: "20170131",	East: 442,	Central: 551,	West: 588}
];
var lineChart = lineChart().selector("#line-chart").data(dataLine);
lineChart.render();
document.querySelector("#btn-line-chart-1").addEventListener("click", function() {
	lineChart.data(dataLine);
	lineChart.render();
});
document.querySelector("#btn-line-chart-2").addEventListener("click", function() {
	lineChart.data(dataLine2);
	lineChart.render();
});
document.querySelector("#btn-line-chart-3").addEventListener("click", function() {
	lineChart.data(dataLine3);
	lineChart.render();
});

////////////////
// Area Chart //
////////////////
var dataArea = dataLine;
var dataArea2 = dataLine2;
var dataArea3 = dataLine3;
var areaChart = areaChart().selector("#area-chart").data(dataArea);
areaChart.render();
document.querySelector("#btn-area-chart-1").addEventListener("click", function() {
	areaChart.data(dataArea);
	areaChart.render();
});
document.querySelector("#btn-area-chart-2").addEventListener("click", function() {
	areaChart.data(dataArea2);
	areaChart.render();
});
document.querySelector("#btn-area-chart-3").addEventListener("click", function() {
	areaChart.data(dataArea3);
	areaChart.render();
});

///////////////
// Pie Chart //
///////////////
var dataPie = [
	{name: "Mobile", value: 36400},
	{name: "Tablet", value: 16600},
	{name: "Desktop", value: 48200}
];
var dataPie2 = [
	{name: "Mobile", value: 52400},
	{name: "Tablet", value: 18600},
	{name: "Desktop", value: 32200}
];
var dataPie3 = [
	{name: "Mon", value: 16400},
	{name: "Tue", value: 12600},
	{name: "Wed", value: 13200},
	{name: "Thu", value: 15400},
	{name: "Fri", value: 19400}
];
var pieChart = pieChart().selector("#pie-chart").data(dataPie);
pieChart.render();
document.querySelector("#btn-pie-chart-1").addEventListener("click", function() {
	pieChart.data(dataPie);
	pieChart.render();
});
document.querySelector("#btn-pie-chart-2").addEventListener("click", function() {
	pieChart.data(dataPie2);
	pieChart.render();
});
document.querySelector("#btn-pie-chart-3").addEventListener("click", function() {
	pieChart.data(dataPie3);
	pieChart.render();
});

/////////////////
// Dount Chart //
/////////////////
var dataDonut = dataPie;
var dataDonut2 = dataPie2;
var dataDonut3 = dataPie3;
var donutChart = donutChart().selector("#donut-chart").data(dataDonut);
donutChart.render();
document.querySelector("#btn-donut-chart-1").addEventListener("click", function() {
	donutChart.data(dataDonut);
	donutChart.render();
});
document.querySelector("#btn-donut-chart-2").addEventListener("click", function() {
	donutChart.data(dataDonut2);
	donutChart.render();
});
document.querySelector("#btn-donut-chart-3").addEventListener("click", function() {
	donutChart.data(dataDonut3);
	donutChart.render();
});


////////////////////
// Progress Chart //
////////////////////
var dataProgress = {current: 75, goal: 100};
var dataProgress2 = {current: 12500, goal: 20000};
var dataProgress3 = {current: 0.36, goal: 1};
var progressChart = progressChart().selector("#progress-chart").data(dataProgress).color("#F79A00");
progressChart.render();
document.querySelector("#btn-progress-chart-1").addEventListener("click", function() {
	progressChart.data(dataProgress).color("#F79A00");
	progressChart.render();
});
document.querySelector("#btn-progress-chart-2").addEventListener("click", function() {
	progressChart.data(dataProgress2).color("#D05127");
	progressChart.render();
});
document.querySelector("#btn-progress-chart-3").addEventListener("click", function() {
	progressChart.data(dataProgress3).color("#1C789F");
	progressChart.render();
});

////////////
// Resize //
////////////
window.addEventListener("resize", resize);

function resize() {
	barChart.render();
	groupedBarChart.render();
	stackedBarChart.render();
	horizontalBarChart.render();
	lineChart.render();
	areaChart.render();
	pieChart.render();
	donutChart.render();
	progressChart.render();
}
