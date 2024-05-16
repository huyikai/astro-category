import { getCollection } from 'astro:content';
// interface RenderableEntry {
//   render: () => Promise<{ Content: any }>;
//   data: any;
//   slug: string;
//   id: string;
// }
export const handlePaths = async () => {
  const allPosts = await getCollection('post');
  const allPaths = allPosts.map((post) => ({
    slug: post.slug,
    id: post.id
  }));
  const directoryPaths = new Set();
  allPaths.forEach((path) => {
    const partSlug = path.slug.split('/');
    const partId = path.id.split('/');
    let currentPath = '';
    for (let i = 0; i < partSlug.length; i++) {
      currentPath += partId[i].includes('.md')
        ? i === 0
          ? '/' + partSlug[i]
          : ''
        : '/' + partSlug[i];
      directoryPaths.add(currentPath);
    }
  });

  const uniqueDirectoryPaths = [...directoryPaths];

  return uniqueDirectoryPaths.map((dir: any) => {
    return {
      params: {
        category: dir
      },
      props: {
        subContent: allPosts.filter((post) => {
          const dirRelative = dir.replace(/^\//, '');
          const postDir = post.id.replace(/\/[^\/]*$/, '');
          return dirRelative.toLowerCase() === postDir.toLowerCase();
        }),
        subCategory: uniqueDirectoryPaths
          .filter((i: any) => {
            const postDir = i.replace(/\/[^\/]*$/, '');
            return dir === postDir;
          })
          .map((i: any) => ({
            name: i.split('/').pop(),
            path: i
          }))
      }
    };
  });
};
