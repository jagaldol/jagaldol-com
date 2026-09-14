declare module "*.mdx" {
  export const metadata: Omit<import("@/containers/project/ProjectConatiner").ProjectMetadata, "slug">
}
