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

export const notFoundComic: Comic = {
  title: 'Not Found',
  altText: `Saying there's no content to find while displaying content; A paradox.`,
  path: 'not_found.png',
  index: -1,
};
