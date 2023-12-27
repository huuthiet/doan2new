// import React from "react";
// import { Gauge } from 'bizcharts';


// const ReactCanvasGauge = () => {
//     const data = [
//         { value: 50 },
//       ];
//     return (
//         <div>gauge
//             <Gauge
//                 title={{
//                     visible: true,
//                     text: 'Speed',
//                 }}
//                 height={400}
//                 data={data}
//                 forceFit
//                 min={0}
//                 max={100}
//                 value={50}
//                 range={[0, 100]}
//                 style={{ marginTop: 50 }}
//                 />
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import {
	Chart,
	Point,
	Area,
	Annotation,
	Axis,
	Coordinate,
	registerShape,
	registerAnimation,
} from 'bizcharts';

registerShape('point', 'pointer', {
	draw(cfg, container) {

		const group = container.addGroup();
		console.log(cfg)
		const center = this.parsePoint({ x: 0, y: 0 }); 
		const start = this.parsePoint({ x: 0, y: 0.5 }); 

		const line = group.addShape('line', {
			attrs: {
				x1: center.x,
				y1: center.y,
				x2: cfg.x,
				y2: cfg.y,
				stroke: cfg.color,
				lineWidth: 5,
				lineCap: 'round',
			},
		});
		group.addShape('circle', {
			attrs: {
				x: center.x,
				y: center.y,
				r: 9.75,
				stroke: cfg.color,
				lineWidth: 4.5,
				fill: '#fff',
			},
		});

		const preAngle = this.preAngle || 0;

		const angle1 = Math.atan((start.y - center.y) / (start.x - center.x));
		const angle = (Math.PI - 2 * (angle1)) * cfg.points[0].x;

		
		if (group.cfg.animable) {
			group.animate((ratio) => {
				group.resetMatrix();
				group.rotateAtPoint(center.x, center.y, preAngle + (angle - preAngle) * ratio);
			}, 300);
		} else {
			group.rotateAtPoint(center.x, center.y, angle);
		}
		this.preAngle = angle;

		return group;
	},
});

registerAnimation('cust-animation', (shape) => {
	console.log('cust-animation', shape)
})

const scale = {
				value: {
					min: 0,
					max: 1,
					tickInterval: 0.2,
					formatter: v => v * 100
				}
			}


function ElectricMetter({value}) {
	const [data, setData] = useState([{ value: 0.56 }]);
	useEffect(() => {
		setData([{ value: value}])
	}, [value])


	const arcAnimation = {
		appear: {
			animation: 'path-in',
			duration: 300,
			easing: 'easeLinear',
		},
	};


	return (
		<Chart
			height={200}
			data={data}
			scale={scale}
			autoFit
			// animate={{ duration: 3000, easing: 'easeLinear' }}
		>
			<Coordinate
				type="polar"
				radius={0.6}
				startAngle={(-12 / 10) * Math.PI}
				endAngle={(2 / 10) * Math.PI}
			/>
			<Axis name="1" />
			<Axis
				name="value"
				line={null}
				label={{
					offset: -36,
					style: {
						fontSize: 10,
						textAlign: 'center',
						textBaseline: 'middle',
					},
				}}
				subTickLine={{
					count: 4,
					length: -15,
				}}
				tickLine={{
					length: -24,
				}}
				grid={null}
			/>
			<Point
				position="value*1"
				color="#1890FF"
				// shape="pointer"
				
			/>
			<Annotation.Arc
				start={[0, 1]}
				end={[1, 1]}
				style={{
					stroke: '#CBCBCB',
					lineWidth: 18,
					lineDash: null,
				}}
			/>
			<Annotation.Arc
				start={[0, 1]}
				end={[data[0].value, 1]}
				style={{
					stroke: '#1890FF',
					lineWidth: 18,
					lineDash: null,
				}}
				// animate={arcAnimation}
				// animate="cust-animation"
			/>
		</Chart>
	)
}

// ReactDOM.render(<Demo />, mountNode);

export default ElectricMetter;