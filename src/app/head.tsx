export default function Head() {
  return (
    <>
      {/* Google tag (gtag.js) - Global site tag for analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-4S1ZKXXLT2"></script>
      <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-4S1ZKXXLT2');` }} />
    </>
  );
}
