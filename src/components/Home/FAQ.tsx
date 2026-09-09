"use client";
import React from "react";
import Container from "../ui/Container";
import * as motion from "motion/react-client";
import FAQGenerate from "./FAQGenerate";
import SectionHeader from "../ui/SectionHeader";

const FAQ = () => {
  const [activeButton, setActiveButton] = React.useState<
    "Clients" | "Photographer/Videographer"
  >("Clients");


  const clientsAccordions = [
    {
      /* title: "How does ordering a photographer or videographer work?" */
      title: "Ako prebieha objednanie fotografa alebo videografa?",
      /* content: "First, you select a category or specific professional. On their profile, you can view their portfolio and estimated prices. Ordering works in two ways: by selecting a ready-made package, or by sending a non-binding request via a form. After agreeing on the price quote, payment is made in advance. The money is held by the platform throughout the collaboration and is released only after the service is delivered and confirmed." */
      content: "Najprv si vyberiete kategóriu alebo konkrétneho fotografa či kameramana. Na jeho profile si môžete pozrieť portfólio, štýl práce a orientačné ceny. Objednanie funguje dvoma spôsobmi: môžete si vybrať hotový balík alebo odoslať nezáväznú požiadavku cez formulár. Po odsúhlasení cenovej ponuky sa platba uhrádza vopred. Peniaze sú počas spolupráce bezpečne držané platformou a fotografovi alebo kameramanovi sa uvoľnia až po dodaní a potvrdení služby.",
    },
    {
      /* title: "How much does photography or video cost?" */
      title: "Koľko stojí fotenie alebo natáčanie?",
      /* content: "The price varies depending on the scope of service, the professional's experience, and the location of the shoot or filming. An estimated price is listed on the profile. The exact amount is agreed upon after sending the request. The price also includes a service fee, which covers support, problem resolution, and secure payment processing." */
      content: "Cena závisí od rozsahu služby, skúseností fotografa alebo kameramana a miesta fotenia či natáčania. Orientačnú cenu nájdete na profile. Presná suma sa dohodne po odoslaní požiadavky. Cena zahŕňa aj servisný poplatok, ktorý pokrýva podporu, riešenie prípadných problémov a bezpečné spracovanie platby.",
    },
    {
      /* title: "What should I do if there's a problem with my order?" */
      title: "Čo mám robiť, ak nastane problém s mojou objednávkou?",
      /* content: "In case of questions or uncertainties, support is available at cvak@frafol.sk." */
      content: "V prípade otázok alebo nejasností je k dispozícii podpora na cvak@frafol.sk.",
    },
    {
      /* title: "What if the result doesn't meet my expectations?" */
      title: "Čo ak výsledok nesplní moje očakávania?",
      /* content: "If the result does not match the agreed scope of service, simply contact support at cvak@frafol.sk. The payment remains held until the situation is clarified. The platform helps mediate a solution between the client and the professional." */
      content: "Ak výsledok nezodpovedá dohodnutému rozsahu služby, kontaktujte podporu na cvak@frafol.sk. Platba zostáva zadržaná, kým sa situácia nevyjasní. Platforma pomáha sprostredkovať riešenie medzi klientom a fotografom alebo kameramanom.",
    },
  ];

  const professionalsAccordions = [
    {
      /* title: "How does registration and profile setup work?" */
      title: "Ako funguje registrácia a nastavenie profilu?",
      /* content: "During registration, you fill in basic information, add a short description, and select service categories along with an estimated price range. The profile then goes through verification. After approval, you can add your portfolio and bank details for payment disbursement. The portfolio is used to showcase your work and style. It includes an introductory video (introduction or work montage), sample works visible before opening the profile, and a complete portfolio available directly on the profile. This allows clients to get an idea before the first contact." */
      content: "Pri registrácii vyplníte základné údaje, pridáte krátky popis a vyberiete kategórie služieb spolu s orientačným cenovým rozpätím. Profil následne prejde overením. Po schválení môžete pridať portfólio a bankové údaje potrebné na vyplatenie platby. Portfólio slúži na prezentáciu Vašej práce a štýlu. Môže obsahovať úvodné video, predstavenie alebo zostrih práce, ukážkové práce viditeľné pred otvorením profilu a kompletné portfólio dostupné priamo na profile. Klienti si tak môžu vytvoriť lepšiu predstavu ešte pred prvým kontaktom.",
    },
    {
      /* title: "What if my category isn't on the platform or another problem arises?" */
      title: "Čo ak moja kategória nie je na platforme alebo nastane iný problém?",
      /* content: "If the requested category is not currently on the platform, you can contact support at cvak@frafol.sk. Categories are continuously added based on needs and demand. You can also write to this email in case of any questions, uncertainties, or problems with a client." */
      content: "Ak požadovaná kategória momentálne nie je na platforme, kontaktujte podporu na cvak@frafol.sk. Kategórie sa priebežne dopĺňajú podľa potrieb a dopytu. Na tento e-mail môžete napísať aj v prípade akýchkoľvek otázok, nejasností alebo problémov s klientom.",
    },
    {
      /* title: "When does the payment disbursement occur?" */
      title: "Kedy dochádza k vyplateniu platby?",
      /* content: "The client pays for the service in advance. The payment is held by the platform during the collaboration. After the service is delivered and approved, the money is paid out within 15 calendar days. The platform does not take a commission from the professional's fee. The client pays a separate service fee, which covers platform operation, support, and secure payment processing." */
      content: "Klient platí za službu vopred. Platba je počas spolupráce držaná platformou. Po dodaní a schválení služby sú peniaze vyplatené do 15 kalendárnych dní. Platforma si neberie províziu z odmeny fotografa alebo kameramana. Klient platí samostatný servisný poplatok, ktorý pokrýva prevádzku platformy, podporu a bezpečné spracovanie platby.",
    },
    {
      /* title: "How are photos or videos delivered?" */
      title: "Ako sa doručujú fotografie alebo videá?",
      /* content: "Finished work is sent via messages. It is recommended to use external storage services that do not reduce file quality (e.g., uschovna.sk, mab.to)." */
      content: "Po označení objednávky ako dodanej fotograf alebo kameraman vyplní formulár, kde uvedie, kde klient nájde fotografie alebo videá, prípadne priloží odkaz na externé úložisko, napríklad My Air Bridge, Úschovňa alebo Google Drive. Klient tak dostane súbory v plnej kvalite a môže si ich jednoducho stiahnuť.",
    },
  ];

  const accordionsData = activeButton === "Clients" ? clientsAccordions : professionalsAccordions;

  return (
    <motion.section
      // id="faq"
      // initial={{ opacity: 0 }}
      // whileInView={{ opacity: 1 }}
      // transition={{ duration: 0.1 }}
      className="pb-28"
    >
      <Container>
        <SectionHeader
          /* title="Frequently asked questions" */
          title="Často kladené otázky"
          /* description="Everything you need to know about the product and billing." */
          description="Všetko, čo potrebujete vedieť o službe a platbách"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-16">
          <div className="flex flex-col gap-2 mt-10">
            <div
              className="flex items-center gap-2"
              onClick={() => setActiveButton("Clients")}
            >
              {activeButton === "Clients" ? (
                <div className="h-1 w-10 rounded-full bg-secondary-color"></div>
              ) : (
                <div className="h-1 w-10 rounded-full bg-transparent"></div>
              )}
              <h3
                className={`cursor-pointer text-sm sm:text-base lg:text-lg text-base-color ${activeButton === "Clients" && "font-semibold"
                  }`}
              >
                {/* Clients */}
                Klienti
              </h3>
            </div>
            <div
              className="flex items-center gap-2"
              onClick={() => setActiveButton("Photographer/Videographer")}
            >
              {activeButton === "Photographer/Videographer" ? (
                <div className="h-1 w-10 rounded-full bg-secondary-color"></div>
              ) : (
                <div className="h-1 w-10 rounded-full bg-transparent"></div>
              )}
              <h3
                className={`cursor-pointer text-sm sm:text-base lg:text-lg text-base-color ${activeButton === "Photographer/Videographer" &&
                  "font-semibold"
                  }`}
              >
                {/* Photographer/Videographer */}
                Fotografi/Kameramani
              </h3>
            </div>
          </div>
          <div className="col-span-2">
            <FAQGenerate accordionsData={accordionsData} />
          </div>
        </div>
      </Container>
    </motion.section>
  );
};

export default FAQ;