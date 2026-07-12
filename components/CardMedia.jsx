"use client";

import { useState } from "react";
import Image from "next/image";
import MediaFallback from "./MediaFallback";
import { MEDIA_LABELS, pickMediaMode } from "@/lib/media";

export default function CardMedia({
  cover,
  emblem,
  code,
  priority = false,
  sizes = "(max-width: 620px) 100vw, (max-width: 880px) 50vw, 33vw",
  statusBadge = true,
}) {
  const [coverFailed, setCoverFailed] = useState(false);
  const [emblemFailed, setEmblemFailed] = useState(false);

  const mode = pickMediaMode({ cover, emblem, coverFailed, emblemFailed });
  const label = MEDIA_LABELS[mode];
  const isPhoto = mode === "verified" || mode === "editorial" || mode === "representative";

  return (
    <div className="card-media-frame">
      {isPhoto ? (
        <Image
          className="card-media-img"
          src={cover.src}
          alt={cover.alt || `${code} imagery`}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setCoverFailed(true)}
        />
      ) : (
        <MediaFallback
          mode={mode}
          code={code}
          emblem={mode === "official-emblem" ? emblem : null}
          onEmblemError={() => setEmblemFailed(true)}
        />
      )}

      <span className="card-media-shade" aria-hidden="true" />

      {statusBadge ? <span className={`media-state media-state--${mode}`}>{label}</span> : null}
    </div>
  );
}
