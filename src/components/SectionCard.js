import React from 'react';

const SectionCard = ({ title, children, variant = 'background' }) => {
  const rootClassName = variant === 'projects' ? 'toggle-section-pro' : 'toggle-section';
  const contentClassName = variant === 'projects' ? 'toggle-content-pro' : 'toggle-content';
  const TitleTag = variant === 'projects' ? 'h3' : 'h2';

  return (
    <div className={rootClassName}>
      {title ? <TitleTag>{title}</TitleTag> : null}
      <div className={contentClassName}>{children}</div>
    </div>
  );
};

export default SectionCard;
