import { getMissionTag } from "./missionTags";

export default function MissionTag({ tag, showIcon = true }) {
  const { slug, Icon } = getMissionTag(tag);
  return (
    <span className={`mtag mtag--${slug}`} title={`Mission focus: ${tag}`}>
      {showIcon && Icon ? <Icon className="mtag__icon" size={12} strokeWidth={2.2} aria-hidden="true" /> : null}
      <span className="mtag__label">{tag}</span>
    </span>
  );
}
