# Frafol Website - Route & Navigation Architecture Map

Tento dokument obsahuje kompletnú štruktúru trás (routes), podtrás (sub-routes), záložiek (tabs), vnorených záložiek (nested/sub-tabs), query parametrov a úrovní oprávnení celej aplikácie **Frafol**.

---

## 📑 Obsah

1. [Globálna architektúra a Route Groups](#1-globálna-architektúra-a-route-groups)
2. [Verejné trasy a Hlavná navigácia (withNavFooter)](#2-verejné-trasy-a-hlavná-navigácia-withnavfooter)
3. [Autentifikácia a Registrácia (Auth)](#3-autentifikácia-a-registrácia-auth)
4. [Používateľský Dashboard / Môj účet (dashboard/my-account)](#4-používateľský-dashboard--môj-účet-dashboardmy-account)
5. [Profesionálny Dashboard (dashboard/professional)](#5-profesionálny-dashboard-dashboardprofessional)
6. [Správy a Chat (withMessageLayout)](#6-správy-a-chat-withmessagelayout)
7. [Informačné a Právne stránky](#7-informačné-a-právne-stránky)
8. [API Route Handlers](#8-api-route-handlers)
9. [Prehľadová matica všetkých záložiek (Tabs Summary Table)](#9-prehľadová-matica-všetkých-záložiek-tabs-summary-table)

---

## 1. Globálna architektúra a Route Groups

Aplikácia je postavená na Next.js App Routeri s nasledujúcimi route groups (skupinami layoutov):

| Route Group | Layout súbor | Účel & Vlastnosti |
| :--- | :--- | :--- |
| `src/app/layout.tsx` | Hlavný root layout | Poskytuje globálny `NavbarWraper`, Ant Design `ConfigProvider`, Redux Provider, Sonner `Toaster`. |
| `(withNavFooter)` | `(withNavFooter)/layout.tsx` | Verejné a katalógové stránky s hlavičkou a pätou (`Footer`). |
| `(Auth)` | `(Auth)/layout.tsx` | Prihlasovanie a viackroková registrácia s brandingom. |
| `(withDashboardLayout)` | `(withDashboardLayout)/layout.tsx` | Dashboardy s bočným navigačným menu (`SideBar`), prepínačom zbalenia a breadcrumb/header lištou. |
| `(withMessageLayout)` | `(withMessageLayout)/layout.tsx` | Chat a konverzácie na celú obrazovku. |
| `api` | Route Handlers (`route.ts`) | Pomocné API endpointy (streamovanie videa, odhlásenie). |

---

## 2. Verejné trasy a Hlavná navigácia (withNavFooter)

Všetky tieto stránky obsahujú hlavný Navbar s navigačnými položkami:
- **Fotografi** (`/photography`)
- **Kameramani** (`/videography`)
- **Bazár** (`/marketplace`)
- **Fórum** (`/forums`)
- **Kurzy** (`/workshops`)
- Ikony pre: Správy (`/message`), Upozornenia dropdown (`/notifications`), Košík (`/cart`), Profil dropdown / Prihlásenie (`/sign-in`), Registrácia (`/join`).

---

### 2.1 Domovská stránka (`/`)
- **URL trasa:** `/`
- **Súbor:** `src/app/(withNavFooter)/page.tsx`
- **Prístup:** Verejný
- **Sekcie:**
  - Hero Banner
  - Frafol Choice tvorcovia
  - **Preskúmajte kategórie (Explore Categories) — ZÁLOŽKY:**
    - `?tab=photoGraphy` (Fotografia) *(predvolená)*
    - `?tab=videoGraphy` (Videografia)
  - Odporúčaní profesionáli (Featured Professionals)
  - Ako to funguje (How it works)
  - Ukážka bazáru (Marketplace section)
  - Recenzie a hodnotenia (Testimonials)
  - Často kladené otázky (FAQ)
  - Galéria talentovaných tvorcov

---

### 2.2 Fotografi (`/photography`) & Podstránky
- **Hlavná stránka:** `/photography`
  - **Súbor:** `src/app/(withNavFooter)/photography/page.tsx`
  - **Účel:** Katalóg fotografických kategórií (Svadby, Portréty, Rodina, Podujatia, Produktová foto, atď.).
  - **Filtre / Parametre:**
    - `?search=` (Vyhľadávanie podľa názvu kategórie)
- **Detail kategórie (Sub-route):** `/photography/[id]`
  - **Súbor:** `src/app/(withNavFooter)/photography/[id]/page.tsx`
  - **Účel:** Zoznam profesionálnych fotografov v konkrétnej kategórii.
  - **Query parametre:**
    - `role=photographer`
    - `title=` (Názov kategórie)
    - `src=` (Obrázok kategórie)
    - `search=` (Hľadanie tvorcu podľa mena)
    - `min=` (Minimálna hodinová sadzba v €)
    - `max=` (Maximálna hodinová sadzba v €)
    - `availity=` (Dostupnosť k dátumu)
    - `towns=` (Mesto / lokalita pôsobenia)

---

### 2.3 Kameramani (`/videography`) & Podstránky
- **Hlavná stránka:** `/videography`
  - **Súbor:** `src/app/(withNavFooter)/videography/page.tsx`
  - **Účel:** Katalóg video kategórií (Svadobné video, Reklamy, Hudobné klipy, Spoločenské akcie, atď.).
  - **Filtre / Parametre:**
    - `?search=` (Vyhľadávanie kategórie)
- **Detail kategórie (Sub-route):** `/videography/[id]`
  - **Súbor:** `src/app/(withNavFooter)/videography/[id]/page.tsx`
  - **Účel:** Zoznam profesionálnych kameramanov v danej kategórii.
  - **Query parametre:**
    - `role=videographer`
    - `title=` (Názov kategórie)
    - `src=` (Obrázok kategórie)
    - `search=`, `min=`, `max=`, `availity=`, `towns=`

---

### 2.4 Zoznam všetkých tvorcov (`/professionals`) & Podstránky
- **Hlavná stránka:** `/professionals`
  - **Súbor:** `src/app/(withNavFooter)/professionals/page.tsx`
  - **Účel:** Kompletný filter a vyhľadávač všetkých tvorcov na platforme.
  - **Query parametre:**
    - `?role=` (`photographer` | `videographer` | prázdne pre oboch)
    - `?type=frafol-choice` (Filter tvorcov s odznakom Frafol Choice)
    - `?search=` (Textové vyhľadávanie)
    - `?min=`, `?max=` (Cenové rozpätie)
    - `?availity=` (Filter podľa kalendárnej dostupnosti)
    - `?towns=` (Filter podľa miest)
    - `?page=` (Stránkovanie)

- **Verejný profil tvorcu (Sub-route):** `/professionals/[id]`
  - **Súbor:** `src/app/(withNavFooter)/professionals/[id]/page.tsx`
  - **Účel:** Profil profesionála, biografické údaje, priemerná cena, odznak Frafol Choice, balíčky služieb, ukážka portfólia, objednávkový formulár (Book session) a klientske recenzie.
  - **Query parametre:**
    - `?sort=` (Zoraďovanie recenzií: `newest`, `highest`, `lowest`)
    - `?rating=` (Filtrovanie recenzií podľa počtu hviezdičiek: `1` až `5`)

- **Kompletné portfólio tvorcu (Sub-route):** `/professionals/[id]/works`
  - **Súbor:** `src/app/(withNavFooter)/professionals/[id]/works/page.tsx`
  - **Účel:** Plná multimediálna galéria všetkých prác daného tvorcu (fotografie v lightboxe a videá v prehrávači).
  - **Sekcie / Filtre zobrazenia:**
    - Sekcia fotografií (Images) s možnosťou zbalenia/rozbalenia
    - Sekcia videí (Videos) s vlastnými video miniatúrami a samostatným ovládaním prehrávania

---

### 2.5 Bazár / Marketplace (`/marketplace`) & Podstránky
- **Hlavná stránka:** `/marketplace`
  - **Súbor:** `src/app/(withNavFooter)/marketplace/page.tsx`
  - **Účel:** Trhovisko foto a video techniky, kamier, objektívov, osvetlenia a príslušenstva.
  - **ZÁLOŽKY KATEGÓRIÍ (Category Tabs):**
    - `All` (`?category=all`) — Všetok tovar *(predvolené)*
    - Dynamické záložky kategórií: `?category=[categoryId]` (napr. Fotoaparáty, Kamery, Objektívy, Drony, Svetlá, Zvuk, Príslušenstvo)
  - **Filtre / Parametre:**
    - `?condition=` (`all` | `new` [Nové] | `used` [Použité])
    - `?min=`, `?max=` (Cena od - do)
    - `?search=` (Hľadanie v inzerátoch)
    - `?page=` (Stránkovanie)
  - **Akcie:** Tlačidlo "Pridať inzerát" (otvára modálne okno pre profesionálov).

- **Detail inzerátu (Sub-route):** `/marketplace/[id]`
  - **Súbor:** `src/app/(withNavFooter)/marketplace/[id]/page.tsx`
  - **Účel:** Detail produktu, fotogaléria položky, cena, stav, predajca (odkaz na profil profesionála), informácie o doprave (harmonika / accordion), tlačidlo pridania do košíka (`AddToCartButton`).

---

### 2.6 Fórum / Diskusie (`/forums`) & Podstránky
- **Hlavná stránka:** `/forums`
  - **Súbor:** `src/app/(withNavFooter)/forums/page.tsx`
  - **Účel:** Komunitné fórum pre tvorcov a klientov (rady, diskusie, technika, spätná väzba).
  - **Parametre:**
    - `?search=` (Vyhľadávanie v príspevkoch)
    - `?page=` (Stránkovanie príspevkov)
  - **Akcie:** Vytvorenie nového diskusného príspevku (modálne okno).

- **Detail diskusie (Sub-route):** `/forums/[id]`
  - **Súbor:** `src/app/(withNavFooter)/forums/[id]/page.tsx`
  - **Účel:** Plné znenie príspevku, komentáre, odpovede na komentáre a pridávanie odpovedí.
  - **Parametre:**
    - `?page=` (Stránkovanie komentárov)

---

### 2.7 Kurzy a workshopy (`/workshops`)
- **Hlavná stránka:** `/workshops`
  - **Súbor:** `src/app/(withNavFooter)/workshops/page.tsx`
  - **Účel:** Zoznam vzdelávacích kurzov a workshopov organizovaných profesionálmi.
  - **Parametre:**
    - `?search=` (Vyhľadávanie kurzov)
    - `?page=` (Stránkovanie)
  - **Akcie:** Registrácia / prihlásenie sa na workshop cez modálne okno a platobnú bránu.

---

### 2.8 Užitočné dokumenty (`/helpful-documents`)
- **URL trasa:** `/helpful-documents`
- **Súbor:** `src/app/(withNavFooter)/helpful-documents/page.tsx`
- **Prístup:** Verejný / Tvorcovia
- **ZÁLOŽKY (Tabs):**
  1. `creativeDocuments` ("Creative Documents") — Tvorivé šablóny na stiahnutie:
     - Storyboard Template (PDF)
     - Shot List (PDF)
     - Script Breakdown Sheet (PDF)
  2. `legalDocument` ("Legal Document") — Právne vzory a súhlasy:
     - Súhlas so zhotovovaním audiovizuálneho a fotografického záznamu (klient) (.docx)
     - Súhlas so zhotovovaním audiovizuálneho a fotografického záznamu (dieťa / zákonný zástupca) (.docx)

---

### 2.9 Košík a Platby
- **Košík:** `/cart`
  - **Súbor:** `src/app/(withNavFooter)/cart/page.tsx`
  - **Účel:** Nákupný košík s bazárovými položkami, výber doručenia, súhrn objednávky a prechod k platbe.
  - **Prístup:** Prihlásený používateľ
- **Úspešná platba:** `/success`
  - **Súbor:** `src/app/(withNavFooter)/success/page.tsx`
  - **Účel:** Potvrdenie úspešne dokončenej objednávky / platby cez Stripe.
- **Upozornenia:** `/notifications`
  - **Súbor:** `src/app/(withNavFooter)/notifications/page.tsx`
  - **Účel:** Prehľad všetkých notifikácií používateľa so stránkovaním `?page=`.
- `/notification`
  - **Súbor:** `src/app/(withNavFooter)/notification/page.tsx` (Zástupná trasa)

---

## 3. Autentifikácia a Registrácia (Auth)

Všetky autentifikačné trasy zdieľajú `(Auth)/layout.tsx` s vizuálnym bannerom.

| Trasa (Route) | Súbor | Účel | Záložky / Kroky / Parametre |
| :--- | :--- | :--- | :--- |
| `/sign-in` | `(Auth)/sign-in/page.jsx` | Prihlásenie | Formulár: Email, Heslo, Zabudnuté heslo, Sociálne prihlásenie. |
| `/join` | `(Auth)/join/page.tsx` | Výber typu registrácie | Výber: **Zákazník / Klient** (`/sign-up/user`) alebo **Tvorca / Profesionál** (`/sign-up/professional/choose-role`). |
| `/sign-up/user` | `(Auth)/sign-up/user/page.tsx` | Registrácia zákazníka | Meno, Email, Heslo, Súhlas s podmienkami. |
| `/sign-up/user/otp-verify` | `(Auth)/sign-up/user/otp-verify/page.jsx` | Overenie zákazníka | Zadanie 6-miestneho OTP kódu z emailu. |
| `/forgot-password` | `(Auth)/forgot-password/page.jsx` | Zabudnuté heslo | Zadanie emailu na reset hesla. |
| `/forgot-password/otp-verify` | `(Auth)/forgot-password/otp-verify/page.jsx` | OTP reset hesla | Overenie kódu pre zmenu hesla. |
| `/update-password` | `(Auth)/update-password/page.jsx` | Nové heslo | Nastavenie a potvrdenie nového hesla. |

### Viackroková registrácia profesionála (`/sign-up/professional/*`):

| Krok | Trasa | Súbor | Záložky / Polia |
| :---: | :--- | :--- | :--- |
| **1** | `/sign-up/professional/choose-role` | `choose-role/page.tsx` | Výber role: `photographer` (Fotograf), `videographer` (Kameraman), `both` (Oboje). |
| **2** | `/sign-up/professional/choose-specialization` | `choose-specialization/page.tsx` | **ZÁLOŽKY:**<br>• `?tab=photography` ("Fotografia") — kategórie foto služieb<br>• `?tab=videography` ("Videografia") — kategórie video služieb |
| **3** | `/sign-up/professional/personal-information` | `personal-information/page.tsx` | Meno, priezvisko, telefón, profilová fotka, mesto/obec pôsobenia. |
| **4** | `/sign-up/professional/additional-information` | `additional-information/page.tsx` | Bio/popis, použitá technika (gear), skúsenosti, sociálne siete, web. |
| **5** | `/sign-up/professional/legal-invoice` | `legal-invoice/page.tsx` | Fakturačné údaje: Živnosť/Firma/Fyzická osoba, IČO, DIČ, IČ DPH, IBAN, adresa. |
| **6** | `/sign-up/professional/review-details` | `review-details/page.tsx` | Kompletný náhľad a rekapitulácia zadaných údajov pred odoslaním. |
| **7** | `/sign-up/professional/otp-verify` | `otp-verify/page.jsx` | Finálne overenie účtu pomocou OTP kódu. |

---

## 4. Používateľský Dashboard / Môj účet (dashboard/my-account)

Určené pre zákazníkov/klientov (`role: "user" | "company"`). Všetky trasy sú chránené a majú bočné menu (`useAdminPaths`).

```
/dashboard/my-account/
├── overview/
├── orders/
├── gear-order/
├── extension-requests/
├── payments/
├── my-workshop/
├── reviews/
├── my-community-posts/
└── profile-settings/
```

### 4.1 Prehľad (`/dashboard/my-account/overview`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/my-account/overview/page.tsx`
- **Súčasti:** Štatistické karty (Aktívne objednávky, Čakajúce na potvrdenie, Dokončené objednávky, Celková útrata), Vyžaduje sa akcia (nevyplatené platby, potvrdenie doručenia), Nedávne notifikácie.

---

### 4.2 Foto a video objednávky (`/dashboard/my-account/orders`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/my-account/orders/page.tsx`
- **Query parametre:** `?tab=`, `?page=`, `?limit=10`
- **ZÁLOŽKY (Tabs) — filter podľa stavu objednávky:**
  1. `currentOrder` ("Aktuálna objednávka") *(predvolená)*
  2. `toConfirm` ("Potvrdiť doručenie")
  3. `delivered` ("Doručené")
  4. `pending` ("Odoslaný formulár" / Moja žiadosť)
  5. `orderOffer` ("Návrh objednávky")
  6. `accepted` ("Čaká sa na platbu")
  7. `cancelRequest` ("Potvrdenie zrušenia")
  8. `cancelled` ("Zrušené")

---

### 4.3 Objednávky z bazáru (`/dashboard/my-account/gear-order`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/my-account/gear-order/page.tsx`
- **Query parametre:** `?tab=`, `?page=`, `?limit=12`
- **ZÁLOŽKY (Tabs):**
  1. `currentOrder` ("Aktuálna objednávka") *(predvolená)*
  2. `toConfirm` ("Na potvrdenie")
  3. `delivered` ("Doručené")
  4. `cancelled` ("Zrušené")

---

### 4.4 Žiadosti o predĺženie (`/dashboard/my-account/extension-requests`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/my-account/extension-requests/page.tsx`
- **Účel:** Správa žiadostí o predĺženie termínu dodania fotografií alebo videí s možnosťou schválenia alebo zamietnutia.

---

### 4.5 Moje platby (`/dashboard/my-account/payments`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/my-account/payments/page.tsx`
- **Query parametre:** `?page=`, `?limit=12`
- **Súčasti:** Štatistika celkových platieb a objednávok, kompletná história transakcií, generovanie a sťahovanie PDF faktúr (`InvoiceDocumentFromClientSide`).

---

### 4.6 Prihlásené kurzy (`/dashboard/my-account/my-workshop`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/my-account/my-workshop/page.tsx`
- **Query parametre:** `?page=`, `?limit=12`
- **Účel:** Zoznam workshopov, na ktoré sa používateľ prihlásil, termíny, detaily organizátora a prístup k materiálom.

---

### 4.7 Moje recenzie (`/dashboard/my-account/reviews`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/my-account/reviews/page.tsx`
- **Query parametre:** `?tab=`, `?page=`, `?limit=12`
- **ZÁLOŽKY (Tabs):**
  1. `allReviews` ("Všetky recenzie") *(predvolená)* — História udelených recenzií tvorcom.
  2. `pendingReviews` ("Čakajúce recenzie") — Objednávky pripravené na ohodnotenie používateľom.

---

### 4.8 Príspevky vo fóre (`/dashboard/my-account/my-community-posts`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/my-account/my-community-posts/page.tsx`
- **Query parametre:** `?search=`, `?page=`, `?limit=12`
- **Účel:** Prehľad všetkých diskusných tém vytvorených prihláseným používateľom s možnosťou správy a úprav.

---

### 4.9 Profil a nastavenia (`/dashboard/my-account/profile-settings`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/my-account/profile-settings/page.tsx`
- **Query parametre:** `?tab=`
- **ZÁLOŽKY (Tabs):**
  1. `profile` ("Edit Profile" / Upraviť profil) *(predvolená)* — Meno, telefón, bydlisko, avatar.
  2. `changePassword` ("Change Password" / Zmeniť heslo) — Staré heslo, nové heslo a potvrdenie.
  3. `deleteAccount` ("Delete Account" / Zmazať účet) — Žiadosť o zmazanie účtu s udaním dôvodu.

---

## 5. Profesionálny Dashboard (dashboard/professional)

Určené pre tvorcov (`role: "photographer" | "videographer" | "both"`). Trasy sú chránené a majú rozšírené bočné menu (`useProfessionalPaths`).

```
/dashboard/professional/
├── overview/
├── event-orders/
├── gear-order/
├── gear-purchases/
├── gear-marketPlace/
├── workshop/
├── my-workshop/
├── packages/
├── calendar/
├── review/
├── my-community-posts/
├── frafol-choice/
├── earning/
├── payments/
└── profile-settings/
```

*(Poznámka: Samotná trasa `/dashboard/professional` vracia 404, systém naviguje priamo na `/dashboard/professional/overview`.)*

---

### 5.1 Prehľad (`/dashboard/professional/overview`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/overview/page.tsx`
- **Query parametre:** `?year=` (Filter grafu príjmov podľa roka)
- **Súčasti:**
  - Štatistické karty (Zárobky za mesiac/rok, Dokončené zákazky, Hodnotenie)
  - Graf mesačných príjmov (Income Overview Chart)
  - Nadchádzajúce udalosti (Upcoming Events)
  - Čakajúce zákazky vyžadujúce pozornosť (Pending Event Orders)

---

### 5.2 Foto a video objednávky (`/dashboard/professional/event-orders`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/event-orders/page.tsx`
- **Query parametre:** `?tab=`, `?page=`, `?limit=12`
- **ZÁLOŽKY (Tabs) — stavy klientskych zákaziek:**
  1. `pending` ("Čakajúca žiadosť") *(predvolená)* — Nové klientske dopyty pripravené na ponuku/akceptáciu.
  2. `accepted` ("Čaká sa na platbu") — Akceptované zákazky čakajúce na úhradu klientom.
  3. `upcoming` ("Nadchádzajúce objednávky") — Zaplatené zákazky pred termínom realizácie.
  4. `inProgress` ("Prebieha") — Zákazky v štádiu spracovania/úpravy fotiek či videí.
  5. `toConfirm` ("Na potvrdenie") — Odovzdaná práca čakajúca na klientske potvrdenie.
  6. `delivered` ("Doručené") — Úspešne ukončené a potvrdené zákazky.
  7. `cancelRequest` ("Potvrdenie zrušenia") — Žiadosti o storno objednávky.
  8. `cancelled` ("Zrušené") — Zrušené zákazky.

---

### 5.3 Objednávky z bazáru - Predaje (`/dashboard/professional/gear-order`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/gear-order/page.tsx`
- **Query parametre:** `?search=`, `?page=`, `?limit=12`
- **Účel:** Správa predajov vlastnej techniky z bazáru, adresy kupujúcich, trasovacie čísla a stavy odoslania (`role=professional`).

---

### 5.4 Nákupy z bazáru (`/dashboard/professional/gear-purchases`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/gear-purchases/page.tsx`
- **Query parametre:** `?tab=`, `?page=`, `?limit=12`
- **Účel:** Správa nákupov techniky, ktorú profesionál kúpil od iných tvorcov (`role=user`).
- **ZÁLOŽKY (Tabs):**
  1. `currentOrder` ("Aktuálna objednávka") *(predvolená)*
  2. `toConfirm` ("Na potvrdenie")
  3. `delivered` ("Doručené")
  4. `cancelled` ("Zrušené")

---

### 5.5 Moje inzeráty v bazári (`/dashboard/professional/gear-marketPlace`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/gear-marketPlace/page.tsx`
- **Query parametre:**
  - `?filter=` (`In Stock` [Na sklade] | `Sold Out` [Predané])
  - `?search=` (Hľadanie)
  - `?page=` (Stránkovanie)
- **Modálne okná / Akcie:**
  - Pridať novú techniku (Add Gear Modal)
  - Upraviť techniku (Edit Gear Modal)
  - Zobraziť detail inzerátu (View Modal)
  - Zmazať inzerát (Delete Modal)

---

### 5.6 Správa vlastných kurzov (`/dashboard/professional/workshop`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/workshop/page.tsx`
- **Query parametre:**
  - `?tab=` (`approved` | `pending`)
  - `?search=` (Hľadanie)
  - `?workshop=` (ID kurzu pre zobrazenie účastníkov)
  - `?page=`
- **ZÁLOŽKY (Tabs):**
  1. `approved` ("Aktívne") *(predvolená)* — Schválené publikované workshopy.
  2. `pending` ("Čakajúce") — Workshopy čakajúce na schválenie administrátorom.
- **Akcie & Modály:**
  - "Pridať nový kurz" (Add Workshop Modal)
  - "Zoznam účastníkov" (Participants Modal via `?workshop=[id]`)
  - Úprava a zmazanie kurzu

---

### 5.7 Moje prihlásené kurzy (`/dashboard/professional/my-workshop`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/my-workshop/page.tsx`
- **Query parametre:** `?page=`, `?limit=12`
- **Účel:** Kurzy iných profesionálov, ktorých je tvorca účastníkom.

---

### 5.8 Balíky služieb (`/dashboard/professional/packages`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/packages/page.tsx`
- **Query parametre:** `?tab=`, `?search=`, `?page=`, `?limit=12`
- **ZÁLOŽKY (Tabs):**
  1. `approved` ("Aktívne") *(predvolená)* — Schválené balíčky zobrazené vo verejnom profile tvorcu.
  2. `pending` ("Čakajúce") — Novo pridané alebo upravené balíky čakajúce na schválenie.
- **Akcie:** Pridať balík, Upraviť balík, Odstrániť balík.

---

### 5.9 Kalendár (`/dashboard/professional/calendar`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/calendar/page.tsx`
- **Účel:** Interaktívny mesačný kalendár so všetkými naplánovanými foteniami, natáčaniami a blokovanými termínmi.
- **Farebné označenia udalostí:**
  - Zelená (`delivered` / Dokončené)
  - Žltá (`pending` / Čakajúce)
  - Modrá (`inProgress` / Prebieha)
  - Červená (`cancelled` / Zrušené)

---

### 5.10 Prijaté recenzie (`/dashboard/professional/review`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/review/page.tsx`
- **Query parametre:** `?page=`, `?limit=12`
- **Účel:** Prehľad všetkých klientskych hodnotení a textových recenzií s celkovým priemerom hviezdičiek.

---

### 5.11 Moje príspevky vo fóre (`/dashboard/professional/my-community-posts`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/my-community-posts/page.tsx`
- **Query parametre:** `?search=`, `?page=`, `?limit=12`
- **Účel:** Správa vlastných diskusných príspevkov vytvorených profesionálom.

---

### 5.12 Odporúča Frafol / Frafol Choice (`/dashboard/professional/frafol-choice`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/frafol-choice/page.tsx`
- **Účel:** Predplatné prestížneho odznaku **Frafol Choice**, ktorý zabezpečuje prioritné zobrazovanie vo výsledkoch vyhľadávania a na domovskej stránke.
- **Obsah:** Stav aktívneho predplatného, dátum expirácie, počet zostávajúcich dní a balíčky predplatného na nákup/predĺženie.

---

### 5.13 Zárobky (`/dashboard/professional/earning`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/earning/page.tsx`
- **Query parametre:** `?type=`, `?search=`, `?page=`, `?limit=12`
- **ZÁLOŽKY (Tabs) — prepínač kategórií zárobkov:**
  1. `event` ("Podujatia") *(predvolená)* — Zárobky z foto a video zákaziek.
  2. `gear` ("Bazár") — Zárobky z predaja techniky.
  3. `workshop` ("Kurzy") — Zárobky z predaja vstupeniek na workshopy.
- **Akcie:** Detail transakcie v modálnom okne (`EarningViewModal`).

---

### 5.14 Platby (`/dashboard/professional/payments`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/payments/page.tsx`
- **Query parametre:** `?page=`, `?limit=12`
- **Účel:** Celková finančná štatistika, vyplatené prostriedky a faktúry.

---

### 5.15 Profil, Portfólio a Nastavenia (`/dashboard/professional/profile-settings`)
- **Súbor:** `src/app/(withDashboardLayout)/dashboard/professional/profile-settings/page.tsx`
- **Query parametre:** `?tab=`, `?portfolio=`
- **HLAVNÉ ZÁLOŽKY (Main Tabs):**
  1. `profile` ("Upraviť profil") *(predvolená)*:
     - Osobné údaje, špecializácia, mestá pôsobenia (Towns), kategórie služieb, hodinová sadzba (od - do), bio.
  2. `portfolio` ("Portfólio") — **VNORENO ZÁLOŽKY (Nested Sub-Tabs):**
     - `?portfolio=introVideo` ("Intro Video") — Nahratie a správa úvodného prezentačného videa.
     - `?portfolio=bannerImage` ("Banner Image") — Úprava titulného banneru profilu.
     - `?portfolio=galleryImage` ("Gallery Image") — Správa fotogalérie a videí v portfóliu.
  3. `accountCredentials` ("Prihlasovacie údaje"):
     - Fakturačné a bankové spojenie, IČO, DIČ, IBAN pre vyplácanie tržieb.
  4. `unavailability` ("Nedostupnosť"):
     - Nastavenie dovoleniek a dní pracovného voľna, kedy nie je možné profesionála zarezervovať.
  5. `changePassword` ("Zmeniť heslo"):
     - Zmena prihlasovacieho hesla k účtu.
  6. `deleteAccount` ("Zmazať účet"):
     - Formulár na podanie žiadosti o zrušenie a vymazanie profesionálneho účtu.

---

## 6. Správy a Chat (withMessageLayout)

- **URL trasa:** `/message`
- **Layout:** `src/app/(withMessageLayout)/layout.tsx`
- **Súbor stránky:** `src/app/(withMessageLayout)/message/page.tsx`
- **Prístup:** Prihlásený používateľ (`role: user | company | photographer | videographer | both`)
- **Query parametre:**
  - `?room=[conversationId]` (Aktívna konverzačná miestnosť)
  - `?search=[query]` (Vyhľadávanie v kontaktoch a chatoch)
  - `?page=[number]` (Stránkovanie histórie správ)
- **Komponenty a funkcie:**
  - Ľavý panel: Zoznam kontaktov s indikátormi neprečítaných správ (cez WebSockets Socket.IO).
  - Pravý panel: Aktívna konverzácia, odosielanie správ, súborov, vytváranie a vyjednávanie návrhov objednávok (Order Offers).

---

## 7. Informačné a Právne stránky

Všetky právne a informačné stránky bežia pod `(withNavFooter)` s pätou stránky:

| Názov stránky | URL trasa | Zdrojový súbor | Popis |
| :--- | :--- | :--- | :--- |
| **O nás** | `/about-us` | `about-us/page.tsx` | Informácie o poslaní a tíme Frafol. |
| **Kontaktujte nás** | `/contact-us` | `contact-us/page.tsx` | Kontaktný formulár, email, adresa. |
| **Ako to funguje (Pre tvorcov)** | `/how-it-works` | `how-it-works/page.tsx` | Návod a podmienky pre fotografov a kameramanov. |
| **Ako funguje objednávanie (Pre klientov)** | `/how-ordering-works` | `how-ordering-works/page.tsx` | Postup vytvorenia dopytu a rezervácie služieb. |
| **Zmluvné vzťahy (VOP)** | `/terms-of-service` | `terms-of-service/page.tsx` | Všeobecné obchodné podmienky pre zmluvné vzťahy. |
| **Online trh (VOP Bazár)** | `/terms-of-service-marketplace` | `terms-of-service-marketplace/page.tsx` | Obchodné podmienky pre nákup a predaj techniky. |
| **GDPR a Ochrana údajov** | `/data-protection` | `data-protection/page.tsx` | Zásady spracúvania a ochrany osobných údajov. |
| **Kompatibilita webu** | `/website-functionality-compatibility` | `website-functionality-compatibility/page.tsx` | Technické požiadavky na prehliadače a zariadenia. |
| **Algoritmus vyhľadávania** | `/search-algorithm` | `search-algorithm/page.tsx` | Vysvetlenie princípov radenia a odporúčania profilov. |

---

## 8. API Route Handlers

Aplikácia obsahuje nasledujúce serverové Route Handlers:

1. **`GET /api/video-proxy`**
   - **Súbor:** `src/app/api/video-proxy/route.ts`
   - **Účel:** Proxy endpoint pre streamovanie videí z backend úložiska s podporou `Range` hlavičiek a obídením CORS reštrikcií pre generovanie canvas miniatúr na klientskej strane.
   - **Parametre:** `?src=/uploads/...`

2. **`GET /logout`**
   - **Súbor:** `src/app/logout/route.ts`
   - **Účel:** Bezpečné serverové odhlásenie — vymazanie autorizačných cookies (`frafolMainAccessToken`, `frafolMainRefreshToken`) s HTTP 302 presmerovaním na `/sign-in`.

---

## 9. Prehľadová matica všetkých záložiek (Tabs Summary Table)

Nasledujúca tabuľka obsahuje každú stránku v projekte, ktorá obsahuje záložky (Tabs / Sub-tabs), ich presné kľúče a vizuálne popisy:

| Stránka / Umiestnenie | Kľúč parametra | Hodnota záložky (Value) | Zobrazený text (Label) | Popis / Účel |
| :--- | :--- | :--- | :--- | :--- |
| **Domov** (`/`) | `?tab=` | `photoGraphy` *(predvolená)* | Fotografia | Zobrazenie fotografických kategórií |
| | | `videoGraphy` | Videografia | Zobrazenie video kategórií |
| **Registrácia Tvorcu** (`/sign-up/professional/choose-specialization`) | `?tab=` | `photography` | Fotografia | Výber špecializácií pre foto |
| | | `videography` | Videografia | Výber špecializácií pre video |
| **Bazár** (`/marketplace`) | `?category=` | `all` *(predvolená)* | Všetko (All) | Všetky inzeráty techniky |
| | | `[categoryId]` | Dynamický názov | Konkrétna kategória (Kamery, Drony, ...) |
| **Užitočné dokumenty** (`/helpful-documents`) | vnútorný stav | `creativeDocuments` *(predvolená)* | Creative Documents | Tvorivé PDF šablóny (Storyboard, ...) |
| | | `legalDocument` | Legal Document | Vzory zmlúv a súhlasov (.docx) |
| **Klientske objednávky** (`/dashboard/my-account/orders`) | `?tab=` | `currentOrder` *(predvolená)* | Aktuálna objednávka | Zákazky v riešení |
| | | `toConfirm` | Potvrdiť doručenie | Čaká na potvrdenie prevzatia |
| | | `delivered` | Doručené | Ukončené objednávky |
| | | `pending` | Odoslaný formulár | Odoslané klientske dopyty |
| | | `orderOffer` | Návrh objednávky | Cenové a časové návrhy od tvorcov |
| | | `accepted` | Čaká sa na platbu | Schválené dopyty pred úhradou |
| | | `cancelRequest` | Potvrdenie zrušenia | Požiadavky na zrušenie |
| | | `cancelled` | Zrušené | Stornované zákazky |
| **Klientsky nákup bazáru** (`/dashboard/my-account/gear-order`) | `?tab=` | `currentOrder` *(predvolená)* | Aktuálna objednávka | Prebiehajúce objednávky tovaru |
| | | `toConfirm` | Na potvrdenie | Zásielka na ceste |
| | | `delivered` | Doručené | Prevzatý tovar |
| | | `cancelled` | Zrušené | Zrušené nákupy |
| **Klientske recenzie** (`/dashboard/my-account/reviews`) | `?tab=` | `allReviews` *(predvolená)* | Všetky recenzie | Udelené recenzie tvorcom |
| | | `pendingReviews` | Čakajúce recenzie | Zákazky čakajúce na ohodnotenie |
| **Klientsky profil** (`/dashboard/my-account/profile-settings`) | `?tab=` | `profile` *(predvolená)* | Edit Profile | Úprava osobných údajov |
| | | `changePassword` | Change Password | Zmena hesla |
| | | `deleteAccount` | Delete Account | Žiadosť o zmazanie účtu |
| **Profesionálne zákazky** (`/dashboard/professional/event-orders`) | `?tab=` | `pending` *(predvolená)* | Čakajúca žiadosť | Nové dopyty od klientov |
| | | `accepted` | Čaká sa na platbu | Akceptované, čaká na úhradu |
| | | `upcoming` | Nadchádzajúce objednávky | Pripravené na realizáciu |
| | | `inProgress` | Prebieha | Focenie / strih / postprodukcia |
| | | `toConfirm` | Na potvrdenie | Odovzdané dielo |
| | | `delivered` | Doručené | Dokončené a schválené |
| | | `cancelRequest` | Potvrdenie zrušenia | Žiadosť o storno |
| | | `cancelled` | Zrušené | Stornované |
| **Profesionálny nákup bazáru** (`/dashboard/professional/gear-purchases`) | `?tab=` | `currentOrder` *(predvolená)* | Aktuálna objednávka | Zakúpená technika |
| | | `toConfirm` | Na potvrdenie | Potvrdenie doručenia zásielky |
| | | `delivered` | Doručené | Doručená technika |
| | | `cancelled` | Zrušené | Stornované nákupy |
| **Profesionálne kurzy** (`/dashboard/professional/workshop`) | `?tab=` | `approved` *(predvolená)* | Aktívne | Schválené aktívne kurzy |
| | | `pending` | Čakajúce | Kurzy čakajúce na schválenie |
| **Profesionálne balíky** (`/dashboard/professional/packages`) | `?tab=` | `approved` *(predvolená)* | Aktívne | Zverejnené balíky služieb |
| | | `pending` | Čakajúce | Balíky čakajúce na schválenie |
| **Profesionálne zárobky** (`/dashboard/professional/earning`) | `?type=` | `event` *(predvolená)* | Podujatia | Tržby z foto/video služieb |
| | | `gear` | Bazár | Tržby z predaja techniky |
| | | `workshop` | Kurzy | Tržby zo vstupného na workshopy |
| **Nastavenia profilu tvorcu** (`/dashboard/professional/profile-settings`) | `?tab=` | `profile` *(predvolená)* | Upraviť profil | Úprava profilových údajov |
| | | `portfolio` | Portfólio | Správa prezentačných materiálov |
| | | `accountCredentials` | Prihlasovacie údaje | Fakturácia a bankové spojenie |
| | | `unavailability` | Nedostupnosť | Blokovanie termínov v kalendári |
| | | `changePassword` | Zmeniť heslo | Zmena hesla |
| | | `deleteAccount` | Zmazať účet | Žiadosť o zrušenie účtu |
| ↳ **Vnorené záložky Portfólia** (`profile-settings?tab=portfolio`) | `?portfolio=` | `introVideo` *(predvolená)* | Intro Video | Úvodné video tvorcu |
| | | `bannerImage` | Banner Image | Hlavný banner profilu |
| | | `galleryImage` | Gallery Image | Ukážky fotografií a videí |

---

## 10. Notifikačný systém a mapa presmerovaní (Notification Redirection Map)

Implementované v module [`src/utils/notificationRedirect.ts`](file:///D:/Projects/Frafol/frafol-website/src/utils/notificationRedirect.ts) prostredníctvom funkcie `getNotificationRedirectUrl(notification, role)`.

Nasledujúca matica definuje presné presmerovanie podľa typu notifikácie pre **Zákazníka / Klienta** (`role: "user" | "company"`) a pre **Profesionála / Tvorcu** (`role: "photographer" | "videographer" | "both"`):

| Typ notifikácie (Backend Enum) | Trasa pre Klienta (User) | Trasa pre Profesionála | Význam / Udalosť |
| :--- | :--- | :--- | :--- |
| **`DirectBookingRequest`** | `/dashboard/my-account/orders?tab=pending` | `/dashboard/professional/event-orders?tab=pending` | Nová priama rezervácia foto/video termínu |
| **`CustomBookingRequest`** | `/dashboard/my-account/orders?tab=pending` | `/dashboard/professional/event-orders?tab=pending` | Nový individuálny dopyt na mieru |
| **`BookingAccepted`** | `/dashboard/my-account/orders?tab=accepted` | `/dashboard/professional/event-orders?tab=accepted` | Zákazka akceptovaná, čaká sa na platbu |
| **`DirectBookingAccepted`** | `/dashboard/my-account/orders?tab=accepted` | `/dashboard/professional/event-orders?tab=accepted` | Priama rezervácia prijatá tvorcom (Čaká sa na platbu) |
| **`CustomBookingAccepted`** | `/dashboard/my-account/orders?tab=orderOffer` | `/dashboard/professional/event-orders?tab=accepted` | Návrh dopytu prijatý tvorcom (Ponuka zákazky / Návrh objednávky) |
| **`BookingPaymentPending`** | `/dashboard/my-account/orders?tab=accepted` | `/dashboard/professional/event-orders?tab=accepted` | Výzva na úhradu zákazky |
| **`BookingProcessing`** | `/dashboard/my-account/orders?tab=currentOrder` | `/dashboard/professional/event-orders?tab=upcoming` | Platba úspešná, zákazka je zaradená |
| **`DirectBookingInProgress`** | `/dashboard/my-account/orders?tab=currentOrder` | `/dashboard/professional/event-orders?tab=inProgress` | Tvorca fotí/točí alebo spracováva dielo |
| **`CustomBookingInProgress`** | `/dashboard/my-account/orders?tab=currentOrder` | `/dashboard/professional/event-orders?tab=inProgress` | Zákazka je v procese realizácie |
| **`DeliveryRequest`** | `/dashboard/my-account/orders?tab=toConfirm` | `/dashboard/professional/event-orders?tab=toConfirm` | Dielo odovzdané, čaká sa na potvrdenie klienta |
| **`DeliveryAccepted`** | `/dashboard/my-account/orders?tab=delivered` | `/dashboard/professional/event-orders?tab=delivered` | Klient potvrdil prevzatie |
| **`BookingCompleted`** | `/dashboard/my-account/orders?tab=delivered` | `/dashboard/professional/event-orders?tab=delivered` | Zákazka úspešne dokončená |
| **`DeliveryRequestDeclined`** | `/dashboard/my-account/orders?tab=currentOrder` | `/dashboard/professional/event-orders?tab=inProgress` | Klient odmietol odovzdanie / žiada úpravy |
| **`BookingRejected`** | `/dashboard/my-account/orders?tab=cancelled` | `/dashboard/professional/event-orders?tab=cancelled` | Dopyt bol odmietnutý |
| **`OrderDeclined`** | `/dashboard/my-account/orders?tab=cancelled` | `/dashboard/professional/event-orders?tab=cancelled` | Objednávka bola odmietnutá |
| **`OrderCancelled`** | `/dashboard/my-account/orders?tab=cancelled` | `/dashboard/professional/event-orders?tab=cancelled` | Objednávka bola zrušená |
| **`CancelRequest`** | `/dashboard/my-account/orders?tab=cancelRequest` | `/dashboard/professional/event-orders?tab=cancelRequest` | Žiadosť o storno / zrušenie termínu |
| **`CancelRequestDeclined`** | `/dashboard/my-account/orders?tab=currentOrder` | `/dashboard/professional/event-orders?tab=inProgress` | Žiadosť o storno bola zamietnutá |
| **`RefundRequired`** | `/dashboard/my-account/payments` | `/dashboard/professional/payments` | Nutná refundácia platby |
| **`ExtensionRequest`** | `/dashboard/my-account/extension-requests` | `/dashboard/professional/event-orders?tab=inProgress` | Žiadosť tvorcu o predĺženie lehoty dodania |
| **`ExtensionAccepted`** | `/dashboard/my-account/orders?tab=currentOrder` | `/dashboard/professional/event-orders?tab=inProgress` | Predĺženie lehoty bolo klientom schválené |
| **`ExtensionRejected`** | `/dashboard/my-account/orders?tab=currentOrder` | `/dashboard/professional/event-orders?tab=inProgress` | Predĺženie lehoty bolo zamietnuté |
| **`WorkshopAdded`** | `/workshops` | `/dashboard/professional/workshop?tab=pending` | Kurz pridaný (čaká na schválenie) |
| **`WorkshopApproved`** | `/workshops` | `/dashboard/professional/workshop?tab=approved` | Kurz schválený administrátorom |
| **`WorkshopDeclined`** | `/workshops` | `/dashboard/professional/workshop?tab=pending` | Kurz neschválený administrátorom |
| **`WorkshopNewParticipant`**| `/dashboard/my-account/my-workshop` | `/dashboard/professional/workshop?tab=approved` | Nový účastník prihlásený na kurz |
| **`PackageAdded`** | `/` | `/dashboard/professional/packages?tab=pending` | Balík služieb pridaný |
| **`PackageApproved`** | `/` | `/dashboard/professional/packages?tab=approved` | Balík schválený |
| **`PackageDeclined`** | `/` | `/dashboard/professional/packages?tab=pending` | Balík neschválený administrátorom |
| **`GearAdded`** | `/marketplace` | `/dashboard/professional/gear-marketPlace` | Inzerát techniky pridaný |
| **`GearMarketplaceApproved`**| `/marketplace` | `/dashboard/professional/gear-marketPlace?filter=In%20Stock` | Inzerát schválený v bazári |
| **`GearMarketplaceDeclined`**| `/marketplace` | `/dashboard/professional/gear-marketPlace` | Inzerát neschválený |
| **`GearOrderSold`** | `/dashboard/my-account/gear-order?tab=currentOrder` | `/dashboard/professional/gear-order` | Tovar z bazáru bol zakúpený |
| **`GearPaymentReceived`** | `/dashboard/my-account/gear-order?tab=currentOrder` | `/dashboard/professional/gear-order` | Platba za techniku prijatá |
| **`GearDeliveryRequest`** | `/dashboard/my-account/gear-order?tab=toConfirm` | `/dashboard/professional/gear-order` | Tovar odoslaný / čaká na potvrdenie prevzatia |
| **`GearDeliveryAccepted`** | `/dashboard/my-account/gear-order?tab=delivered` | `/dashboard/professional/gear-order` | Kupujúci potvrdil prevzatie techniky |
| **`GearDeliveryDeclined`** | `/dashboard/my-account/gear-order?tab=currentOrder` | `/dashboard/professional/gear-order` | Kupujúci nahlásil problém s doručením |
| **`GearOrderCancelled`** | `/dashboard/my-account/gear-order?tab=cancelled` | `/dashboard/professional/gear-order` | Objednávka z bazáru zrušená |
| **`ReviewRequest`** | `/dashboard/my-account/reviews?tab=pendingReviews` | `/dashboard/professional/review` | Žiadosť o udelenie recenzie / Nová recenzia |
| **`AccountDeleteRequest`** | `/dashboard/my-account/profile-settings?tab=deleteAccount` | `/dashboard/professional/profile-settings?tab=deleteAccount` | Žiadosť o vymazanie účtu |
| **`AccountDeleteApproved`**| `/sign-in` | `/sign-in` | Účet zmazaný (odhlásenie) |
| **`AccountDeleteRejected`**| `/dashboard/my-account/profile-settings?tab=deleteAccount` | `/dashboard/professional/profile-settings?tab=deleteAccount` | Žiadosť o zmazanie účtu zamietnutá |
| **`ProfileDeclined`** | `/dashboard/my-account/profile-settings?tab=profile` | `/dashboard/professional/profile-settings?tab=profile` | Profil neschválený administrátorom |
| **`CommunityRejected`** | `/dashboard/my-account/my-community-posts` | `/dashboard/professional/my-community-posts` | Diskusný príspevok neschválený |
| **`CommunityDeleted`** | `/dashboard/my-account/my-community-posts` | `/dashboard/professional/my-community-posts` | Diskusný príspevok zmazaný |
| **`NewComment`** | `/dashboard/my-account/my-community-posts` *(alebo `/forums/[id]`)* | `/dashboard/professional/my-community-posts` *(alebo `/forums/[id]`)* | Nový komentár k téme |
| **`CommentReply`** | `/dashboard/my-account/my-community-posts` *(alebo `/forums/[id]`)* | `/dashboard/professional/my-community-posts` *(alebo `/forums/[id]`)* | Odpoveď na komentár |
| **`newMessage`** | `/message` *(alebo `/message?room=[roomId]`)* | `/message` *(alebo `/message?room=[roomId]`)* | Nová správa v chate |
| **`AdminNotice`** | `/dashboard/my-account/overview` | `/dashboard/professional/overview` | Systémové hlásenie administrátora |
| **`added`** | `/dashboard/my-account/overview` | `/dashboard/professional/overview` | Všeobecné systémové oznámenie |

