import { ResponsiveLine } from '@nivo/line'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';




const LineChart = ()=>{

    // const [isLineChart,setIsLinechart] = useState({lineChartUsersData:[],lineChartReportsData:[],lineChartPostsData:[]})
    const [userData,setUserData] = useState([])
    const [postData,setPostData] = useState([])
    const [reportData,setReportData] = useState([])

    const token =   useSelector((state)=>state.adminState.adminToken)

    const getDailyReportsCount = async () => {
      
        const response = await fetch("http://localhost:3001/admin/linechart", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        
        // dispatch(
        //     setAllCount({
        //         dashboard:data
        //     })
        // )
        setUserData(data.lineChartUsersData);
        setPostData(data.lineChartPostsData)
        setReportData(data.lineChartReportsData)
        // console.log(">>>>>>>>",data);
        
      };

      useEffect(() => {
        getDailyReportsCount()

      }, [])

      const linechart = [
        // {
        //   id: "Users",
        //   color: "hsl(71, 70%, 50%)",
        //   data: userData
        // // // // //   [
        // // // // //     { x: "05-05-2023", y: 4 },
        // // // // //     { x: "06-05-2023", y: 5 },
        // // // // //     { x: "07-05-2023", y: 0 },
        // // // // //     { x: "08-05-2023", y: 1 },
        // // // // //   ],
        // },
      
        {
          id: "Posts",
          color: "hsl(157, 70%, 50%)",
          data: postData
        // //   [
        // //     { x: "05-05-2023", y: 2 },
        // //     { x: "06-05-2023", y: 3 },
        // //     { x: "07-05-2023", y: 1 },
        // //     { x: "08-05-2023", y: 2 },
        // //   ],
        },
    //     {
    //         id: "Reports",
    //         color: "hsl(214, 70%, 50%)",
    //         data:reportData
    //       // // // // // //   [
    //       // // // // // //     { x: "05-05-2023", y: 0 },
    //       // // // // // //     { x: "06-05-2023", y: 1 },
    //       // // // // // //     { x: "07-05-2023", y: 4 },
    //       // // // // // //     { x: "08-05-2023", y: 2 },
    //       // // // // // //   ],
    //       },
      ];
      


    return(
        <ResponsiveLine
        data={linechart}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Daily Report',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
    )
}

export default LineChart