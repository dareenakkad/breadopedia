// Level-1 taxonomy classes and the colour each owns. The class follows the bread everywhere as a small mark.
// Ids must match the level-1 ids in content/taxonomy.yaml.
export const CLASSES = [
  { id: 'flatbreads', name: 'Flatbreads', colour: 'tomato' },
  { id: 'hearth', name: 'Hearth and sourdough loaves', colour: 'saffron' },
  { id: 'enriched', name: 'Enriched and sweet breads', colour: 'rose' },
  { id: 'rolls', name: 'Rolls and buns', colour: 'tangerine' },
  { id: 'rye', name: 'Rye and dark breads', colour: 'plum' },
  { id: 'steamed', name: 'Steamed and fried breads', colour: 'jade' },
  { id: 'crisp', name: 'Crispbreads and crackers', colour: 'sky' },
] as const;

export type ClassId = (typeof CLASSES)[number]['id'];

/** The level-1 id of any taxonomy id: "flatbreads.leavened.khobz" → "flatbreads". */
export function classOf(taxonomyId: string): ClassId {
  return taxonomyId.split('.')[0] as ClassId;
}

export function classInfo(taxonomyId: string) {
  const id = classOf(taxonomyId);
  return CLASSES.find((c) => c.id === id) ?? { id, name: id, colour: 'slate' };
}
