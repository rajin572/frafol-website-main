# Frafol Website Translation Handbook

## Task Overview

Translate the Frafol website from English to Slovak (slovenčina) based on the CSV file `Frafol Drive Issues - Translation Website Part 1.csv`. This handbook documents all completed translations for both Part 1 (Home Page & Related) and Part 2 (Additional Pages & Components).

**Key Requirements:**

- Comment out English texts (do NOT remove them)
- Add Slovak translations
- Do NOT change any design or CSS classes
- Preserve all functionality

## Translation Approach

For each file:

1. Find English text strings in JSX/TSX components
2. Comment out the English text using `{/* English text */}` format
3. Add Slovak translation below or as replacement
4. Keep all className, props, and structure unchanged

## Completed Files

### Page Files (src/app/(withNavFooter)/)

1. **data-protection/page.tsx**
   - Page title: "General Data Protection Regulation." → "Všeobecné nariadenie o ochrane osobných údajov."

2. **framework-agreement/page.tsx**
   - Page title: "Framework Agreement/rámcová zmluva" → "Rámcová zmluva"

3. **how-ordering-works/page.tsx**
   - Page title: "How Ordering Works" → "Ako funguje objednávanie"

4. **how-it-works/page.tsx**
   - Page title: "How It Works" → "Ako to funguje"

5. **marketplace/page.tsx**
   - Metadata title: "Frafol - Photography" → "Frafol – Bazár"

6. **photography/page.tsx**
   - Metadata title: "Frafol - Photography" → "Frafol – Fotografia"

7. **professionals/page.tsx**
   - Metadata title: "Frafol - Professionals" → "Frafol – Tvorcovia"

8. **videography/page.tsx**
   - Metadata title: "Frafol - Videography" → "Frafol – Video"

9. **workshops/page.tsx**
   - Metadata title: "Frafol - Workshops" → "Frafol – Kurzy"
   - Banner title: "Workshops" → "Kurzy"

10. **forums/page.tsx**
    - Banner title: "Forum" → "Diskusie"

11. **success/page.tsx**
    - No translation needed (uses PaymentSuccess component)

12. **terms-of-service/page.tsx**
    - Page title: "Terms of Service Conceptural" → "Všeobecné obchodné podmienky Zmluvné vzťahy"

### Component Files

13. **Photography/PhotographyPage.tsx**
    - Section header title and description
    - Button: "See All Photographers" → "Zobraziť všetkých fotografov"

14. **Workshops/WorkshopsPage.tsx**
    - Section header title and description

15. **Forum/ForumPage.tsx**
    - Section header title and description

16. **Forum/ForumNewPost.tsx**
    - Button: "New Post" → "Nový príspevok"

17. **Forum/ForumAllComents.tsx**
    - Heading: "Replies" → "Odpovede"

18. **Forum/ForumReplyCard.tsx**
    - Button: "Reply" → "Odpovedať"
    - Button: "Hide Replies" → "Skryť odpovede"
    - Button: "View Replies (N)" → "Zobraziť odpovede (N)"

19. **Forum/ForumSubmitReply.tsx**
    - Label: "Replying to:" → "Odpovedáte:"
    - Placeholder: "Write your reply here..." → "Napíšte svoju odpoveď tu..."
    - Button: "Post Comment" → "Odoslať komentár"

20. **HelpfulDocuments/HelpfulDocumentsPage.tsx**
    - Page title and description

21. **shared/PaymentSuccess.tsx**
    - Heading: "Payment Successful!" → "Platba bola úspešná!"
    - Button: "Continue" → "Pokračovať"
    - Text: "Need help? Contact" → "Potrebujete pomoc? Kontaktujte"

22. **MarketPlace/MarketPlacePage.tsx**
    - Banner and section header titles
    - Description
    - Button: "Add New Gear" → "Pridať nové príslušenstvo"

