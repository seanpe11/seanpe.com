/**
 * Pull one qualifying pole lap into src/data/lap.json for the track-map replay:
 * positions and speed from OpenF1, the circuit centreline and corner numbers
 * from MultiViewer. No API keys needed.
 *
 *   node scripts/fetch-lap.mjs [session_key]   (default: 2025 Austin qualifying)
 */
import { writeFileSync } from "node:fs";

const SESSION = process.argv[2] ?? "9884";
const API = "https://api.openf1.org/v1";
const OUT = new URL("../src/data/lap.json", import.meta.url);
const get = async (url) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url}: ${r.status}`);
  return r.json();
};
const f1 = (path) => get(`${API}/${path}`);

const [session] = await f1(`sessions?session_key=${SESSION}`);
const laps = (await f1(`laps?session_key=${SESSION}`)).filter((l) => l.lap_duration && !l.is_pit_out_lap);
const pole = laps.reduce((a, b) => (b.lap_duration < a.lap_duration ? b : a));
const [driver] = await f1(`drivers?session_key=${SESSION}&driver_number=${pole.driver_number}`);

const start = new Date(pole.date_start);
const end = new Date(start.getTime() + pole.lap_duration * 1000);
const pad = 1500; // ms either side so the loop closes cleanly
const window = `&date>=${new Date(start.getTime() - pad).toISOString()}&date<=${new Date(end.getTime() + pad).toISOString()}`;
const rel = (iso) => (new Date(iso).getTime() - start.getTime()) / 1000;
const inLap = (t) => t >= 0 && t <= pole.lap_duration;

const loc = await f1(`location?session_key=${SESSION}&driver_number=${pole.driver_number}${window}`);
const points = loc
  .map((p) => [p.x, p.y, rel(p.date)])
  .filter((p) => inLap(p[2]))
  .sort((a, b) => a[2] - b[2]);

const car = await f1(`car_data?session_key=${SESSION}&driver_number=${pole.driver_number}${window}`);
const speed = car
  .map((c) => [Math.round(rel(c.date) * 1000) / 1000, c.speed])
  .filter((s) => inLap(s[0]) && typeof s[1] === "number")
  .sort((a, b) => a[0] - b[0]);

// Circuit centreline + corner numbers (same coordinate frame as the F1 position feed).
let track = null;
let corners = [];
try {
  const circuit = await get(`https://api.multiviewer.app/api/v1/circuits/${session.circuit_key}/${session.year}`);
  track = circuit.x.map((x, i) => [x, circuit.y[i]]);
  corners = circuit.corners.map((c) => ({
    n: c.number,
    x: c.trackPosition.x,
    y: c.trackPosition.y,
    angle: c.angle,
  }));
} catch (e) {
  console.warn(`no MultiViewer circuit data (${e.message}); the lap trace will stand in for the track`);
}

const m = Math.floor(pole.lap_duration / 60);
const s = (pole.lap_duration % 60).toFixed(3).padStart(6, "0");
const out = {
  circuit: session.circuit_short_name,
  location: session.location,
  country: session.country_name,
  year: session.year,
  session: session.session_name,
  driver: driver.name_acronym,
  driverName: driver.full_name,
  team: driver.team_name,
  teamColour: driver.team_colour ? `#${driver.team_colour}` : "#33ccff",
  lapTime: `${m}:${s}`,
  lapSeconds: pole.lap_duration,
  points,
  speed,
  track,
  corners,
};
writeFileSync(OUT, JSON.stringify(out) + "\n");
console.log(
  `${out.circuit} ${out.year} ${out.session}: ${out.driver} ${out.lapTime}, ${points.length} positions, ${speed.length} speed samples, track ${track ? track.length : 0} pts, ${corners.length} corners`,
);
