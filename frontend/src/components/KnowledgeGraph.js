import { graphNodes, graphEdges } from '../data.js';
import { actions } from '../hooks/useGurukul.js';

const typeColors = { text: '#7B68EE', scholar: '#3A9B8C', domain: '#EF9F27', practice: '#D85A30' };
const typeLabels = { text: '📚 Texts', scholar: '🧑🏫 Scholars', domain: '🏛️ Domains', practice: '🧘 Practices' };

export function renderKnowledgeGraphPage(container) {
  let selectedNode = null;
  let searchTerm = '';
  let filterType = 'all';

  container.innerHTML = `
    <div class="screen-header">
      <button class="btn btn-ghost" id="kg-back-btn">← Back</button>
      <span class="screen-header-title">Knowledge Graph Explorer</span>
    </div>
    <div class="flex" style="height: calc(100vh - 4rem); background: var(--bg); color: var(--text); display: flex;">
      <div class="flex-1 flex flex-col" style="flex: 1; display: flex; flex-direction: column;">
        <div class="px-5 pt-5 pb-3" style="border-bottom: 1px solid var(--gold-border); padding: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
            <div>
              <h2 style="font-family: 'Cinzel', serif; color: var(--gold); text-shadow: 0 0 30px rgba(212,175,55,0.15); font-size: 24px; margin: 0;">Knowledge Graph Explorer</h2>
              <p style="color: var(--text-dim); letter-spacing: 0.5px; font-size: 14px; margin: 4px 0 0 0;">Interactive map of India's knowledge traditions</p>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <input id="kg-search" placeholder="🔍 Search nodes…"
                style="border-radius: 12px; padding: 8px 16px; font-size: 14px; outline: none; width: 200px; background: var(--surface); border: 1px solid var(--gold-border); color: var(--text); font-family: 'Lato', sans-serif;" />
              <select id="kg-filter"
                style="border-radius: 12px; padding: 8px 12px; font-size: 14px; outline: none; cursor: pointer; background: var(--surface); border: 1px solid var(--gold-border); color: var(--text); font-family: 'Lato', sans-serif;">
                <option value="all">All Types</option>
                <option value="text">Texts</option>
                <option value="scholar"> Scholars</option>
                <option value="domain"> Domains</option>
                <option value="practice">Practices</option>
              </select>
            </div>
          </div>
          <div style="display: flex; gap: 20px; margin-top: 16px;">
          </div>
        </div>

        <div id="kg-container" style="flex: 1; position: relative; overflow: hidden; background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.03) 0%, var(--bg) 70%);">
          <svg id="kg-svg" style="width: 100%; height: 100%;"></svg>
        </div>
      </div>

      <div id="kg-sidepanel" style="width: 320px; border-left: 1px solid var(--gold-border); background: var(--surface); flex-shrink: 0; overflow-y: auto; display: none; padding: 24px;">
        <!-- Filled dynamically -->
      </div>
    </div>
  `;

  const svgEl = container.querySelector('#kg-svg');
  const containerEl = container.querySelector('#kg-container');
  const sidePanelEl = container.querySelector('#kg-sidepanel');
  const searchEl = container.querySelector('#kg-search');
  const filterEl = container.querySelector('#kg-filter');

  let updateHighlight = null;

  searchEl.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    if (updateHighlight) updateHighlight(searchTerm, filterType);
  });

  filterEl.addEventListener('change', (e) => {
    filterType = e.target.value;
    if (updateHighlight) updateHighlight(searchTerm, filterType);
  });

  function renderSidePanel(node) {
    if (!node) {
      sidePanelEl.style.display = 'none';
      return;
    }
    sidePanelEl.style.display = 'block';

    sidePanelEl.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div style="padding: 4px 12px; border-radius: 8px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; font-family: 'Cinzel', serif; background: ${typeColors[node.type]}18; color: ${typeColors[node.type]};">
          ${node.type}
        </div>
        <button id="kg-close-btn" style="font-size: 24px; color: var(--text-dim); background: none; border: none; cursor: pointer;">&times;</button>
      </div>

      <h3 style="font-family: 'Cinzel', serif; color: var(--gold); text-shadow: 0 0 20px rgba(212,175,55,0.15); font-size: 24px; font-weight: bold; margin-bottom: 20px;">${node.label}</h3>

      <div style="font-size: 14px; display: flex; flex-direction: column; gap: 20px;">
        ${[
        ['Description', node.description],
        ['Time Period', node.period],
        ['Key Contributions', node.contributions],
      ].map(([label, value]) => `
          <div>
            <label style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; display: block; margin-bottom: 6px; color: var(--text-dim); font-family: 'Cinzel', serif;">${label}</label>
            <p style="color: var(--text-muted); line-height: 1.7; margin: 0;">${value}</p>
          </div>
        `).join('')}
      </div>

      <div class="gold-divider" style="margin: 24px 0;"></div>

      <button id="kg-ask-ai" style="width: 100%; padding: 14px; border-radius: 12px; font-weight: bold; font-size: 14px; cursor: pointer; transition: all 0.2s; background: linear-gradient(135deg, var(--gold-dim), var(--gold)); color: #0D0B08; border: none; font-family: 'Cinzel', serif; letter-spacing: 0.5px;">
        Ask AI about this ↗
      </button>
    `;

    sidePanelEl.querySelector('#kg-close-btn').addEventListener('click', () => {
      renderSidePanel(null);
    });

    sidePanelEl.querySelector('#kg-ask-ai').addEventListener('click', () => {
      // Set the context and go straight to persona selection
      const msg = `Tell me about ${node.label} in Indian Knowledge Systems. What is its significance, history, and relevance today?`;
      actions.setProblem(msg);
      actions.setFromKnowledgeGraph(true);
      actions.goTo('persona');
    });
  }

  container.querySelector('#kg-back-btn').addEventListener('click', () => {
    renderSidePanel(null);
    actions.goTo('landing');
  });

  if (!window.d3) {
    const script = document.createElement('script');
    script.src = 'https://d3js.org/d3.v7.min.js';
    script.onload = () => initGraph();
    document.head.appendChild(script);
  } else {
    initGraph();
  }

  function initGraph() {
    const width = containerEl.clientWidth || 800;
    const height = containerEl.clientHeight || 600;

    const svg = d3.select(svgEl)
      .attr('viewBox', [0, 0, width, height]);

    svg.selectAll('*').remove();
    const g = svg.append('g');
    svg.call(d3.zoom().scaleExtent([0.3, 4]).on('zoom', (e) => g.attr('transform', e.transform)));

    const nodes = graphNodes.map(d => ({ ...d }));
    const links = graphEdges.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    const link = g.append('g').selectAll('line').data(links).join('line')
      .attr('stroke', 'rgba(212,175,55,0.18)').attr('stroke-width', 1.5);

    const linkLabel = g.append('g').selectAll('text').data(links).join('text')
      .text(d => d.label).attr('font-size', 10).attr('fill', 'rgba(154,144,120,0.6)')
      .attr('text-anchor', 'middle').attr('font-family', 'Lato');

    const defs = svg.append('defs');
    Object.entries(typeColors).forEach(([type, color]) => {
      const filter = defs.append('filter').attr('id', `glow-${type}`);
      filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'blur');
      filter.append('feMerge').selectAll('feMergeNode').data(['blur', 'SourceGraphic']).join('feMergeNode').attr('in', d => d);
    });

    const node = g.append('g').selectAll('g').data(nodes).join('g').style('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
        .on('drag', (e, d) => { d.fx = e.x; d.fy = e.y; })
        .on('end', (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; })
      );

    node.append('circle')
      .attr('r', d => d.type === 'domain' ? 24 : d.type === 'scholar' ? 19 : 17)
      .attr('fill', d => typeColors[d.type] + '22')
      .attr('stroke', d => typeColors[d.type])
      .attr('stroke-width', 2)
      .attr('filter', d => `url(#glow-${d.type})`);

    node.append('text')
      .text(d => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', d => (d.type === 'domain' ? 38 : 33))
      .attr('font-size', 12).attr('font-family', 'Cinzel').attr('fill', 'var(--text)').attr('font-weight', 600)
      .style('text-shadow', '0 2px 4px rgba(0,0,0,0.8)');

    node.on('click', (e, d) => {
      selectedNode = d;
      renderSidePanel(d);
    });

    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      linkLabel.attr('x', d => (d.source.x + d.target.x) / 2).attr('y', d => (d.source.y + d.target.y) / 2);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    updateHighlight = (term, typeMatch) => {
      const q = term.toLowerCase();
      node.each(function (d) {
        const el = d3.select(this);
        const match = !q || d.label.toLowerCase().includes(q) || d.description.toLowerCase().includes(q);
        const tm = typeMatch === 'all' || d.type === typeMatch;
        const visible = match && tm;
        el.select('circle').attr('opacity', visible ? 1 : 0.1).attr('stroke-width', visible && q ? 4 : 2);
        el.select('text').attr('opacity', visible ? 1 : 0.1);
      });
      link.attr('opacity', (d) => {
        const sMatch = (!q || d.source.label.toLowerCase().includes(q)) && (typeMatch === 'all' || d.source.type === typeMatch);
        const tMatch = (!q || d.target.label.toLowerCase().includes(q)) && (typeMatch === 'all' || d.target.type === typeMatch);
        return (sMatch && tMatch) ? 1 : 0.1;
      });
      linkLabel.attr('opacity', (d) => {
        const sMatch = (!q || d.source.label.toLowerCase().includes(q)) && (typeMatch === 'all' || d.source.type === typeMatch);
        const tMatch = (!q || d.target.label.toLowerCase().includes(q)) && (typeMatch === 'all' || d.target.type === typeMatch);
        return (sMatch && tMatch) ? 1 : 0.1;
      });
    };
  }
}