23. **Professional/AllProfessionalPage.tsx**
    - Section header title and description
    - Button: "Back To Categories" → "Späť na kategórie"

24. **Videographey/VideographeyPage.tsx**
    - Section header title and description
    - Button: "See All Videographers" → "Zobraziť všetkých kameramanov"

## Translation Pattern Example

### Before (English):

```tsx
<SectionHeader
  title="Featured Professionals"
  description="Discover our top-rated photographers and videographers"
/>
<button>See All Professionals</button>
```

### After (Slovak):

```tsx
{/* title="Featured Professionals" */}
{/* description="Discover our top-rated photographers and videographers" */}
<SectionHeader
  title="Odporúčaní fotografi a kameramani"
  description="Objavte našich najlepšie hodnotených fotografov a kameramanov"
/>
<button>
  {/* See All Professionals */}
  Zobraziť všetkých fotografov a kameramanov
</button>
```

## Important Notes

1. **Comment Format**: Use `{/* English text */}` for comments in JSX
2. **No Design Changes**: Only text content was changed - all className, styles, and structure preserved
3. **CSV Compliance**: All translations follow the CSV file exactly
4. **Special Characters**: Slovak characters (á, é, í, ó, ú, ý, č, ď, ľ, ň, š, ť, ž) are properly encoded

## Completed Translations Summary

### Part 1 - Home Page & Related Components

- Home Page components (Banner, FAQ, Footer, etc.)
- About Us page
- Cart page
- Contact Us page

### Part 2 - Additional Pages & Components

- Data Protection page
- Framework Agreement page
- How Ordering Works page
- How It Works page
- Marketplace page and components
- Photography page and components
- Professionals page and components
- Videography page and components
- Workshops page and components
- Forums pages and components
- Forum Details components
- Helpful Documents page and components
- Success page component
- Terms of Service pages

<<<<<<< HEAD

### Part 3 - Dashboard Pages & Components

#### User Dashboard

| CSV Section                     | Component File          | Status |
| ------------------------------- | ----------------------- | ------ |
| Dashboard - My Account Overview | Overview.tsx            | ✓      |
| Dashboard - My Account Overview | OverviewCards.tsx       | ✓      |
| Dashboard - My Account Overview | RecentNotification.tsx  | ✓      |
| Dashboard - My Account Overview | ActionRequired.tsx      | ✓      |
| Dashboard - Orders              | UserOrdersPage.tsx      | ✓      |
| Dashboard - Orders              | UserOrdersOverview.tsx  | ✓      |
| Dashboard - Orders              | UserOrderCard.tsx       | ✓      |
| Dashboard - My Payments         | UserPaymentPage.tsx     | ✓      |
| Dashboard - My Payments         | PaymentsCard.tsx        | ✓      |
| Dashboard - My Payments         | PaymentViewModal.tsx    | ✓      |
| Dashboard - Profile Settings    | ProfileSettingsPage.tsx | ✓      |
| Dashboard - User Review         | UserReviewPage.tsx      | ✓      |
| Dashboard - My Workshop (User)  | UserWorkshopPage.tsx    | ✓      |
| Dashboard - Extension Requests  | ExtensionRequest.tsx    | ✓      |
| Dashboard - Sidebar Menu (User) | dashboardMenuItems.tsx  | ✓      |

#### Professional Dashboard

| CSV Section                       | Component File                | Status |
| --------------------------------- | ----------------------------- | ------ |
| Dashboard - Professional Overview | ProfessionalOverviewCards.tsx | ✓      |
| Dashboard - Calendar              | CalendarPage.tsx              | ✓      |
| Dashboard - Professional Earnings | EarningsPage.tsx              | ✓      |
| Dashboard - Event Orders          | EventOrdersPage.tsx           | ✓      |
| Dashboard - Gear Marketplace      | GearMarketplacePage.tsx       | ✓      |
| Dashboard - Packages              | PackagesPage.tsx              | ✓      |
| Dashboard - Professional Review   | ReviewPage.tsx                | ✓      |
| Dashboard - Frafol Choice         | FrafolChoiceSection.tsx       | ✓      |
| Dashboard - Sidebar Menu (Prof)   | dashboardMenuItems.tsx        | ✓      |

