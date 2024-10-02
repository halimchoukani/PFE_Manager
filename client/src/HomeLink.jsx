import { Button } from "@material-tailwind/react";
import { defaults } from "autoprefixer";
import { TiHome } from "react-icons/ti";
import { Link } from "react-router-dom";

export function HomeLink() {
  return (
    <Link to="/">
      <Button className="relative left-1/2 -translate-x-1/2">
        <TiHome color="white" />
      </Button>
    </Link>
  );
}
