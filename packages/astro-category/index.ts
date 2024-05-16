// Do not write code directly here, instead use the `src` folder!
// Then, use this file to export everything you want your user to access.

import CategoryCatalog from './src/categoryCatalog.astro';
import CategoryItem from './src/categoryItem.astro';
import CategoryRoot from './src/categoryRoot.astro';
import { getStaticPathsHelper } from './utils/utils';

export { CategoryCatalog, CategoryRoot, CategoryItem, getStaticPathsHelper };
