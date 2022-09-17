import { Flowchart } from '@ant-design/flowchart';
import "@ant-design/flowchart/dist/index.css";

const USMFlowChart = ({CurrentUser, env}) => {

  //eslint-disable-next-line
  const [currentUser, setCurrentUser] = CurrentUser

  return (
    <div style={{ height: 600 }}>
      <Flowchart
        theme='dark'
        onSave={(d) => {
          console.log(d, JSON.stringify(d));
        }}
        toolbarPanelProps={{
          position: {
            top: 0,
            left: 0,
            right: 0,
          },
        }}
        scaleToolbarPanelProps={{
          layout: 'horizontal',
          position: {
            right: 0,
            top: -40,
          },
          style: {
            width: 150,
            height: 39,
            left: 'auto',
            background: 'transparent',
          },
        }}
        canvasProps={{
          position: {
            top: 40,
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}
        nodePanelProps={{
          position: { width: 160, top: 40, bottom: 0, left: 0 },
        }}
        detailPanelProps={{
          position: { width: 200, top: 40, bottom: 0, right: 0 },
        }}
      />
    </div>
  );
};

export default USMFlowChart