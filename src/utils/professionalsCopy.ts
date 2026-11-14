// Browser tab title, heading and intro text of the creators list (/professionals), which changes with
// the ?role= and ?type= filters. Used by the page metadata and by the page itself so both stay in sync.
// Only texts live here. The URLs and query params are untouched.

export type ProfessionalsListCopy = {
  tabTitle: string;
  heading: string;
  description: string;
};

type Params = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export const getProfessionalsListCopy = (params?: Params): ProfessionalsListCopy => {
  const role = first(params?.role);
  const type = first(params?.type);

  if (role === "photographer") {
    return {
      tabTitle: "Fotografi na Slovensku – Vyberte si fotografa | Frafol",
      heading: "Naši fotografi",
      description:
        "Objavte profesionálnych fotografov z celého Slovenska. Prezrite si ich portfóliá, porovnajte ceny a nájdite ideálneho fotografa na svadbu, rodinné či portrétne fotenie.",
    };
  }

  if (role === "videographer") {
    return {
      tabTitle: "Kameramani na Slovensku – Vyberte si kameramana | Frafol",
      heading: "Naši kameramani",
      description:
        "Objavte profesionálnych kameramanov z celého Slovenska. Prezrite si ich portfóliá, porovnajte ceny a nájdite ideálneho kameramana na svadbu, podujatie či reklamné video.",
    };
  }

  // "Frafol odporúča" (creators with an active subscription), opened with ?type=verified.
  if (type) {
    return {
      tabTitle: "Frafol odporúča – Zvýraznení fotografi a kameramani",
      heading: "Frafol odporúča",
      description:
        "Objavte fotografov a kameramanov s plateným zvýraznením na Frafol. Prezrite si ich portfóliá, porovnajte ponuky a nájdite toho pravého na svoje fotenie či natáčanie.",
    };
  }

  return {
    tabTitle: "Fotografi a kameramani na Slovensku | Frafol",
    heading: "Fotografi a kameramani",
    description:
      "Objavte profesionálnych fotografov a kameramanov z celého Slovenska. Prezrite si ich portfóliá, porovnajte ceny a nájdite ideálneho profesionála na fotenie či natáčanie podľa svojich predstáv.",
  };
};
