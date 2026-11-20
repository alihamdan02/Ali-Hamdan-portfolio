/** The AH monogram as a small 3D cube. Spins slowly; faster when its link is hovered. */
export default function Cube() {
  return (
    <span className="b-cube-wrap" aria-hidden="true">
      <span className="b-cube">
        <i>AH</i>
        <i>AH</i>
        <i>{"{}"}</i>
        <i>&gt;_</i>
        <i />
        <i />
      </span>
    </span>
  );
}
