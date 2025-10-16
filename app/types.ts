export type ImageSourceResponse<T> = {
  bookmark: string;
  items: Array<T>;
};

export type BoardItem = {
  id: string;
  board_pins_modified_at: string;
  name: string;
  media: {
    image_cover_url: string | null;
    pin_thumbnail_urls: Array<string>;
  };
  pin_count: number;
};

export type Pin = {
  id: string;
  media: {
    images: {
      [key: string]: {
        width?: number;
        height?: number;
        url: string;
      };
    };
  };
};
