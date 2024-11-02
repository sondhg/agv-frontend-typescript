import { HomeAbout } from "./sections/HomeAbout";
import { HomeServices } from "./sections/HomeServices";

export function Home() {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <HomeAbout />
        <HomeServices />
      </div>
    </>
  );
}
