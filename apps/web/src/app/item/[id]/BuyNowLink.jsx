export function BuyNowLink({ data }) {
  {
    /* link opens in a new tab which exposes loom to an attack that redirects the user through the window.opener object */
  }
  return (
    <>
      <a
        href={`${data.link}?ref=loomcairo`}
        target="_blank"
        rel="noopener noreferrer"
        className="buy-now-link"
      >
        <div className="buy-now-button">
          <p>Buy from</p>
          <p style={{ textTransform: "capitalize" }}>{data["brand"]}</p>
        </div>
      </a>
    </>
  );
}
