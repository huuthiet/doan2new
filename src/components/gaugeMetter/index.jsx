import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RadialGauge } from '@progress/kendo-react-gauges';
const RadialGaugeComponent = () => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => {
      setValue(Math.ceil(Math.random() * 100));
    }, 1000);
  }, []);
  const radialOptions = {
    pointer: {
      value: value
    }
  };
  return <RadialGauge {...radialOptions} />;
};

export default RadialGaugeComponent;