#### Dashboard CSV – Remaining Items (follow-up session)

Source: `Frafol Drive Issues - Translation Dashboard for user and professional.csv`

| CSV Section                         | Component File               | Status | Notes                                                                            |
| ----------------------------------- | ---------------------------- | ------ | -------------------------------------------------------------------------------- |
| Dashboard - Workshops (Card)        | ProfessionalWorkshopCard.tsx | ✓      | "Show less"/"...Show more", "View Participants", "VAT Included:"                 |
| Dashboard - Profile Settings        | EditProfile.tsx (shared)     | ✓      | **CSV-listed fields only** (see decision below)                                  |
| Dashboard - Profile Settings (Prof) | profile-settings/page.tsx    | n/a    | Reuses the same `ProfileSettingsPage` component (already done)                   |
| Dashboard - Professional (Landing)  | professional/page.tsx        | n/a    | Renders `NotFoundPage` only – no "Welcome to your dashboard" text exists in code |

**Profile Settings scope decision:** The Profile Settings form lives in the shared
`src/components/shared/EditProfile.tsx` and contains ~40 fields, most of which are NOT in
the CSV (Street Address, Country, Zip Code, Company Name, IČO/DIČ/IČ DPH, Min/Max Rate,
specializations, Date of Birth, etc.). Per the user's instruction, only the **CSV-listed
fields** were translated; all other labels intentionally remain in English. Translated
fields: Full name → Celé meno, Enter your full name → Zadajte svoje celé meno, Full name is
required → Celé meno je povinné., Email → E-mail, Phone number → Telefónne číslo, Town →
Mesto, Select your town → Vyberte svoje mesto, About Me → O mne (Bio/About), Submit → Uložiť
zmeny (Save Changes), Updating profile... → Čakajte, prosím... (loading), Profile updated
successfully! → Profil bol úspešne aktualizovaný!

- "Profile Image → Profilový obrázok" and "Add Image → Pridať obrázok" had **no matching
  source string** in the code (image upload is icon-only / different wording) → nothing to
  comment out, left as-is.
- Object-literal labels use the in-feature pattern `/* label: "English", */` on the line
  above the active Slovak value (matching `ProfileSettingsPage.tsx`).

#### Dashboard CSV – Full audit pass (missed modals / cards / tables / forms)

**Important correction:** the earlier dashboard pass only translated the page-level wrapper
components and overview cards. A full audit found many **modals, cards, tables and forms**
that were never touched (they were not in the original git-modified list). These were
translated on a **strict CSV-only basis** (only strings that map to a `Frafol Drive Issues -
Translation Dashboard for user and professional.csv` entry; every non-CSV label — Commission,
Net Earning, Shipping, VAT, Order Type, Coupon, etc. — intentionally left in English).

| Feature                                   | Files translated (CSV strings only)                                                                             |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Earnings                                  | EventEarningTable, WorkshopEarningTable, GearEarningTable, EarningViewModal, TransactionViewModal               |
| Gear Marketplace                          | GearMarketPlaceAddNewGear, GearMarketPlaceEditNewGear, GearMarketViewModal                                      |
| Packages                                  | ProfessionalAddNewPackageModal, ProfessionalEditPackageModal, ProfessionalPackageCard                           |
| Event Orders                              | ProfessionalEventViewModal (full Order-View-Modal CSV section), EventCreateOrderModal, EventOrdersOverview      |
| Shared tables (`src/components/ui/Table`) | ProfessionalEventOrderTable, GearOrderTable, GearMarketPlaceTable, ProfessionalReviewTable, TransactionTable    |
| User Orders                               | UserOrderCard (residual "View Details"), UserGearOrderCard, UserGearViewModal, UserGearOrderPage (title + tabs) |
| Reviews                                   | ReviewViewModal (professional), UserReviewCreateModal, UserReviewEditModal                                      |
| Payments                                  | UserPaymentCard (Total Spent / Total Orders)                                                                    |
| Frafol Choice                             | PricingCard ("Download Invoice")                                                                                |
| Overview                                  | ProfessionalOverviewCalender (day abbreviations Mo→Po … Su→Ne)                                                  |

