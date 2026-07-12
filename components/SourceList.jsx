import { normalizeSources, isValidHttpUrl, SOURCE_TYPE_LABELS } from "@/lib/editorial";

export default function SourceList({ sources }) {
  const items = normalizeSources(sources);

  if (!items.length) {
    return (
      <div className="source-empty">
        <strong>Research pending</strong>
        <span>ยังอยู่ระหว่างรวบรวมแหล่งอ้างอิงสาธารณะสำหรับโปรไฟล์นี้</span>
      </div>
    );
  }

  return (
    <div className="source-list">
      {items.map((source, index) => {
        const clickable = isValidHttpUrl(source.url);
        return (
          <article key={`${source.title}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div className="source-list__body">
              <h3>{source.title || "Untitled source"}</h3>
              {(source.publisher || source.type) && (
                <div className="source-list__meta">
                  {source.publisher ? <span>{source.publisher}</span> : null}
                  {source.type ? <span className="source-type">{SOURCE_TYPE_LABELS[source.type] || source.type}</span> : null}
                </div>
              )}
              {source.notes ? <p>{source.notes}</p> : null}
              {source.supports.length ? (
                <div className="source-supports">
                  {source.supports.map((support) => <span key={support}>{support}</span>)}
                </div>
              ) : null}
            </div>
            {clickable ? (
              <a href={source.url} target="_blank" rel="noopener noreferrer">OPEN ↗</a>
            ) : (
              <b>RESEARCH PENDING</b>
            )}
          </article>
        );
      })}
    </div>
  );
}
