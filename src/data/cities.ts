import type { City } from "@/types";

const cities: City[] = [
  {
    id: "lagos",
    name: "Lagos",
    country: "Nigeria",
    flag: "🇳🇬",
    areas: [
      { id: "yaba", name: "Yaba", cityId: "lagos" },
      { id: "ikeja", name: "Ikeja", cityId: "lagos" },
      { id: "lekki", name: "Lekki", cityId: "lagos" },
      { id: "victoria-island", name: "Victoria Island", cityId: "lagos" },
      { id: "surulere", name: "Surulere", cityId: "lagos" },
      { id: "ogudu", name: "Ogudu", cityId: "lagos" },
      { id: "gbagada", name: "Gbagada", cityId: "lagos" },
      { id: "festac", name: "Festac", cityId: "lagos" },
      { id: "egbeda", name: "Egbeda", cityId: "lagos" },
      { id: "alimosho", name: "Alimosho", cityId: "lagos" },
    ],
  },
  {
    id: "abuja",
    name: "Abuja",
    country: "Nigeria",
    flag: "🇳🇬",
    areas: [
      { id: "wuse", name: "Wuse", cityId: "abuja" },
      { id: "gwarinpa", name: "Gwarinpa", cityId: "abuja" },
      { id: "maitama", name: "Maitama", cityId: "abuja" },
      { id: "garki", name: "Garki", cityId: "abuja" },
      { id: "jabi", name: "Jabi", cityId: "abuja" },
      { id: "utako", name: "Utako", cityId: "abuja" },
      { id: "mabushi", name: "Mabushi", cityId: "abuja" },
      { id: "katampe", name: "Katampe", cityId: "abuja" },
      { id: "asokoro", name: "Asokoro", cityId: "abuja" },
    ],
  },
  {
    id: "accra",
    name: "Accra",
    country: "Ghana",
    flag: "🇬🇭",
    areas: [
      { id: "osu", name: "Osu", cityId: "accra" },
      { id: "east-legon", name: "East Legon", cityId: "accra" },
      { id: "labone", name: "Labone", cityId: "accra" },
      { id: "cantonments", name: "Cantonments", cityId: "accra" },
      { id: "airport-residential", name: "Airport Residential", cityId: "accra" },
    ],
  },
];

export default cities;
export { cities };
