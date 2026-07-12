import {
  Waves,
  Shield,
  Crosshair,
  Search,
  BadgeCheck,
  Trees,
  Mountain,
  Snowflake,
  Plane,
  Building2,
  MapPin,
  Database,
  CircleAlert,
} from "lucide-react";

// Central semantic mission-tag configuration. Colors live in globals.css keyed
// by the `slug` (`.mtag--<slug>`); this module only maps a tag to its slug + icon.
// Unknown tags fall through to a safe neutral "default" style with no icon.
export const MISSION_TAGS = {
  "Maritime": { slug: "maritime", Icon: Waves },
  "Counter Terror": { slug: "counter-terror", Icon: Shield },
  "Direct Action": { slug: "direct-action", Icon: Crosshair },
  "Recon": { slug: "recon", Icon: Search },
  "Hostage Rescue": { slug: "hostage-rescue", Icon: BadgeCheck },
  "Jungle": { slug: "jungle", Icon: Trees },
  "Mountain": { slug: "mountain", Icon: Mountain },
  "Arctic": { slug: "arctic", Icon: Snowflake },
  "Airborne": { slug: "airborne", Icon: Plane },
  "Air Control": { slug: "airborne", Icon: Plane },
  "Urban": { slug: "urban", Icon: Building2 },
  "Desert": { slug: "desert", Icon: MapPin },
  "Intelligence": { slug: "intelligence", Icon: Database },
  "EOD": { slug: "eod", Icon: CircleAlert },
};

export function getMissionTag(tag) {
  return MISSION_TAGS[tag] || { slug: "default", Icon: null };
}
