db.comics.insertMany(
  [
    {
      state: "published",
      title: "Origins",
      altText:
        "Did you know that dolphins are the only other mammal that celebrates Veteran's Day?",
      layout: "square",
      path: "so_long.png",
      index: 0,
    },
    {
      state: "published",
      title: "Younglings",
      altText: "My mother thinks I'm so bright, she calls me son.",
      layout: "square",
      path: "kids.png",
      index: 1,
    },
    {
      state: "published",
      title: "Fun Creatures I",
      altText:
        "Unsurprisingly, Mark Sinclair declined to comment (he was not contacted).",
      layout: "wide",
      path: "peccary.png",
      index: 2,
    },
    {
      state: "published",
      title: "Bad Words I",
      altText: "Last chance to lose control - Context: Absolution",
      layout: "tall",
      path: "hysteria.png",
      index: 3,
    },
  ],
  { ordered: false }
);
