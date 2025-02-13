import React from 'react';
import HeatMap from '@uiw/react-heat-map';

const value = [
    {date: '2024/11/11', count: 500},
    {date: '2024/11/12', count: 200}
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const HeatMapComponent = () => {
    return (
        <div className={'heatmap'}>
            <HeatMap
                width={1690}
                rectSize={20}
                height={200}
                legendCellSize={30}
                style={{
                    color: 'black',
                    backgroundColor: 'transparent',
                }}
                panelColors={['#e2e2e2', '#adb5bd', '#69747b', '#212529']}
                value={value}
                weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
                monthLabels={months}
                endDate={new Date('2024/11/11')}
                startDate={new Date('2023/6/10')}
            />
        </div>
    )
};

export default HeatMapComponent