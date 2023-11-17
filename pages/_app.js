import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0&callback=initMap&libraries=&v=weekly"
        defer
      ></script>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0fUYASQXlqfp1d5EFSIT7_0lg0_OIxq0&libraries=places"></script>

      <Component {...pageProps} />
    </>
  );
}
