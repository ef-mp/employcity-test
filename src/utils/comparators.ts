
type Comparator<T> = (a: T, b: T) =>  -1 | 0 | 1

export const stringComparator: Comparator<string> = (a, b) => {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;

  const upperCasedA = a.toUpperCase();
  const upperCasedB = b.toUpperCase();

  if (upperCasedA === upperCasedB) return 0;

  return upperCasedA > upperCasedB ? 1 : -1;
};

export const fieldComparatorFactory = <Obj, Key extends keyof Obj>(
  comparator: Comparator<Obj[Key]>,
  field: Key
) => (a: Obj, b: Obj) => comparator(a[field], b[field])

interface NameComparator {
  name: string
}

export const nameFieldComparator = fieldComparatorFactory<NameComparator, 'name'>(stringComparator, 'name')
