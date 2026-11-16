// Home page ("/") route group: same layout as every other public page (footer), but without the
// (withNavFooter) loading.tsx spinner. That spinner is a Suspense boundary around the whole page,
// so the hero (the LCP) was always sent after it; here the hero is in the first HTML instead and
// the data sections stream in with their own skeletons (see page.tsx).
export { default } from "../(withNavFooter)/layout";
