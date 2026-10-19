import { ArrowUpRight, Database, FileSpreadsheet, Layers3, MapPin, Search } from 'lucide-react';

const capabilities = [
  {
    icon: FileSpreadsheet,
    title: 'Parse locally',
    text: 'Papa Parse reads CSV files and read-excel-file reads XLSX workbooks in the browser.',
  },
  {
    icon: Database,
    title: 'Map columns',
    text: 'Match spreadsheet headers to coordinates or place names, values, categories, and years.',
  },
  {
    icon: Search,
    title: 'Resolve carefully',
    text: 'Search one unresolved place at a time. A result is mapped only after the user confirms it.',
  },
  {
    icon: Layers3,
    title: 'Explore geographically',
    text: 'Leaflet renders markers and weighted heatmaps with category and year filters.',
  },
];

const technologies = ['React', 'TypeScript', 'Vite', 'Leaflet', 'Papa Parse', 'read-excel-file'];

export default function GeoHeatProject() {
  return (
    <section id="geoheat" className="geoheat-section" aria-labelledby="geoheat-title">
      <div className="wrap">
        <div className="geoheat-section-label">
          <span>SECONDARY PROJECT / 02</span>
          <span>GEOSPATIAL DATA VISUALIZATION</span>
        </div>
        <article className="geoheat-card">
          <div className="geoheat-copy">
            <div className="geoheat-kicker">
              <span className="status-dot" /> BROWSER-BASED DATA TOOL - MVP
            </div>
            <h2 id="geoheat-title">
              GeoHeat <em>Studio</em>
            </h2>
            <p className="geoheat-lead">
              A reusable mapping workspace for turning CSV and Excel data into geographic views.
            </p>
            <div className="geoheat-tags">
              {technologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
            <div className="geoheat-links">\n              <a href="https://geoheat-studio-production.up.railway.app/" target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={14} aria-hidden="true" /></a>
              <a
                href="https://github.com/Ronkl14/geoheat-studio"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub source <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
            <div className="geoheat-origin">
              <span>HOW IT STARTED</span>
              <p>
                It began as a way to visualize geographic rabies research data for a friend's academic
                thesis. I generalized the workflow into a reusable tool and use synthetic records in
                the public demo.
              </p>
            </div>
            <div className="geoheat-capabilities">
              {capabilities.map(({ icon: Icon, title, text }) => (
                <div className="geoheat-capability" key={title}>
                  <Icon size={17} aria-hidden="true" />
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <figure className="geoheat-preview">
            <img
              src={`${import.meta.env.BASE_URL}geoheat-studio-preview.png`}
              alt="GeoHeat Studio displaying a synthetic European dataset as map markers and a heatmap"
              loading="lazy"
            />
            <figcaption>
              <MapPin size={13} /> Synthetic sample data - all processing stays in the browser
            </figcaption>
          </figure>
        </article>
        <p className="geoheat-note">
          Place lookup uses manual, user-confirmed searches. The demo contains no thesis observations
          or private research data.
        </p>
      </div>
    </section>
  );
}
