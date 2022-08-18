const images_results = [
  {
    position: 1,
    thumbnail:
      "https://serpapi.com/searches/62fd8a889b6472b7cd7fb0ad/images/05109f1d08e78809ac8ac33e43ac30be36fe799ed67b01bb8b42b1203f73ed6e.jpeg",
    source: "applesfromny.com",
    title: "SnapDragon® - New York Apple Association",
    link: "https://www.applesfromny.com/varieties/snapdragon/",
    original:
      "https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png",
    is_product: false,
  },
  {
    position: 2,
    thumbnail:
      "https://serpapi.com/searches/62fd8a889b6472b7cd7fb0ad/images/05109f1d08e7880997a7d55a45910361fe68c6ecad37992ee517563067e91c80.jpeg",
    source: "applesfromny.com",
    title: "Varieties Archive - New York Apple Association",
    link: "https://www.applesfromny.com/varieties/",
    original:
      "https://www.applesfromny.com/wp-content/uploads/2020/05/20Ounce_NYAS-Apples2.png",
    is_product: false,
  },
  {
    position: 3,
    thumbnail:
      "https://serpapi.com/searches/62fd8a889b6472b7cd7fb0ad/images/05109f1d08e78809a9adf0b791c1b11ad081c99392bb2fdb57a96c9169d40475.jpeg",
    source: "britannica.com",
    title: "apple | Description, Cultivation, & Uses | Britannica",
    link: "https://www.britannica.com/plant/apple-fruit-and-tree",
    original:
      "https://cdn.britannica.com/47/103847-050-8E18B710/varieties-apples.jpg",
    is_product: false,
  },
  {
    position: 4,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGU57yGujJ6MSt9xUpfBcLDaM1_Zh7vSTujFBiviDquzFvMdi8Zx4vx-0KPonopKG2368&usqp=CAU",
    source: "istockphoto.com",
    title:
      "945,363 Apple Stock Photos, Pictures & Royalty-Free Images - iStock",
    link: "https://www.istockphoto.com/photos/apple",
    original:
      "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g=",
    is_product: true,
  },
  {
    position: 5,
    thumbnail:
      "https://serpapi.com/searches/62fd8a889b6472b7cd7fb0ad/images/05109f1d08e788090ac26d34e23713b4c040f3ebc802ff3ac04d261e7c9f0f67.png",
    source: "en.wikipedia.org",
    title: "History of Apple Inc. - Wikipedia",
    link: "https://en.wikipedia.org/wiki/History_of_Apple_Inc.",
    original:
      "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    is_product: false,
  },
  {
    position: 6,
    thumbnail:
      "https://serpapi.com/searches/62fd8a889b6472b7cd7fb0ad/images/05109f1d08e78809f56a82b71793c756c9818aa5ac098437c8412bf1c526017c.png",
    source: "m.youtube.com",
    title: "Apple - YouTube",
    link: "https://m.youtube.com/user/Apple/videos",
    original:
      "https://yt3.ggpht.com/ytc/AMLnZu-WCPytY25vnp0GFcCrTIQ0VAgIs5oqKK2zNgDl5A=s900-c-k-c0x00ffffff-no-rj",
    is_product: false,
  },
];

export const getImages = async (name: string) => {
  console.log(name);
  const response = fetch("");
  return Promise.resolve(JSON.parse(JSON.stringify(images_results)));
};
