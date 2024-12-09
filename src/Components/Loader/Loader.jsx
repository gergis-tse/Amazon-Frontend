
import { GridLoader } from "react-spinners";
function Loader() {
  return (
    <div style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"50vh",
    }}>
      <GridLoader color="#1cc1ca" loading />
    </div>
  );
}

export default Loader
