TW.Runtime.Widgets.Widgetdoubley = function () {
    this.renderHtml = function () {
        // return any HTML you want rendered for your widget
        // If you want it to change depending on properties that the user
        // has set, you can use this.getProperty(propertyName). In
        // this example, we'll just return static HTML
        return '<div class="widget-content widget-Widgetdoubley"></div>';
    };

    // };

    this.updateProperty = function (updatePropertyInfo) {
        // TargetProperty tells you which of your bound properties changed
        if (updatePropertyInfo.TargetProperty === "TableData") {
            this.setProperty(
                "TableData",
                updatePropertyInfo.RawDataFromInvoke.rows
            );
            this.setupWidget();
        }

        if (updatePropertyInfo.TargetProperty === "TableDataYAxis") {
            this.setProperty(
                "TableDataYAxis",
                updatePropertyInfo.RawDataFromInvoke.rows
            );
            this.setupWidget();
        }
    };

    this.afterRender = function () {
        console.log("berhasil running afterRender");
        this.setupWidget();
    };

    this.setupWidget = function () {
        var widgetID = this.jqElementId;
        // Remove all old/existing DOM element
        d3.select(`#${widgetID}`).selectAll("*").remove();
        // Handle Properties
        try {
            var allWidgetProps = this.properties;

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

            console.log("widgetProps running doubley");
            console.log(widgetProps);
        } catch (error) {
            console.log("error");
            console.log(error);
        }

        var widthwindows = widgetProps.Widthbar,
            heightwindowss = widgetProps.Heightbar;

        var varbooleanlegend = widgetProps.ShowLegend;

        var startdate = new Date(widgetProps.StartTime);

        var varenddate = new Date(widgetProps.EndTime);

        var dataarray = {
            rows: widgetProps.TableData,
        };
        // console.log( "widgetProps.TableDataYAxis")
        // console.log( widgetProps.TableDataYAxis[0])

        var miny0 = widgetProps.TableDataYAxis[0].min_left;

        var maxy0 = widgetProps.TableDataYAxis[0].max_left;

        var miny1 = widgetProps.TableDataYAxis[0].min_right;

        var maxy1 = widgetProps.TableDataYAxis[0].max_right;

        let lengthmax = (maxy1 / 2).toString().length;
        let lengthmaxleft = (maxy0 / 2).toString().length;
        let addpagingright = 0;
        let addpagingleft = 0;
        function getBaseLog(x, y) {
            return Math.log(y) / Math.log(x);
        }

        if (lengthmax > 4) {
            addpagingright =
                (lengthmax - 4) * 5.56 + Math.floor(getBaseLog(1000, maxy1));
        }

        if (lengthmaxleft > 4) {
            addpagingleft =
                (lengthmaxleft - 4) * 5.56 +
                Math.floor(getBaseLog(1000, maxy0));
        }

        var marginwindows = {
            top: widgetProps.Paddingbar,
            right: widgetProps.Paddingbar + addpagingright,
            bottom: widgetProps.Paddingbar,
            left: widgetProps.Paddingbar + addpagingleft,
        };

        //tooltip

        var fontsizetooltipstring = widgetProps.StylebarTooltip.textSize;
        var backgroundcolortooltip =
            widgetProps.StylebarTooltip.backgroundColor;
        let textcolortooltip = widgetProps.StylebarTooltip.foregroundColor;
        let showTooltip = widgetProps.ShowTooltip;

        //x axis

        var colorlinechartx = widgetProps.StylebarXaxis.lineColor;
        var fontcolorlinechartx = widgetProps.StylebarXaxis.foregroundColor;

        // y0 axis
        var colorlinecharty0 = widgetProps.StylebarYLeftaxis.lineColor;
        let fontcolorlinecharty0 =
            widgetProps.StylebarYLeftaxis.foregroundColor;
        let booleantick = widgetProps.ShowGrid;

        var tickcounty = widgetProps.TickCount;

        // y1 axis
        var colorlinecharty1 = widgetProps.StylebarYRightaxis.lineColor;
        let fontcolorlinecharty1 =
            widgetProps.StylebarYRightaxis.foregroundColor;

        //legend
        let fontcolorlegend = widgetProps.StylebarLegend.foregroundColor;
        let fontsizelegend = widgetProps.StylebarLegend.textSize;
        let booleanleft = widgetProps.IsLeftLegend;

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
                datenew.getDate()  +
                "/" +
                (datenew.getMonth() < 10
                    ? "0" + (datenew.getMonth() +1)
                    : (datenew.getMonth() + 1)) +
                "/" +
                  datenew.getFullYear()
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

        var xAxis = d3.svg.axis().scale(x0).orient("bottom");
        // .tickSize(-height);;

        var yAxisLeft = d3.svg.axis().scale(y0).orient("left");

        // .tickFormat(function (d){
        //     return d3.format(".1f")(d);
        // })

        var yAxisRight = d3.svg.axis().scale(y1).orient("right");

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

        var arrayyaxis = [y0, y0 ,y1]; // if 3  //gantiini

        var lefty = "";
        var righty = "";
        valueslist.concat(valuelineslist).forEach((element, i) => {
            // if (i == 0 || i == valueslist.concat(valuelineslist).length - 1) {
            //     lefty += valueslist.concat(valuelineslist)[i] + ",";
            // } else {
            //     righty += valueslist.concat(valuelineslist)[i] + ",";
            // }

            if (i < 2) {
                lefty += valueslist.concat(valuelineslist)[i] + ",";
            } else {
                righty += valueslist.concat(valuelineslist)[i] + ",";
            }
        });

        // Ticks on x-axis and y-axis

        let ticksizecount = 5;
        let ticksizecountx = 5;
        if (booleantick) {
            ticksizecount = -width;
            ticksizecountx = -height;
        }

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis.tickSize(ticksizecountx))
            .selectAll("text")
            .attr("transform", "rotate(-15)")
            .attr("y", 15);
        // .selectAll(".path")
        // .attr("stroke", "#ffffff")
        svg.select(".x.axis")
            .selectAll("text")
            .style("fill", fontcolorlinechartx);
        svg.select(".x.axis")
            .selectAll("path")
            .style("fill", "none")
            .style("stroke", colorlinechartx)
            .style("shape-rendering", "crispEdges");
        svg.select(".x.axis")
            .selectAll("line")
            .style("fill", "none")
            .style("stroke", colorlinechartx)
            .style("shape-rendering", "crispEdges");

        svg.append("g")
            .attr("class", "y0 axis")
            .call(
                yAxisLeft
                    .ticks(tickcounty)
                    // .call(yAxisLeft.ticks(tickcounty, ".1f")
                    .tickSize(ticksizecount)
            )
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -40 - addpagingleft)
            .attr("x", function (d, i) {
                return -(height / 2 + (lefty.slice(0, -1).length * 6) / 2);
            }) //-(height / 2 + 60)

            // .style("fill", "#000")
            .text(lefty.slice(0, -1));

        svg.select(".y0.axis")
            .selectAll("path")
            .style("fill", "none")
            .style("stroke", colorlinecharty0)
            .style("shape-rendering", "crispEdges");
        svg.select(".y0.axis")
            .selectAll("line")
            .style("fill", "none")
            .style("stroke", colorlinecharty0)
            .style("shape-rendering", "crispEdges");
        svg.select(".y0.axis")
            .selectAll("text")
            .style("fill", fontcolorlinecharty0);
        // svg.select(".y0.axis").selectAll(".tick").style("fill", "#000");

        svg.append("g")
            .attr("class", "y1 axis")
            .attr("transform", "translate(" + width + ",0)")
            .call(yAxisRight.ticks(tickcounty))
            .append("text")
            .attr("transform", "rotate(90)")
            .attr("y", -40 - addpagingright)
            .attr("x", function (d, i) {
                return height / 2 - (righty.slice(0, -1).length * 6) / 2;
            }) //height / 2 - 30

            // .style("fill", colorlinechart)
            .text(righty.slice(0, -1));
        svg.select(".y1.axis")
            .selectAll("path")
            .style("fill", "none")
            .style("stroke", colorlinecharty1)
            .style("shape-rendering", "crispEdges");
        svg.select(".y1.axis")
            .selectAll("line")
            .style("fill", "none")
            .style("stroke", colorlinecharty1)
            .style("shape-rendering", "crispEdges");
        svg.select(".y1.axis")
            .selectAll("text")
            .style("fill", fontcolorlinecharty1);
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
                return y1(d.valueline[0].value);  //gantiini
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

                return y1(d.valueline[0].value);
                // }

                // return y(0);
            })
            .attr("r", 3)
            .on("mouseenter", function (d) {
                d3.select("#tooltipdoubley")
                    .style("left", d3.event.offsetX + "px")
                    .style("top", d3.event.offsetY + "px")

                    .style("opacity", function (d) {
                        if (showTooltip) {
                            return 1;
                        } else {
                            return 0;
                        }
                    })
                    .style("display", "block")
                    .style("font-size", convertFontSize(fontsizetooltipstring))
                    .style("background-color", backgroundcolortooltip)
                    .style("color", textcolortooltip)
                    // .style(
                    //     "line-height",
                    //     convertFontSize(fontsizetooltipstring)
                    // )
                    .select("#name")
                    .text(d.values[0].name + " :");

                d3.select("#tooltipdoubley")

                    .select("#value")
                    .text(d.values[0].value);

                d3.select("#tooltipdoubley")

                    .select("#name1")
                    .text(d.values[1].name + " :");

                d3.select("#tooltipdoubley")

                    .select("#value1")
                    .text(d.values[1].value);

                if (d.values[2]) {
                    d3.select("#tooltipdoubley")

                        .select("#name3")
                        .text(d.values[2].name + " :");

                    d3.select("#tooltipdoubley")

                        .select("#value3")
                        .text(d.values[2].value);
                }

                d3.select("#tooltipdoubley")
                    .select("#name2")
                    .text(d.valueline[0].name + " :");

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

        if (booleanleft) {
            legend
                .append("div")
                .attr("class", "legendtextdoubley")
                .style("color", fontcolorlegend)
                .style("font-size", convertFontSize(fontsizelegend))
                .text(function (d) {
                    return d.name;
                });
            legend
                .append("div")
                .attr("class", "legendboxdoubley")

                .style("background-color", function (d) {
                    return d.color;
                });
        } else {
            legend
                .append("div")
                .attr("class", "legendboxdoubley")

                .style("background-color", function (d) {
                    return d.color;
                });
            legend
                .append("div")
                .attr("class", "legendtextdoubley")
                .style("color", fontcolorlegend)
                .style("font-size", convertFontSize(fontsizelegend))
                .text(function (d) {
                    return d.name;
                });
        }
    };
};
