// Primary navigation. `match` is used to mark the active link (prefix match on
// the current page URL). `cta` styles the item as the coral pill.
module.exports = [
  { url: "/kim-jestesmy/", label: "kim jesteśmy?", match: "/kim-jestesmy/" },
  { url: "/o-co-walczymy/", label: "o co walczymy?", match: "/o-co-walczymy/" },
  { url: "/blog/", label: "artykuły", match: "/blog/" },
  {
    url: "/plan-na-pokolenia/",
    label: "Plan Na Pokolenia",
    match: "/plan-na-pokolenia/",
    cta: true,
  },
];
