import { JSX } from "react";

const colors = [
  "lima-bean",
  "magenta",
  "mars",
  "moonlit-violet",
  "orange",
  "peach",
  "red",
  "sky",
  "space-white",
  "sunflower",
  "tomato",
  "violet-creme",
];
function ColorBlock({ colorName }: { colorName: string }) {
  return <div style={{ height: "200px" }} className={`bg-${colorName} my-3`} />;
}

function StarfleetLayout({ children }: { children: JSX.Element }) {
  return (
    <div className={"bg-black container-fluid min-vh-100 d-flex flex-row"}>
      <div style={{ width: "200px" }} className={"vh-100 overflow-hidden pe-5"}>
        {colors.map((color, index) => (
          <ColorBlock colorName={color} key={index} />
        ))}
      </div>
      <div className={"w-100 pe-5 d-flex flex-column"}>{children}</div>
    </div>
  );
}

export { StarfleetLayout };
