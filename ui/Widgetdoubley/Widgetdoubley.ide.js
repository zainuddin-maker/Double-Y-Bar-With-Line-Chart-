TW.IDE.Widgets.Widgetdoubley = function () {
    // this.widgetIconUrl = function () {
    //     return "http://localhost:8015/Thingworx/Common/thingworx/widgets/mashup/mashup.ide.png";
    // };

    this.widgetProperties = function () {
        var properties = {
            name: "Widgetdoubley",
            description: "Widgetdoubley Chart",
            category: ["Common"],
            isExtension: true,
            supportsAutoResize: true,
            properties: {
                Widthbar: {
                    baseType: "NUMBER",
                    defaultValue: 450,
                },
                Heightbar: {
                    baseType: "NUMBER",
                    defaultValue: 250,
                },
                Paddingbar: {
                    baseType: "NUMBER",
                    defaultValue: 10,
                },
                TableData: {
                    baseType: "INFOTABLE",
                    isBindingTarget: true,
                },

                TableDataYAxis: {
                    baseType: "INFOTABLE",
                    isBindingTarget: true,
                },

                ShowLegend: {
                    baseType: "BOOLEAN",
                    defaultValue: true,
                },

                StartTime: {
                    baseType: "DATETIME",
                    isBindingTarget: true,
                    defaultValue: new Date("2015-01-28 00:00:00"),
                },
                EndTime: {
                    baseType: "DATETIME",
                    isBindingTarget: true,
                    defaultValue: new Date("2015-01-30 23:00:00.00"),
                },

                StylebarTooltip: {
                    baseType: "STYLEDEFINITION",
                    defaultValue: "DefaultSquealBtnStyle",
                },


                TickCount: {
                    baseType: "NUMBER",
                    defaultValue: 2,
                },

        

                StylebarXaxis: {
                    baseType: "STYLEDEFINITION",
                    defaultValue: "DefaultSquealBGStyle",
                },
                StylebarYLeftaxis: {
                    baseType: "STYLEDEFINITION",
                    defaultValue: "DefaultRangeSelectionStyle",
                },
                StylebarYRightaxis: {
                    baseType: "STYLEDEFINITION",
                    defaultValue: "DefaultRangeMidpointStyle",
                },
                StylebarLegend: {
                    baseType: "STYLEDEFINITION",
                    defaultValue: "DefaultRangeBoxStyle",
                },

                ShowTooltip: {
                    baseType: "BOOLEAN",
                    defaultValue: true,
                },
                ShowGrid: {
                    baseType: "BOOLEAN",
                    defaultValue: true,
                },
                IsLeftLegend: {
                    baseType: "BOOLEAN",
                    defaultValue: false,
                },

            },
        };

        return properties;
    };

    // The function is called before any property is updated in the ThingWorx Composer. You can perform validations on the new property value before it is committed. If the validation fails, you can return a message string to inform the user about the invalid input. The new property value is not be committed. If nothing is returned during the validation, then the value is assumed valid.
    //  this.beforeSetProperty = function (name, value) {
    //     // Validate Input Properties

    // };

    this.afterSetProperty = function (name, value) {
        this.updatedProperties();
        return true;
    };

    this.afterLoad = function () {};

    this.renderHtml = function () {
        return "<div class=widget-content widget-Widgetdoubley>" + "</div>";
    };

    // this.afterRender = function () {
    //     // NOTE: this.jqElement is the jquery reference to your html dom element
    //     // 		 that was returned in renderHtml()

    //     // get a reference to the value element
    //     valueElem = this.jqElement.find(".HelloWorld-property");
    //     // update that DOM element based on the property value that the user set
    //     // in the mashup bHelloWorldlder
    //     valueElem.text(this.getProperty("Name"));
    // };

    this.afterRender = function () {
        this.setupWidget();
    };

    this.setupWidget = function () {
        var widgetID = this.jqElementId;

        d3.select(`#${widgetID}`).selectAll("*").remove();
        // Handle Properties
        try {
            var allWidgetProps = this.allWidgetProperties().properties;

            var widgetProps = {};

            for (const [key, value] of Object.entries(allWidgetProps)) {
                if (key.includes("Style")) {
                    widgetProps[key] = TW.getStyleFromStyleDefinition(
                        this.getProperty(key)
                    );
                } else {
                    widgetProps[key] = this.getProperty(key);
                }
            }

            // Calculated props
            // widgetProps.hourDist = Math.round(
            //     widgetProps.TopContentHeight / widgetProps.TimeSpan
            // );
            // widgetProps.leftWidth = widgetProps.HourWidth + widgetProps.Padding;
            // widgetProps.rightWidth = widgetProps.MaxRightContentWidth;
            // widgetProps.totalHeight = Math.round(
            //     3 * widgetProps.Padding +
            //         widgetProps.TopContentHeight +
            //         widgetProps.WorkCentreHeight +
            //         2 * widgetProps.InnerContentSpacing
            // );
            // widgetProps.botHeight =
            //     widgetProps.WorkCentreHeight +
            //     widgetProps.Padding +
            //     widgetProps.InnerContentSpacing;
            console.log("widgetProps idle double y");
            console.log(widgetProps);
        } catch (error) {
            console.log("error");
            console.log(error);
        }

        var widthwindows = widgetProps.Widthbar,
            heightwindowss = widgetProps.Heightbar;

        var marginwindows = {
            top: widgetProps.Paddingbar,
            right: widgetProps.Paddingbar,
            bottom: widgetProps.Paddingbar,
            left: widgetProps.Paddingbar,
        };
        var varbooleanlegend = widgetProps.ShowLegend;

        var startdate = new Date(widgetProps.StartTime);

        var varenddate = new Date(widgetProps.EndTime);

        var dataarray = {
            rows: [
                {
                    options: {
                        rows: [
                            {
                                color: {
                                    rows: [
                                        {
                                            id: 1,
                                            value: "#a61b1b",
                                        },
                                        {
                                            id: 2,
                                            value: "#2ea32e",
                                        },
                                        {
                                            id: 3,
                                            value: "#2eff2e",
                                        },
                                        {
                                            id: 4,
                                            value: "#FFFF00",
                                        },
                                    ],
                                },
                                type: {
                                    rows: [
                                        {
                                            id: 1,
                                            value: "bar",
                                        },
                                        {
                                            id: 2,
                                            value: "bar",
                                        },
                                        {
                                            id: 3,
                                            value: "bar",
                                        },
                                        {
                                            id: 4,
                                            value: "line",
                                        },
                                    ],
                                },

                                name: {
                                    rows: [
                                        {
                                            id: 1,
                                            value: "bar 1",
                                        },
                                        {
                                            id: 2,
                                            value: "bar 2",
                                        },
                                        {
                                            id: 3,
                                            value: "bar 3",
                                        },
                                        {
                                            id: 4,
                                            value: "line",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                    values: {
                        rows: [
                            {
                                date: "2015-01-28T07:00:00.000Z",
                                id: 1,
                                value: "10",
                            },
                            {
                                date: "2015-01-28T08:00:00.000Z",
                                id: 2,
                                value: "10",
                            },
                            {
                                date: "2015-01-28T08:00:00.000Z",
                                id: 3,
                                value: "10",
                            },
                            {
                                date: "2015-01-28T08:00:00.000Z",
                                id: 4,
                                value: "10",
                            },
                            {
                                date: "2015-01-29T07:00:00.000Z",
                                id: 1,
                                value: "10",
                            },
                            {
                                date: "2015-01-29T08:00:00.000Z",
                                id: 2,
                                value: "10",
                            },
                            {
                                date: "2015-01-29T08:00:00.000Z",
                                id: 3,
                                value: "10",
                            },
                            {
                                date: "2015-01-29T08:00:00.000Z",
                                id: 4,
                                value: "10",
                            },

                            {
                                date: "2015-01-30T07:00:00.000Z",
                                id: 1,
                                value: "10",
                            },
                            {
                                date: "2015-01-30T08:00:00.000Z",
                                id: 2,
                                value: "10",
                            },
                            {
                                date: "2015-01-30T08:00:00.000Z",
                                id: 3,
                                value: "10",
                            },
                            {
                                date: "2015-01-30T08:00:00.000Z",
                                id: 4,
                                value: "10",
                            },
                        ],
                    },
                },
            ],
        };

        var fontsizetooltipstring = widgetProps.StylebarTooltip.textSize;

        var colorlinechart = "#00ff00";

        var miny0 = widgetProps.MinyLeft;

        var maxy0 = widgetProps.MaxyLeft;

        var miny1 = widgetProps.MinyRight;

        var maxy1 = widgetProps.MaxyRight;

        var tick_count = widgetProps.TickCount;

        if (!miny1) {
            miny1 = 0;
        }

        if (!miny0) {
            miny0 = 0;
        }

        const convertFontSize = (textSize) => {
            var result = textSize;
            switch (textSize) {
                case "xsmall":
                    result = "9px";
                    break;
                case "small":
                    result = "10px";
                    break;
                case "normal":
                    result = "11px";
                    break;
                case "large":
                    result = "12px";
                    break;
                case "xlarge":
                    result = "14px";
                    break;
                case "xxl":
                    result = "16px";
                    break;
                case "2xl":
                    result = "18px";
                    break;
                case "3xl":
                    result = "22px";
                    break;
                default:
                    result = "22px";
            }

            return result;
        };

        var optionscolor = dataarray.rows[0].options.rows[0].color.rows;

        var colorlist = [];

        optionscolor.forEach((element) => {
            colorlist.push(element.value);
        });

        var optionstype = dataarray.rows[0].options.rows[0].type.rows;

        var optionsname = dataarray.rows[0].options.rows[0].name.rows;

        var valuesarray = [];

        dataarray.rows[0].values.rows.forEach((data, i) => {
            if (
                new Date(data.date) <= new Date(varenddate) &&
                new Date(data.date) >= new Date(startdate)
            ) {
                valuesarray.push(data);
            }
        });

        valuesarray.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });

        function makeformatdate(datereal) {
            const datenew = new Date(datereal);

            return (
                datenew.getFullYear() +
                "-" +
                (datenew.getMonth() < 10
                    ? "0" + (datenew.getMonth() + 1)
                    : datenew.getMonth() + 1) +
                "-" +
                datenew.getDate()
            );
        }

        var arraydate = [];
        var arraynamedata = [];

        valuesarray.forEach((data, i) => {
            if (
                arraydate.findIndex(
                    (element) => element.date === makeformatdate(data.date)
                ) < 0
            ) {
                arraydate.push({
                    date: makeformatdate(data.date),
                    color: colorlist,
                    values: [
                        { name: "name-0", value: 0 },
                        { name: "name-1", value: 0 },
                    ],
                    valueline: [{ name: "name-2", value: 0 }],
                });
            }

            if (
                arraynamedata.findIndex(
                    (element) =>
                        element.id === data.id &&
                        element.date === makeformatdate(data.date)
                ) < 0
            ) {
                const objectrow = {
                    date: makeformatdate(data.date),
                    id: data.id,
                    name: data.id,
                    color: data.id,
                    value: parseInt(data.value),
                };

                if (
                    optionscolor.findIndex(
                        (element) => element.id === data.id
                    ) >= 0
                ) {
                    objectrow.color =
                        optionscolor[
                            optionscolor.findIndex(
                                (element) => element.id === data.id
                            )
                        ].value;
                } else {
                    objectrow.color =
                        "#" + Math.floor(Math.random() * 16777215).toString(16);
                }

                if (
                    optionsname.findIndex(
                        (element) => element.id === data.id
                    ) >= 0
                ) {
                    objectrow.name =
                        optionsname[
                            optionsname.findIndex(
                                (element) => element.id === data.id
                            )
                        ].value;
                } else {
                    objectrow.name = "name-" + data.id;
                }

                if (
                    optionstype.findIndex(
                        (element) => element.id === data.id
                    ) >= 0
                ) {
                    objectrow.type =
                        optionstype[
                            optionstype.findIndex(
                                (element) => element.id === data.id
                            )
                        ].value;
                } else {
                    objectrow.type = "bar";
                }

                arraynamedata.push(objectrow);
            } else {
                arraynamedata[
                    arraynamedata.findIndex(
                        (element) =>
                            element.id === data.id &&
                            element.date === makeformatdate(data.date)
                    )
                ].value += parseInt(data.value);
            }
        });

        arraydate.forEach((datadate, i) => {
            arraynamedata.forEach((dataarray, j) => {
                if (dataarray.date === datadate.date) {
                    if (dataarray.type === "line") {
                        datadate.valueline[0] = {
                            name: dataarray.name,
                            value: dataarray.value,
                        };
                    }

                    if (dataarray.type === "bar") {
                        datadate.values[
                            optionstype.findIndex(
                                (element) => element.id === dataarray.id
                            )
                        ] = {
                            name: dataarray.name,
                            value: dataarray.value,
                        };
                    }
                }
            });
        });

        var datanewchart = arraydate;

        var margin = {
                top: 20 + marginwindows.top,
                right: 40 + marginwindows.right,
                bottom: 40 + marginwindows.bottom,
                left: 40 + marginwindows.left,
            },
            width = widthwindows - margin.left - margin.right,
            height = heightwindowss - margin.top - margin.bottom;

        const datasetnewnew = [];
        datanewchart.forEach((element) => {
            datasetnewnew.push({
                date: element.date,
                color: element.color,
                values: element.values,
                valueline: element.valueline,
            });
        });
        var datasetnew = datasetnewnew;

        function newaxisdata(data) {
            const result = [];
            const increase = Math.floor(data.length / tickcount);

            for (var i = 0; i < tickcount; i++) {
                if (i === 0) {
                    result.push(data[i]);
                } else if (i === tickcount - 1) {
                    result.push(data[data.length - 1]);
                } else {
                    result.push(data[i * increase]);
                }
            }

            return result;
        }

        const tickcount = Math.floor(width / 63);

        var dataset = [];
        if (datasetnew.length > tickcount) {
            dataset = newaxisdata(datasetnew);
        } else {
            dataset = datasetnew;
        }

        var valueslist = [];
        var valuelineslist = [];
        datasetnew[0].values.forEach((element) => {
            valueslist.push(element.name);
        });

        datasetnew[0].valueline.forEach((element) => {
            valuelineslist.push(element.name);
        });

        var x0 = d3.scale.ordinal().rangeRoundBands([0, width], 0.5);
        var x1 = d3.scale.ordinal();

        var x2 = d3.scale
            .ordinal()
            .rangeRoundBands(
                [
                    width / (4 * dataset.length),
                    width + width / (4 * dataset.length),
                ],
                0.5
            );

        var x = d3.time.scale().range([0, width]);

        var y0 = d3.scale.linear().range([height, 0]);

        var y1 = d3.scale.linear().range([height, 0]);

        var color = d3.scale.ordinal().range(dataset[0].color);

        var xAxis = d3.svg.axis().scale(x0).orient("bottom").ticks(5);
        // .tickSize(-height);;

        var yAxisLeft = d3.svg
            .axis()
            .scale(y0)
            .orient("left")

            .tickSize(-width)
            .ticks(tick_count);
        // .tickFormat(function (d){
        //     return d3.format(".1f")(d);
        // })

        var yAxisRight = d3.svg
            .axis()
            .scale(y1)
            .orient("right")
            .ticks(tick_count);
        // .tickFormat(function (d) {
        //     return parseInt(d);
        // });

        var makemy_dataviz = d3
            .select(`#${widgetID}`)
            .append("div")
            .attr("id", "my_dataviz_doubley")
            .style("width", width + (margin.left + margin.right) + "px")
            .style("height", height + (margin.top + margin.bottom) + "px");

        var svg = d3
            .select("#my_dataviz_doubley")
            .append("svg")
            // .attr('style', 'background-color:black')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr(
                "transform",
                "translate(" + margin.left + "," + margin.top + ")"
            );

        var secondcontainer = d3
            .select("#my_dataviz_doubley")
            .append("div")
            .attr("id", "secondcontainerdoubley")
            .attr("class", "secondcontainerdoubley")
            // .style("background-color", "#eaeaea")
            .style("display", "flex")
            .style("width", width + "px")
            // .style("height", 18 +"px")
            .style("flex-direction", "row-reverse")
            .style("margin-top", -18 + "px")
            .style("margin-left", margin.left + "px");

        var tooltipdiv = d3
            .select("#my_dataviz_doubley")
            .append("div")
            .attr("id", "tooltipdoubley")
            .attr("class", "hidden");

        var tooltipdivp1 = tooltipdiv.append("p");

        tooltipdivp1
            .append("strong")
            .attr("id", "name")
            .style("margin-right", "5px");
        tooltipdivp1.append("span").attr("id", "value");

        var tooltipdivp2 = tooltipdiv.append("p");

        tooltipdivp2
            .append("strong")
            .attr("id", "name1")
            .style("margin-right", "5px");
        tooltipdivp2.append("span").attr("id", "value1");

        var tooltipdivp3 = tooltipdiv.append("p");

        tooltipdivp3
            .append("strong")
            .attr("id", "name2")
            .style("margin-right", "5px");
        tooltipdivp3.append("span").attr("id", "value2");

        if (valueslist.length > 2) {
            var tooltipdivp4 = tooltipdiv.append("p");
            tooltipdivp4
                .append("strong")
                .attr("id", "name3")
                .style("margin-right", "5px");
            tooltipdivp4.append("span").attr("id", "value3");
        }

        x0.domain(
            dataset.map(function (d) {
                return d.date;
            })
        );

        x2.domain(
            dataset.map(function (d) {
                return d.date;
            })
        );

        x.domain(
            dataset.map(function (d) {
                return d.date;
            })
        );

        x1.domain(valueslist).rangeRoundBands([0, x0.rangeBand()]);

        // var miny0 = null

        // if (!miny0){

        //     miny0 = 0
        // }
        // var maxy0 = null

        y0.domain([
            miny0,
            d3.max(dataset, function (d) {
                if (!maxy0) {
                    return Math.max(d.values[0].value, d.valueline[0].value);
                } else {
                    return maxy0;
                }
            }),
        ]);

        y1.domain([
            miny1,
            d3.max(dataset, function (d) {
                if (!maxy1) {
                    if (d.values[2]) {
                        return Math.max(d.values[1].value, d.values[2].value); // if 3
                    } else {
                        return d.values[1].value;
                    }
                } else {
                    return maxy1;
                }
            }),
        ]);

        var arrayyaxis = [y0, y1, y1]; // if 3

        var lefty = "";
        var righty = "";
        valueslist.concat(valuelineslist).forEach((element, i) => {
            if (i == 0 || i == valueslist.concat(valuelineslist).length - 1) {
                lefty += valueslist.concat(valuelineslist)[i] + ",";
            } else {
                righty += valueslist.concat(valuelineslist)[i] + ",";
            }
        });

        // Ticks on x-axis and y-axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            // .attr("fill", colorlinechart)
            .attr("transform", "rotate(-5)");
        // .selectAll(".path")
        // .attr("stroke", "#ffffff")
        svg.select(".x.axis").selectAll("text").style("fill", colorlinechart);
        svg.select(".x.axis")
            .selectAll("path")
            .style("fill", "none")
            .style("stroke", colorlinechart)
            .style("shape-rendering", "crispEdges");
        svg.select(".x.axis")
            .selectAll("line")
            .style("fill", "none")
            .style("stroke", colorlinechart)
            .style("shape-rendering", "crispEdges");

        svg.append("g")
            .attr("class", "y0 axis")
            .call(yAxisLeft)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -30)
            .attr("x", function (d, i) {
                return -(height / 2 + (lefty.slice(0, -1).length * 6) / 2);
            }) //-(height / 2 + 60)

            // .style("fill", colorlinechart)
            .text(lefty.slice(0, -1));

        svg.select(".y0.axis")
            .selectAll("path")
            .style("fill", "none")
            .style("stroke", colorlinechart)
            .style("shape-rendering", "crispEdges");
            svg.select(".y0.axis").selectAll("line").style("fill", "none").style("stroke",colorlinechart).style("shape-rendering","crispEdges"); 
        svg.select(".y0.axis").selectAll("text").style("fill", colorlinechart);
        // svg.select(".y0.axis").selectAll(".tick").style("fill", "#000");

        svg.append("g")
            .attr("class", "y1 axis")
            .attr("transform", "translate(" + width + ",0)")
            .call(yAxisRight)
            .append("text")
            .attr("transform", "rotate(90)")
            .attr("y", -40)
            .attr("x", function (d, i) {
                return height / 2 - (righty.slice(0, -1).length * 6) / 2;
            }) //height / 2 - 30

            // .style("fill", colorlinechart)
            .text(righty.slice(0, -1));
        svg.select(".y1.axis")
            .selectAll("path")
            .style("fill", "none")
            .style("stroke", colorlinechart)
            .style("shape-rendering", "crispEdges");
        svg.select(".y1.axis")
        .selectAll("line").style("fill", "none").style("stroke",colorlinechart).style("shape-rendering","crispEdges"); 
        svg.select(".y1.axis").selectAll("text").style("fill", colorlinechart);
        // End ticks

        //var x1 = d3.scale.ordinal();
        //x1.domain(valueslist).rangeRoundBands([0, x0.rangeBand()]);

        // var colornew = d3.scale.ordinal().range(datasetexmaple[0].color);

        var graph = svg
            .selectAll(".date")
            .data(dataset)
            .enter()
            .append("g")
            .attr("class", "g")
            .attr("transform", function (d) {
                return "translate(" + x0(d.date) + ",0)";
            });

        graph
            .selectAll("rect")
            .data(function (d) {
                return d.values;
            })
            .enter()
            .append("rect")
            .attr("width", x1.rangeBand())
            .attr("x", function (d, i) {
                return x1(d.name);
            })
            .attr("y", function (d, i) {
                return arrayyaxis[i](d.value);
            })
            .attr("height", function (d, i) {
                return height - arrayyaxis[i](d.value);
            })
            .style("fill", function (d) {
                return color(d.name);
            });

        var line = d3.svg
            .line()
            .x(function (d) {
                return x2(d.date);
            })
            .y(function (d) {
                return y0(d.valueline[0].value);
            });

        svg.append("path")
            .data(dataset)
            .attr("class", "line")
            .attr(
                "style",
                "fill: none;stroke:" +
                    dataset[0].color[dataset[0].color.length - 1] +
                    ";stroke-width:3px"
            )
            .attr("d", function (d) {
                // console.log(  color(d.valueline[0].name))
                return line(dataset);
            });

        svg.selectAll("myCircles")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("fill", dataset[0].color[dataset[0].color.length - 1])
            .attr("stroke", "#ffffff")
            .attr("cx", function (d, i) {
                // if (i % 2 === 1) {
                return x2(d.date);
                // } else {
                //     return x1("");
                // }
            })
            .attr("cy", function (d, i) {
                // if (i % 2 === 1) {

                return y0(d.valueline[0].value);
                // }

                // return y(0);
            })
            .attr("r", 3)
            .on("mouseenter", function (d) {
                d3.select("#tooltipdoubley")
                    .style("left", d3.event.offsetX + "px")
                    .style("top", d3.event.offsetY + "px")

                    .style("opacity", 1)
                    .style("display", "block")
                    .style("font-size", convertFontSize(fontsizetooltipstring))
                    .style(
                        "line-height",
                        convertFontSize(fontsizetooltipstring)
                    )
                    .select("#name")
                    .text(d.values[0].name);

                d3.select("#tooltipdoubley")

                    .select("#value")
                    .text(d.values[0].value);

                d3.select("#tooltipdoubley")

                    .select("#name1")
                    .text(d.values[1].name);

                d3.select("#tooltipdoubley")

                    .select("#value1")
                    .text(d.values[1].value);

                if (d.values[2]) {
                    d3.select("#tooltipdoubley")

                        .select("#name3")
                        .text(d.values[2].name);

                    d3.select("#tooltipdoubley")

                        .select("#value3")
                        .text(d.values[2].value);
                }

                d3.select("#tooltipdoubley")
                    .select("#name2")
                    .text(d.valueline[0].name);

                d3.select("#tooltipdoubley")

                    .select("#value2")
                    .text(d.valueline[0].value);
            })

            .on("mouseleave", (d) =>
                d3.select("#tooltipdoubley").style("display", "none")
            );

        var databartable = JSON.parse(JSON.stringify(optionscolor));

        optionscolor.forEach((data, i) => {
            const find = optionsname.findIndex(
                (element) => element.id === data.id
            );
            databartable[i].name = optionsname[find].value;
            databartable[i].color = optionscolor[i].value;
        });

        // Legend

        var legend = secondcontainer
            .selectAll(".legenddoubley")
            .data(databartable)
            .enter()
            .append("div")
            .attr("class", "legenddoubley")
            .style("margin-bottom", "9px")
            .style("display", function (d) {
                if (varbooleanlegend) {
                    return "flex";
                } else {
                    return "none";
                }
            })
            .style("height", "18px");
        legend
            .append("div")
            .attr("class", "legendtextdoubley")
            .style("color", colorlinechart)
            .text(function (d) {
                return d.name;
            });
        legend
            .append("div")
            .attr("class", "legendboxdoubley")

            .style("background-color", function (d) {
                return d.color;
            });
    };

    // this.widgetEvents = function () {
    //     return {
    //         DoubleClicked: {
    //             description:
    //                 "Event triggered when a row has been double clicked",
    //         },
    //         Clicked: {
    //             description: "Event triggered when a row has been clicked",
    //         },
    //     };
    // };
};
