"use client";

import { useState } from "react";

export default function MediaGallery({ images, unitCode }) {
  const [active, setActive] = useState(0);

  if (!images?.length) {
    return (
      <div className="gallery-empty">
        <strong>NO VERIFIED PUBLIC MEDIA</strong>
        <span>โครงสร้างรองรับการเพิ่มภาพเมื่อผ่านการตรวจสอบแหล่งที่มาแล้ว</span>
      </div>
    );
  }

  return (
    <div className="gallery-shell">
      <div className="gallery-main">
        <img src={images[active].url} alt={images[active].alt || `${unitCode} preview`} />
        <span>{images[active].status === "verified" ? "PUBLIC UNIT MEDIA" : "REPRESENTATIVE MEDIA"}</span>
      </div>
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <button key={`${image.url}-${index}`} className={active === index ? "active" : ""} onClick={() => setActive(index)} type="button">
            <img src={image.url} alt="" />
          </button>
        ))}
      </div>
      <p className="media-caption">{images[active].caption}</p>
    </div>
  );
}
