// Fleissaufgabe?

// <li className={"d-flex list-group-item gap-3"}>
//   <div>Warp-Kern:</div>
//   <div
//     className={clsx(
//       "badge align-self-center",
//       warpCoreStatus === "Critical"
//         ? "text-bg-danger"
//         : "text-bg-success"
//     )}
//   >
//     {warpCoreStatus}
//   </div>
// </li>

// könnte eine eigene Komponente sein, so dass wir es nicht mehrfach definieren müssen.

// VORSICHT: Eine React Komponente die nicht _ausschliesslich_ in einer Liste (ul/ol) verwendet wird, sollte niemals
// einfach ein <li /> zurückgeben. Die Verantwortung dafür sollte ausserhalt der Komponente liegen.
