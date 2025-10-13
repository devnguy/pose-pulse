import { BoardItem, ImageSourceResponse, Pin } from "@/app/types";

export const fakeBoardsData: ImageSourceResponse<BoardItem> = {
  bookmark: "",
  items: [
    {
      id: "1",
      board_pins_modified_at: "2024-01-02",
      name: "still life",
      media: {
        image_cover_url:
          "https://i.pinimg.com/1200x/de/ef/f1/deeff1b9cc123bf3ccc3cf096cb0de12.jpg",
        pin_thumbnail_urls: [
          "https://i.pinimg.com/736x/a3/12/d1/a312d1b0fb76b4bc9948aa6c7c99dc7c.jpg",
          "https://i.pinimg.com/1200x/9b/9b/a3/9b9ba3d83952429b2452b25b737c708d.jpg",
          "https://i.pinimg.com/736x/13/9c/56/139c56d914ee579b51d4c8136011f9ef.jpg",
          "https://i.pinimg.com/1200x/ba/f0/b2/baf0b24ffb13886038fb4cd68d0d9420.jpg",
        ],
      },
      pin_count: 7,
    },
    {
      id: "2",
      board_pins_modified_at: "2025-07-12",
      name: "sculture",
      media: {
        image_cover_url:
          "https://i.pinimg.com/736x/88/f7/52/88f75295d24e4ddc1731a92e6cf0dbc1.jpg",
        pin_thumbnail_urls: [
          "https://i.pinimg.com/736x/c9/7f/62/c97f62a736c46c2f291b24d4e6de88de.jpg",
          "https://i.pinimg.com/1200x/cf/81/a2/cf81a21895433384f2a31162aa770cce.jpg",
        ],
      },
      pin_count: 5,
    },
    {
      id: "3",
      board_pins_modified_at: "2025-09-22",
      name: "Dystopian Fashion",
      media: {
        image_cover_url:
          "https://i.pinimg.com/736x/40/77/9a/40779aa9b943a4bac2429175bd7782a0.jpg",
        pin_thumbnail_urls: [
          "https://i.pinimg.com/1200x/b9/8d/39/b98d3902199052afac5cfe5ffb54fea7.jpg",
          "https://i.pinimg.com/736x/73/87/34/738734c378ea230d278b5a4112b20073.jpg",
          "https://i.pinimg.com/736x/de/57/8e/de578e362756373ff96eafa83af25b41.jpg",
          "https://i.pinimg.com/736x/d7/9c/cd/d79ccd730fdefcab0247a647f3d21a7e.jpg",
        ],
      },
      pin_count: 5,
    },
    {
      id: "4",
      board_pins_modified_at: "2025-10-08",
      name: "armor",
      media: {
        image_cover_url:
          "https://i.pinimg.com/1200x/93/e9/f7/93e9f73456983d14f60722ad9c71ccad.jpg",
        pin_thumbnail_urls: [
          "https://i.pinimg.com/736x/1b/76/47/1b76478d2def47c4ebfee4252e94adb4.jpg",
          "https://i.pinimg.com/736x/e5/93/bd/e593bd305eb6f2057d735c7d786f0800.jpg",
          "https://i.pinimg.com/1200x/63/93/38/63933826489b96732e4f5b5560c09b7f.jpg",
          "https://i.pinimg.com/1200x/32/9c/c8/329cc828e7cc0b078218ae7b072881bb.jpg",
          "https://i.pinimg.com/736x/27/fe/5d/27fe5df7c2f6a6797af76313a874e461.jpg",
        ],
      },
      pin_count: 6,
    },
    {
      id: "549755885175",
      board_pins_modified_at: "2025-03-08",
      media: {
        image_cover_url:
          "https://i.pinimg.com/400x300/fd/cd/d5/fdcdd5a6d8a80824add0d054125cd957.jpg",
        pin_thumbnail_urls: [
          "https://i.pinimg.com/150x150/b4/57/10/b45710f1ede96af55230f4b43935c4af.jpg",
          // "https://i.pinimg.com/150x150/dd/ff/46/ddff4616e39c1935cd05738794fa860e.jpg",
          // "https://i.pinimg.com/150x150/84/ac/59/84ac59b670ccb5b903dace480a98930c.jpg",
          // "https://i.pinimg.com/150x150/4c/54/6f/4c546f521be85e30838fb742bfff6936.jpg",
        ],
      },
      name: "Summer recipes",
      pin_count: 5,
    },
  ],
};

