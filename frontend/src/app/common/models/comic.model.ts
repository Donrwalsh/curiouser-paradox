export interface Comic {
  state: 'draft' | 'published';
  title: string;
  series?: string;
  altText: string;
  layout:
    | 'square' // 1280x1280
    | 'wide' // 1748x1181
    | 'tall'; // 1240x1754
  path: string;
  index: number;
  prevIndex: number | null;
  nextIndex: number | null;
}

// maybe?
export interface ComicNav {
  prevIndex: number | null;
  nextIndex: number | null;
  prevSeriesIndex: number | null;
  nextSeriesIndex: number | null;
}

export interface ComicDTO {
  message: string;
  payload: any;
}

export const initialComic: Comic = {
  state: 'published',
  title: '',
  altText: '',
  layout: 'square',
  path: '',
  index: 0,
  prevIndex: null,
  nextIndex: null,
};

export const notFoundComic: Comic = {
  state: 'published',
  title: 'Not Found',
  altText: `Saying there's no content to find while displaying content; A paradox.`,
  layout: 'square',
  path: 'not_found.png',
  index: -1,
  prevIndex: null,
  nextIndex: null,
};
