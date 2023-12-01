export interface Comic {
  index: number;
  title: string;
  altText: string;
  cardText: string;
  layout:
    | 'square' // 1280x1280
    | 'wide' // 1748x1181
    | 'tall'; // 1240x1754
  image: string;
  thumbnail: string;
  series?: string;
  state: 'draft' | 'published';

  //Synthetic attributes
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

export interface ResponseDTO {
  message: string;
  payload: any;
}

export interface ComicDTO {
  index: number;
  title: string;
  altText: string;
  cardText: string;
  layout:
    | 'square' // 1280x1280
    | 'wide' // 1748x1181
    | 'tall'; // 1240x1754
  image: string;
  thumbnail: string;
  series?: string;
  state: 'draft' | 'published';
}

export const initialComic: Comic = {
  state: 'published',
  title: '',
  altText: '',
  cardText: '',
  layout: 'square',
  image: '',
  thumbnail: '',
  index: 0,
  prevIndex: null,
  nextIndex: null,
};

export const notFoundComic: Comic = {
  state: 'published',
  title: 'Not Found',
  altText: `Saying there's no content to find while displaying content; A paradox.`,
  cardText: `Lorem Ipsum? I hardly knowum!`,
  layout: 'square',
  image: '',
  thumbnail: '',
  index: -1,
  prevIndex: null,
  nextIndex: null,
};
