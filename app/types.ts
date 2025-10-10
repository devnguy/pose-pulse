export type ImageSourceResponse<T> = {
  bookmark: string;
  items: Array<T>;
};

export type BoardItem = {
  id: string;
  board_pins_modified_at: string;
  name: string;
  media: {
    image_cover_url: string;
    pin_thumbnail_urls: Array<string>;
  };
  pin_count: number;
};
