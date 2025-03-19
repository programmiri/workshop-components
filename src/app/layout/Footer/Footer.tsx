import StarTrekImage from "src/assets/images/star_trek.png";
import { Image } from "src/app/components/Image.tsx";

function Footer() {
  return (
    <footer
      className={
        "text-center py-3 d-flex align-items-center justify-content-center"
      }
    >
      <Image
        src={StarTrekImage}
        alt={"This is a picture"}
        type={"fluid"}
        width={20}
        height={20}
      />
      <div className={"ps-2 text-almond-creme"}>Made by Starfleet, really.</div>
    </footer>
  );
}

export { Footer };
