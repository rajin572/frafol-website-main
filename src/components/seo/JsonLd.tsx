// Structured data (schema.org JSON-LD) for search engines and AI assistants.
// `<` is escaped so text from the API (forum posts, descriptions) can never close the script tag.
const JsonLd = ({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
  />
);

export default JsonLd;
