// Where the main buttons point. If a form or donation page is set in
// site.json it is used; otherwise the buttons open a pre-filled email.
import { readFileSync } from "node:fs";

const site = JSON.parse(readFileSync(new URL("./site.json", import.meta.url), "utf8"));
const mail = (subject) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export default {
  join: site.joinFormUrl || mail(`Joining Team ${site.teamNumber}`),
  sponsor: site.donateUrl || mail(`Sponsoring Team ${site.teamNumber}`),
  ask: mail(`Question about Team ${site.teamNumber}`),
};
