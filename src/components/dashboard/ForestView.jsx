
const React = require('react')
import { Link } from 'react-router'
require('./../../utils/Constants')
import { Progress } from 'semantic-ui-react'

const d3ForceDirected = function(el, graph, options) {
  var svg = d3.select(el).append('svg'),
    width = + options.width,
    height = + options.height;

  var color = d3.scaleOrdinal(d3.schemeCategory20);

  var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().distance(170).strength(1.5))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

  var nodes = graph.nodes,
      nodeById = d3.map(nodes, function(d) { return d.id; }),
      links = graph.links,
      bilinks = [];

  links.forEach(function(link) {
    var s = link.source = nodeById.get(link.source),
        t = link.target = nodeById.get(link.target),
        i = {}; // intermediate node
    nodes.push(i);
    links.push({source: s, target: i}, {source: i, target: t});
    bilinks.push([s, i, t]);
  });

  var link = svg.selectAll(".link")
    .data(bilinks)
    .enter().append("path")
      .attr("id", function(d,i) { return 'linkpath'+i })
      .attr("class", "link");

  var linklabels = svg.selectAll(".linklabel")
         .data(bilinks)
         .enter()
         .append('text')
         .style("pointer-events", "none")
         .attr('class', 'linklabel')
         .attr('id', function(d,i){return 'linklabel'+i})
         .attr('dx', 0)
         .attr('dy', 0)
/*
  linklabels.append('textPath')
      .attr('xlink:href',function(d,i) {return '#linkpath'+i})
      .style("pointer-events", "none")
      .attr('startOffset', "50%")
      .text(function(d,i){return 'label '+i});*/

  var node = svg.selectAll(".node")
    .data(nodes.filter(function(d) { return d.id; }))
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 8)
      .attr("fill", function(d) { return color(d.market); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  var nodelabels = svg.selectAll(".nodelabel")
    .data(nodes.filter(function(d) { return d.id; }))
    .enter()
    .append("text")
    .text(function(d){return d.name;})
    .attr("x", function(d){return d.x;})
    .attr("y", function(d){return d.y;})
    .attr("dy", -15)
    .attr("dx", 0)
    .attr("class", "nodelabel")

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(links);

  function ticked() {
    link.attr("d", positionLink);
    node.attr("transform", positionNode);
    nodelabels.attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });
      /*
    linklabels.attr("x", function(d) { return d[0].x; })
      .attr("y", function(d) { return d[0].y; });

    linklabels.attr('transform',function(d,i){
      if (d.target.x<d.source.x){
        let bbox = this.getBBox();
        let rx = bbox.x+bbox.width/2;
        let ry = bbox.y+bbox.height/2;
        return 'rotate(180 '+rx+' '+ry+')';
      } else {
        return 'rotate(0)';
      }
    });*/
  }

  function positionLink(d) {
    return "M" + d[0].x + "," + d[0].y
         + "S" + d[1].x + "," + d[1].y
         + " " + d[2].x + "," + d[2].y;
  }

  function positionNode(d) {
    return "translate(" + d.x + "," + d.y + ")";
  }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x, d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x, d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null, d.fy = null;
  }

  return [svg, simulation, nodes, links]
}

function renderForEl(el) {
    return d3ForceDirected(el, window.FOREST_GRAPH, {
      width: el.clientWidth,
      height: el.clientHeight
    })
}

export default class ForestView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    console.log('DID MOUNT')
    this.simulation = renderForEl(this.visualization)
  }
  componentWillUnmount() {
    this.simulation[0].remove()
    this.simulation[1].stop()
    this.simulation[1].nodes([])
    this.simulation[1].force("link")
        .links([]);
    //d3.selectAll("svg > *").remove();
  }
  componentWillReceiveProps(props) {
    this.visualization = null
    this.setState({clear: true})
  }
  componentDidUpdate() {

  }
  render () {
    return (
      <div className='forest-view'>
        { this.state.clear ? (
          <p></p>
        ) : (
          <div className='visualization' ref={r => this.visualization = r}></div>
        ) }
      </div>
    )
  }
}
