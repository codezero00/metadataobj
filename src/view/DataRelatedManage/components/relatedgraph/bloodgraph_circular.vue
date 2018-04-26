<template>
  <div :class="className" :id="id" style="width:100%;height:800px"></div>
</template>

<script>
export default {
  props: {
    className: {
        type: String,
        default: "chart"
    },
    id: {
        type: String,
        default: "chartbloodgraphcircular"
    },
    width: {
        type: String,
        default: "200px"
    },
    height: {
        type: String,
        default: "200px"
    }
  },
  data() {
    return {
        // GraphData:null
    };
  },
  mounted() {
        this.GetGraphData();
  },
  methods: {
    async GetGraphData(){
      debugger;
      const gdata= await this.$Data.BloodVertexEdge()
      this.initChart(gdata);
    //   this.GraphData= gdata
    },
    initChart(graphdata) {
        let mychart = this.$echarts.init(document.getElementById(this.id));
        const vertex = []
        const edge = []
        this.vertex = graphdata.vertex
        this.edge = graphdata.edge

        let option ={
            title: {
                text: '数据血缘图谱'
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    layout: 'circular',
                    circular: {
                        rotateLabel: true
                    },
                    progressiveThreshold: 700,
                    data: this.vertex.map(function (vertex) {
                        return {
                            // x: vertex.x,
                            // y: vertex.y,
                            id: vertex.ID,
                            name: vertex.NAME,
                            label: {
                                normal: {
                                    //show: vertex.TYPE == "table",
                                    show:true,
                                    position: 'right',
                                },
                                emphasis: {
                                    position: 'right',
                                    show: true
                                }
                            },
                            symbolSize: vertex.SIZE,
                            itemStyle: {
                                normal: {
                                    color: vertex.COLOR
                                }
                            }
                        };
                    }),
                    edges: this.edge.map(function (edge) {
                        return {
                            source: edge.SRCID,
                            target: edge.DSTID
                        };
                    }),
                    // label: {
                    //     emphasis: {
                    //         position: 'right',
                    //         show: true
                    //     }
                    // },
                    roam: true,
                    focusNodeAdjacency: true,
                    // lineStyle: {
                    //     normal: {
                    //         width: 0.5,
                    //         curveness: 0.3,
                    //         opacity: 0.7
                    //     }
                    // },
                    lineStyle: {
                        normal: {
                            color: 'source',
                            curveness: 0.3
                        }
                    },
                    force: {
                        edgeLength: 5,
                        repulsion: 20,
                        gravity: 0.2
                    },
                    draggable:true
                }
            ]
        };

        mychart.setOption(option);
    }
  }
};
</script>
