import { getCollection } from 'astro:content';
interface RenderableEntry {
  render: () => Promise<{ Content: any }>;
  data: any;
  slug: string;
  id: string;
}
export const categoryHelper =
  ({ collection }: { collection?: string }) =>
  async () => {
    const allPosts: RenderableEntry[] = await getCollection(collection);
    const directoryPaths = new Set<string>();

    allPosts.forEach((post) => {
      const parts = post.slug.split('/');
      let currentPath = '';
      parts.forEach((part, index) => {
        if (!post.id.split('/')[index].includes('.md')) {
          currentPath += '/' + part;
          directoryPaths.add(currentPath);
        }
      });
    });

    const uniqueDirectoryPaths = [...directoryPaths];

    return uniqueDirectoryPaths.map((dir) => {
      const filteredPosts = allPosts.filter((post) => {
        const postDir = post.id.replace(/\/[^\/]*$/, '');
        return dir.replace(/^\//, '').toLowerCase() === postDir.toLowerCase();
      });

      const subCategories = uniqueDirectoryPaths
        .filter((i) => {
          const postDir = i.replace(/\/[^\/]*$/, '');
          return dir === postDir;
        })
        .map((i) => ({
          name: i.split('/').pop(),
          path: i
        }));

      return {
        params: { category: dir },
        props: {
          category: {
            dir: dir,
            subContent: filteredPosts,
            subCategory: subCategories
          }
        }
      };
    });
  };
