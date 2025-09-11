import fetch from "node-fetch";
import { getCollegeById } from "./collegeService.js";

// Try multiple public sources to enrich Indian college data.
export async function enrichCollege(id) {
  const base = await getCollegeById(id);
  if (!base) {
    return null;
  }

  const queries = [];
  const name = base.name;
  const city = base.city || "";
  const state = base.state || "";

  // Hipolabs Universities API (India)
  // https://universities.hipolabs.com/search?country=India&name=NAME
  const hipolabsUrl = `https://universities.hipolabs.com/search?country=India&name=${encodeURIComponent(name)}`;
  queries.push(fetch(hipolabsUrl).then(r => r.json()).catch(() => null));

  // Wikipedia summary
  // https://en.wikipedia.org/api/rest_v1/page/summary/{title}
  const wikiTitle = encodeURIComponent(`${name} ${city} ${state}`.trim());
  const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`;
  queries.push(fetch(wikiUrl).then(r => r.ok ? r.json() : null).catch(() => null));

  const [hipolabs, wiki] = await Promise.all(queries);

  let website = null;
  if (Array.isArray(hipolabs) && hipolabs.length > 0) {
    // naive match on city/state if available
    const best = hipolabs.find(u => {
      const m1 = city && (u["state-province"]?.toLowerCase().includes(city.toLowerCase()) || u.name?.toLowerCase().includes(city.toLowerCase()));
      const m2 = state && (u["state-province"]?.toLowerCase().includes(state.toLowerCase()) || u.name?.toLowerCase().includes(state.toLowerCase()));
      return m1 || m2;
    }) || hipolabs[0];
    website = Array.isArray(best.web_pages) ? best.web_pages[0] : null;
  }

  const wikiSummary = wiki?.extract || null;
  const wikiThumbnail = wiki?.thumbnail?.source || null;

  return {
    id: base.id,
    name: base.name,
    city: base.city,
    state: base.state,
    website,
    wikiSummary,
    wikiThumbnail,
    sources: {
      hipolabs: Boolean(hipolabs && hipolabs.length),
      wikipedia: Boolean(wiki && wiki.title),
    }
  };
}


