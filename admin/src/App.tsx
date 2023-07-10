import { LoadScript } from "@react-google-maps/api";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];

function App() {
  const mapsKey = process.env.REACT_APP_MAPS_KEY || '';
  const libraries: Libraries = ['places'];

  return (
    <div>
      <LoadScript googleMapsApiKey={mapsKey} libraries={libraries}>
        <RouterProvider router={router} />
      </LoadScript>
    </div>
  );
}

export default App;
