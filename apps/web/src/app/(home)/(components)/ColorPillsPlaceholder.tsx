function ColorPillsPlaceholder() {
  return (
    <>
      {[...Array(20)].map((_, index) => (
        <span key={index} style={{ width: "90px" }}></span>
      ))}
    </>
  );
}
