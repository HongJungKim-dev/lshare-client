const tags = [
  { id: 1, content: 'ts' },
  { id: 2, content: 'js' },
  { id: 3, content: '프론트' },
].map(({ id, content }) => ({ id, content: `# ${content}` }));

export default tags;
