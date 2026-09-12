# Všetky mutácie (API Mutácie) vo vašom projekte

Vo vašom projekte (v zložke `src/services`) sa nachádza celkovo **62 mutácií** (API volaní, ktoré modifikujú dáta – `POST`, `PATCH`, `PUT`, `DELETE`). Nižšie je ich kompletný zoznam rozdelený podľa jednotlivých služieb.

### 1. AuthService (`AuthService/index.ts`)
- `registerUser` (POST)
- `registerUserOtp` (POST)
- `resendOtp` (PATCH)
- `loginUser` (POST)
- `forgetPassword` (POST)
- `forgetPasswordOtp` (PATCH)
- `changePassword` (PATCH)
- `getNewToken` (POST)
- `changeUserPassword` (PATCH)
- `switchRole` (PATCH)

### 2. Služba pre komentáre (`ComentsService/ComentsServiceApi.tsx`)
- `addNewComment` (POST)
- `giveLike` (POST)
- `removeLike` (POST)

### 3. Fórum a komunita (`CommunityForumService/CommunityForumServiceApi.tsx`)
- `addNewCommunityPost` (POST)
- `updateCommunityPost` (PATCH)
- `deleteCommunityPost` (DELETE)

### 4. Správy a konverzácie (`ConversationService/ConversationServiceApi.tsx`)
- `createConversation` (POST)
- `sendFiles` (POST)

### 5. Objednávky udalostí (Foto/Video) (`EventOrderService/EventOrderServiceApi.tsx`)
- `createEventOrder` (POST)
- `acceptDirectOrder` (PATCH)
- `acceptCustomOrder` (PATCH)
- `cancelEventOrder` (PATCH)
- `acceptCancelRequest` (PATCH)
- `declineCancelRequest` (PATCH)
- `declineEventOrder` (PATCH)
- `sendDeliveryRequest` (PATCH)
- `sendExtensionRequest` (PATCH)
- `acceptDeliveryRequest` (PATCH)
- `acceptExtensionRequest` (PATCH)
- `declineExtensionRequest` (PATCH)
- `updateGear` (PATCH) *(Pozn.: Nachádza sa v EventOrderService súbore)*
- `deleteGear` (DELETE) *(Pozn.: Nachádza sa v EventOrderService súbore)*

### 6. Objednávky techniky z bazáru (`GearOrder/GearOrderApi.tsx`)
- `gearOrder` (POST)
- `sendGearDeliveryRequest` (PATCH)
- `acceptGearDeliveryRequest` (PATCH)
- `declineGearDeliveryRequest` (PATCH)
- `cancelGearOrder` (PATCH)

### 7. Bazár / Technika (`GearService/GearServiceApi.tsx`)
- `addNewGear` (POST)
- `updateGear` (PATCH)
- `deleteGear` (DELETE)

### 8. Poistenie (`InsuranceService/InsuranceServiceApi.ts`)
- `registerInsurance` (POST)

### 9. Ostatné (Nahlásenia, Spätná väzba, Kontakt) (`Others/OthersApi.tsx`)
- `addReport` (POST)
- `addFeedback` (POST)
- `subscribe` (POST)
- `contactUs` (POST)
- `applyCoupon` (POST)

### 10. Balíčky (`PackageService/PackageServiceApi.ts`)
- `addNewPackage` (POST)
- `updatePackage` (PATCH)
- `deletePackage` (DELETE)

### 11. Platby (`PaymentService/PaymentServiceApi.ts`)
- `completePayment` (POST)

### 12. Profil a nastavenia (`ProfileService/ProfileServiceApi.ts`)
- `updateProfile` (PATCH)
- `updateIntroVIdeo` (POST)
- `updateBannerImage` (PATCH)
- `updateGallery` (PATCH)
- `requestDeleteAccount` (DELETE)
- `updateUnavailableDates` (PATCH)

### 13. Recenzie (`ReviewService/ReviewServiceApi.tsx`)
- `addNewReview` (PUT)
- `updateReview` (PATCH)

### 14. Objednávky workshopov (`WorkshopOrderService/WorkshopOrderServiceApi.tsx`)
- `createWorkshopOrder` (POST)

### 15. Workshopy (`WorkshopService/WorkshopServiceApi.ts`)
- `addNewWrokshop` (POST)
- `updateWrokshop` (PATCH)
- `deleteWrokshop` (DELETE)
