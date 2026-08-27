import { cloneElement, useLayoutEffect, useRef, useState } from 'react';

const PAGE_HEIGHT = 842;

export default function PaginatedPreview({ children }) {
  const measureRef = useRef(null);
  const [pageGroups, setPageGroups] = useState(null);
  const childProps = children?.props || {};

  useLayoutEffect(() => {
    const measureRoot = measureRef.current;
    const inner = measureRoot?.querySelector('.preview-page-inner');
    if (!inner) return;

    const innerRect = inner.getBoundingClientRect();
    const header = inner.querySelector('.prev-header');
    const blocks = Array.from(inner.querySelectorAll('[data-preview-block]'));
    const nextGroups = [[]];
    let usedHeight = header ? header.getBoundingClientRect().bottom - innerRect.top : 28;

    blocks.forEach((block) => {
      const style = getComputedStyle(block);
      const blockHeight = block.getBoundingClientRect().height + parseFloat(style.marginBottom || '0');
      if (nextGroups[nextGroups.length - 1].length > 0 && usedHeight + blockHeight > PAGE_HEIGHT - 24) {
        nextGroups.push([]);
        usedHeight = 28;
      }
      nextGroups[nextGroups.length - 1].push(block.dataset.previewBlock);
      usedHeight += blockHeight;
    });

    const signature = JSON.stringify(nextGroups);
    setPageGroups((current) => JSON.stringify(current) === signature ? current : nextGroups);
  }, [childProps.data, childProps.accentColor, childProps.template]);

  const fullPreview = cloneElement(children, { pageSections: null, showHeader: true });
  const pages = pageGroups || [null];

  return (
    <div className="preview-paginated-root">
      <div ref={measureRef} className="preview-measure" aria-hidden="true">
        {fullPreview}
      </div>
      <div className="preview-paginated-pages">
        {pages.map((sectionIndexes, pageIndex) => (
          <div className="preview-pdf-page" key={pageIndex}>
            {sectionIndexes === null
              ? fullPreview
              : cloneElement(children, {
                pageSections: sectionIndexes,
                showHeader: pageIndex === 0,
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
