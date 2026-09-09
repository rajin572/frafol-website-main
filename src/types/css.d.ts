declare module '*.css';

// Swiper 11 ships its stylesheets as extensionless subpaths (e.g. "swiper/css/effect-fade").
// These have no type declarations, so declare them for side-effect imports.
declare module 'swiper/css';
declare module 'swiper/css/*';
