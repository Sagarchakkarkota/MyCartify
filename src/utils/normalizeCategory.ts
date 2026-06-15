export const normalizeCategory = (cat: any) => {
  if (typeof cat === 'string') {
    const label = cat
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      slug: cat,
      name: label,
    };
  }

  return {
    slug: cat?.slug,
    name: cat?.name || cat?.slug,
  };
};
