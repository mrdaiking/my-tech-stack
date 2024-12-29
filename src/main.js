document.addEventListener('DOMContentLoaded', function () {
  const roadmapItems = [
    {
      title: 'HTML',
      status: 'completed',
      children: [
        {
          title: 'HTML5',
          status: 'completed',
          children: [
            { title: 'Semantic HTML', status: 'completed' },
            { title: 'Forms', status: 'completed' },
            { title: 'Forms', status: 'completed' },
            {
              title: 'Forms',
              status: 'completed',
              children: [
                { title: 'Semantic HTML', status: 'completed' },
                { title: 'Forms', status: 'completed' },
                { title: 'Forms', status: 'completed' },
                { title: 'Forms', status: 'completed' },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'CSS',
      status: 'completed',
      children: [
        { title: 'Semantic HTML', status: 'completed' },
        { title: 'Forms', status: 'completed' },
      ],
    },
    // Add more items as needed
  ]

  const width = screen.width - 300
  const height = screen.height - 300

  const svg = d3
    .select('#roadmap-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const root = d3
    .hierarchy({ title: 'Tech Stack', children: roadmapItems })
    .sum(() => 1)

  const treeLayout = d3.tree().size([height, width - 300])
  treeLayout(root)

  svg
    .selectAll('line')
    .data(root.links())
    .enter()
    .append('line')
    .attr('x1', (d) => d.source.y)
    .attr('y1', (d) => d.source.x)
    .attr('x2', (d) => d.target.y)
    .attr('y2', (d) => d.target.x)
    .attr('stroke', 'black')

  const container = d3
    .select('#roadmap-container')
    .style('position', 'relative')
    .style('width', `${width}px`)
    .style('height', `${height}px`)

  container
    .selectAll('div')
    .data(root.descendants())
    .enter()
    .append('div')
    .style('position', 'absolute')
    .style('left', (d) => `${d.y}px`)
    .style('top', (d) => `${d.x}px`)
    .style('padding', '5px 10px')
    .style('border', '1px solid black')
    .style('border-radius', '5px')
    .style('background', (d) => {
      if (d.data.status === 'completed') {
        return 'green'
      } else if (d.data.status === 'in-progress') {
        return 'orange'
      } else {
        return 'gray'
      }
    })
    .style('color', 'white')
    .text((d) => d.data.title)
})