export function getPinsByBoardId(boardId: string): ImageSourceResponse<Pin> {
  if (boardId === "1") {
    // still life
    return {
      bookmark: "",
      items: [
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/1200x/de/ef/f1/deeff1b9cc123bf3ccc3cf096cb0de12.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/a3/12/d1/a312d1b0fb76b4bc9948aa6c7c99dc7c.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/1200x/9b/9b/a3/9b9ba3d83952429b2452b25b737c708d.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/13/9c/56/139c56d914ee579b51d4c8136011f9ef.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/1200x/ba/f0/b2/baf0b24ffb13886038fb4cd68d0d9420.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/fb/aa/ab/fbaaab17bb52bb55750015f673cc2983.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/68/c4/82/68c482d31c5127cc2874df09d306fc24.jpg",
              },
            },
          },
        },
      ],
    };
  }
  // sculpture
  if (boardId === "2") {
    return {
      bookmark: "",
      items: [
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/88/f7/52/88f75295d24e4ddc1731a92e6cf0dbc1.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/c9/7f/62/c97f62a736c46c2f291b24d4e6de88de.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/1200x/cf/81/a2/cf81a21895433384f2a31162aa770cce.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/94/57/bb/9457bb8037a2f8757aa8e591af877959.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/90/e0/3f/90e03fec4e15f8f76d020c4420aa8ef4.jpg",
              },
            },
          },
        },
      ],
    };
  }
  // dystopian fashion
  if (boardId === "3") {
    return {
      bookmark: "",
      items: [
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/40/77/9a/40779aa9b943a4bac2429175bd7782a0.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/1200x/b9/8d/39/b98d3902199052afac5cfe5ffb54fea7.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/73/87/34/738734c378ea230d278b5a4112b20073.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/de/57/8e/de578e362756373ff96eafa83af25b41.jpg",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/d7/9c/cd/d79ccd730fdefcab0247a647f3d21a7e.jpg",
              },
            },
          },
        },
      ],
    };
  }
  // armor
  if (boardId === "4") {
    return {
      bookmark: "",
      items: [
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/1200x/93/e9/f7/93e9f73456983d14f60722ad9c71ccad.jpg,",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/1b/76/47/1b76478d2def47c4ebfee4252e94adb4.jpg,",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/e5/93/bd/e593bd305eb6f2057d735c7d786f0800.jpg,",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/1200x/63/93/38/63933826489b96732e4f5b5560c09b7f.jpg,",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/1200x/32/9c/c8/329cc828e7cc0b078218ae7b072881bb.jpg,",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/736x/27/fe/5d/27fe5df7c2f6a6797af76313a874e461.jpg,",
              },
            },
          },
        },
      ],
    };
  }
  // preset
  if (boardId === "549755885175") {
    return {
      bookmark: "",
      items: [
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/400x300/fd/cd/d5/fdcdd5a6d8a80824add0d054125cd957.jpg,",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/150x150/b4/57/10/b45710f1ede96af55230f4b43935c4af.jpg,",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/150x150/dd/ff/46/ddff4616e39c1935cd05738794fa860e.jpg,",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/150x150/84/ac/59/84ac59b670ccb5b903dace480a98930c.jpg,",
              },
            },
          },
        },
        {
          id: "",
          media: {
            images: {
              "1200x": {
                url: "https://i.pinimg.com/150x150/4c/54/6f/4c546f521be85e30838fb742bfff6936.jpg,",
              },
            },
          },
        },
      ],
    };
  }

  return {
    bookmark: "",
    items: [],
  };
}