**Notes / conventions applied in this pass:**

- Where the code wording differs from the CSV but the field clearly corresponds to a CSV row
  in that section, the CSV translation was mapped by field role (e.g. gear form "Product
  Name"/"Item Price" → the CSV gear-form "Gear Name"/"Price" Slovak; submit buttons "Add
  Gear"/"Add Package"/"Update …" → CSV "Submit → Odoslať").
- Gear terminology follows the CSV split: gear **listing** form/view uses "príslušenstvo"
  (CSV _Add New Gear Form_), gear **order** table uses "produktu" (CSV _Gear Order_).
- "View Details" = "Zobraziť detaily" everywhere **except** the Professional Review table,
  where the CSV specifies "Zobraziť podrobnosti".
- Comment styles: JSX text `{/* English */}` above Slovak; object literals `/* title: "…", */`
  above; JSX props / inline expressions use `/* "English" */` block comments before the value.
- **Deliberately left English (not a CSV section):** shared confirmation modals
  (CancleOrderModal, DeclineOrderRequestModal, ExtenstionRequestModal, Accept/Block/Delete
  modals), non-CSV toast/loading messages, and non-CSV form fields.

### Part 4 - Authentication Pages & Components (Auth)

=======

### Part 3 - Authentication Pages & Components (Auth)

> > > > > > > 6c7a5cefe27de8140aba8d28b8aea82ae33543d8

| CSV Section                       | Component File                  | Status |
| --------------------------------- | ------------------------------- | ------ |
| Auth - Forgot Password            | FotgotPassword.tsx              | ✓      |
| Auth - Sign In                    | SignIn.tsx                      | ✓      |
| Auth - Join Frafol                | JoinFrafol.tsx                  | ✓      |
| Auth - Update Password            | UpdatePassword.tsx              | ✓      |
| Auth - Choose Role                | ChooseRole.tsx                  | ✓      |
| Auth - Choose Specialization      | ChooseSpecialization.tsx        | ✓      |
| Auth - Personal Information       | PersonalInformation.tsx         | ✓      |
| Auth - Additional Information     | AdditionalInformation.tsx       | ✓      |
| Auth - Legal Invoice              | LegalInvoiceDetails.tsx         | ✓      |
| Auth - Professional OTP Verify    | SignUpProfessionalOTPVerify.tsx | ✓      |
| Auth - Review Details             | ReviewDetailsAndSubmit.tsx      | ✓      |
| Auth - Sign Up User               | SignUpUser.tsx                  | ✓      |
| Auth - Sign Up User OTP Verify    | SignUpUserOTPVerify.tsx         | ✓      |
| Auth - Forgot Password OTP Verify | ForgetPasswordOTPVerify.tsx     | ✓      |

### Not in Scope

- Notification page (empty page - no content to translate)
- Dashboard pages
- Modal components (except those directly related to translated pages)

## File Structure

```
src/
├── app/
│   └── (withNavFooter)/
│       ├── data-protection/page.tsx ✓
│       ├── framework-agreement/page.tsx ✓
│       ├── how-ordering-works/page.tsx ✓
│       ├── how-it-works/page.tsx ✓
│       ├── marketplace/page.tsx ✓
│       ├── photography/page.tsx ✓
│       ├── professionals/page.tsx ✓
│       ├── videography/page.tsx ✓
│       ├── workshops/page.tsx ✓
│       ├── forums/page.tsx ✓
│       ├── forums/[id]/page.tsx ✓
│       ├── helpful-documents/page.tsx ✓
│       ├── success/page.tsx ✓
│       └── terms-of-service/page.tsx ✓
└── components/
    ├── Auth/
    │   ├── FotgotPassword.tsx ✓
    │   ├── SignIn.tsx ✓
    │   ├── JoinFrafol.tsx ✓
    │   ├── UpdatePassword.tsx ✓
    │   ├── ChooseRole.tsx ✓
    │   ├── ChooseSpecialization.tsx ✓
    │   ├── PersonalInformation.tsx ✓
    │   ├── AdditionalInformation.tsx ✓
    │   ├── LegalInvoiceDetails.tsx ✓
    │   ├── ReviewDetailsAndSubmit.tsx ✓
    │   ├── SignUpUser.tsx ✓
    │   ├── SignUpUserOTPVerify.tsx ✓
    │   ├── SignUpProfessionalOTPVerify.tsx ✓
    │   └── ForgetPasswordOTPVerify.tsx ✓
    ├── Photography/PhotographyPage.tsx ✓
    ├── Videographey/VideographeyPage.tsx ✓
    ├── Professional/AllProfessionalPage.tsx ✓
    ├── Workshops/WorkshopsPage.tsx ✓
    ├── Forum/
    │   ├── ForumPage.tsx ✓
    │   ├── ForumNewPost.tsx ✓
    │   ├── ForumAllComents.tsx ✓
    │   ├── ForumReplyCard.tsx ✓
    │   └── ForumSubmitReply.tsx ✓
    ├── HelpfulDocuments/HelpfulDocumentsPage.tsx ✓
    ├── MarketPlace/MarketPlacePage.tsx ✓
    └── shared/PaymentSuccess.tsx ✓
```

## Verification Checklist

- [x] All English texts commented out with `{/* */}` or `// ` format
- [x] Slovak translations added
- [x] No design/CSS changes made
- [x] All functionality preserved
- [x] CSV translations followed exactly
- [x] No parsing errors in translated files

## CSV Reference

### File: `Frafol Drive Issues - Translation Website Part 1.csv`

- Lines 1-356 translated
- Covers: All pages and components mentioned in Part 1 & Part 2 tasks

### File: `Frafol Drive Issues - Translation Dashboard for user and professional.csv`

- Lines 1-376 – User & Professional dashboard pages/components
- Covers: My Account Overview, Orders + Order View Modal, Professional Overview, Calendar,
  Event Orders, Sidebar Menu, My Payments, Professional Earnings, Professional/User Review,
  Gear Marketplace, Packages, Gear Order, Workshops, Frafol Choice, Profile Settings
  (User & Professional), Message Layout
- Profile Settings rows applied to the shared `EditProfile.tsx` form on a **CSV-listed
  fields only** basis (other form fields intentionally left in English)

### File: `Frafol Drive Issues - Translation Website Auth.csv`

- Lines 1-182 translated
- Covers: All Auth pages and components (Forgot Password, Sign In, Join Frafol, Update Password, Choose Role, Choose Specialization, Personal Information, Additional Information, Legal Invoice, Professional OTP Verify, Review Details, Sign Up User, Sign Up User OTP Verify, Forgot Password OTP Verify)
- Lines 2-9: Forgot Password page
- Lines 14-29: Sign In page
- Lines 33-41: Join Frafol page
- Lines 45-57: Update Password page
- Lines 59-68: Choose Role page
- Lines 70-71: Choose Specialization page
- Lines 73-85: Personal Information page
- Lines 87-96: Additional Information page
- Lines 98-118: Legal Invoice page
- Lines 120-130: Professional OTP Verify page
- Lines 132-138: Review Details page
- Lines 140-162: Sign Up User page
- Lines 164-171: Sign Up User OTP Verify page
- Lines 173-182: Forgot Password OTP Verify page
