import USMColumn from "./column";
import USMLine from "./line";
import USMPie from "./pie";

const USMChart = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div 
        style={{
          width: "60%",
        }}
      >
        <USMColumn />
      </div>
      <div 
        style={{
          width: "30%",
        }}
      >
        <USMPie />
      </div>
      <div 
        style={{
          width: "100%",
          margin: "20px 0px",
        }}
      >
        <USMLine />
      </div>
    </div>
  )
}

export default USMChart