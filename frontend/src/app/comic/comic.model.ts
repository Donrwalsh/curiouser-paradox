export interface Comic {
  title: string;
  altText: string;
  layout: 'square' | 'wide' | 'tall';
  path: string;
  index: number;
  prevIndex: number | null;
  nextIndex: number | null;
}

export interface ComicDTO {
  message: string;
  specificComic: Comic;
}

export const initialComic: Comic = {
  title: '',
  altText: '',
  layout: 'square',
  path: '',
  index: 0,
  prevIndex: null,
  nextIndex: null,
};

export const notFoundComic: Comic = {
  title: 'Not Found',
  altText: `Saying there's no content to find while displaying content; A paradox.`,
  layout: 'square',
  path: 'not_found.png',
  index: -1,
  prevIndex: null,
  nextIndex: null,
};
