export interface Comic {
  title: string;
  altText: string;
  path: string;
  index: number;
}

export const initialComic: Comic = {
  title: '',
  altText: '',
  path: '',
  index: 0,
};
