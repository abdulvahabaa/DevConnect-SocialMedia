import { ResponsivePie } from '@nivo/pie'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCount } from 'state/adminState';


const PieChart = ()=>{

    // const [isPieChart,setIsPiechart]= useState()
    const token = useSelector((state) => state.adminState.adminToken);
    const dispatch = useDispatch();
    const dashboardData = useSelector((state)=> state.adminState.dashboard)

    const getUserPostReportCount = async () => {
        
        const response = await fetch("http://localhost:3001/admin/piechart", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        dispatch(
            setAllCount({
                dashboard:data
            })
        )
        // setIsPiechart(data);
        console.log(data);
      };

      useEffect(() => {
        getUserPostReportCount()

      }, [])

       const piedata = [
 
        {
          id: "users",
          label: "users",
          value:dashboardData?.usersCount ,
          color: "hsl(2, 70%, 50%)",
        },
        {
          id: "Reports",
          label: "Reports",
          value: dashboardData?.reportsCount,
          color: "hsl(250, 70%, 50%)",
        },
        {
          id: "posts",
          label: "posts",
          value: dashboardData?.postsCount,
          color: "hsl(243, 70%, 50%)",
        },
       
      ];

      
      

    return(
        <ResponsivePie
        data={piedata}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    )
}

export default PieChart
