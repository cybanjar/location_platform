export const mapOU = (items, prefix, name) =>
  items
    ? items.map((item) => ({
        label: `${item[prefix]} - ${item[name]}`,
        value: item[prefix],
      }))
    : [];