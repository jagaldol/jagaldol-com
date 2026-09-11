import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    table: (props) => (
      <div className="max-w-full overflow-x-auto" role="region" aria-label="표 — 가로 스크롤" tabIndex={0}>
        <table {...props} />
      </div>
    ),
    ...components,
  }
}
