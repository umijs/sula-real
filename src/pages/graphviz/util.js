export const getSize = (elem) => {
  const style = window.getComputedStyle
    ? window.getComputedStyle(elem)
    : elem.style;

  const width = style && style.width;
  const height = style && style.height;

  return {
    width: parseInt(width, 10),
    height: parseInt(height, 10),
  };
}

export const handleResize = (container, graph) => {
  const { width, height } = getSize(container);
  graph.changeSize(width, height);
};
