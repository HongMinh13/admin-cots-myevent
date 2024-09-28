"use client"
import dynamic from "next/dynamic";
import "chart.js/auto";
import {
    useGetContractStatisticByYearQuery,
    useGetRevenueStatisticByYearQuery,
    useGetUserStatisticByYearQuery
} from "@/graphql/generated";
import toast from "react-hot-toast";
import { getToken } from "@/lib";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
    ssr: false,
  });
  const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
    ssr: false,
  });
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const backgroundColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];
const borderColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];
const BarChart = () => {
    const { data: revenues, loading } = useGetRevenueStatisticByYearQuery({
        fetchPolicy: "network-only",
        variables: {
          year: new Date().getFullYear(),
        },
        context: {
          headers: {
            Authorization: getToken(),
          },
        },
        onError(error) {
          toast.error(error.message);
        },
    });
    
    const { data: users, loading: loadingUser } = useGetUserStatisticByYearQuery({
        fetchPolicy: "network-only",
        variables: {
          year: new Date().getFullYear(),
        },
        context: {
          headers: {
            Authorization: getToken(),
          },
        },
        onError(error) {
          toast.error(error.message);
        },
    });

    const { data: contracts, loading: loadingContract } = useGetContractStatisticByYearQuery({
        fetchPolicy: "network-only",
        variables: {
          year: new Date().getFullYear(),
        },
        context: {
          headers: {
            Authorization: getToken(),
          },
        },
        onError(error) {
          toast.error(error.message);
        },
    });

    
    const revenueData = Array(12).fill(0);
    revenues?.getRevenueStatisticByYear.result.forEach((result) => {
        revenueData[result.month - 1] = result.revenue;
    });
    //   const revenueData = Array(12)
    // 		.fill(1)
    // 		.map(() => Math.floor(Math.random() * 100000000));

    const contractData = Array(12).fill(0);
    contracts?.getContractStatisticByYear.result.forEach((result) => {
        contractData[result.month - 1] = result.contract;
    });
    //   const contractData = Array(12)
    //     .fill(1)
    //     .map(() => Math.floor(Math.random() * 100));

    const userData = Array(12).fill(0);
    users?.getUserStatisticByYear.result.forEach((result) => {
        userData[result.month - 1] = result.user;
    });
    //   const userData = Array(12)
    //     .fill(1)
    //     .map(() => Math.floor(Math.random() * 40));

    const chartRevenueData = {
        labels: months.map((month) => `Tháng ${month}`),
        datasets: [
          {
            label: "Doanh thu",
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: revenueData,
            borderWidth: 1,
          },
        ],
    };

    const chartContractData = {
        labels: months.map((month) => `Tháng ${month}`),
        datasets: [
          {
            label: "Hợp đồng",
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: contractData,
            borderWidth: 1,
          },
        ],
        
    };
    
      const chartUserData = {
        labels: months.map((month) => `Tháng ${month}`),
        datasets: [
          {
            label: "Người dùng",
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            data: userData,
            borderWidth: 1,
            fill: false,
            cubicInterpolationMode: "monotone",
            tension: 0.4,
          },
        ],
    };

    let delayed: boolean;
    return (
        <div className="flex flex-col space-y-4 justify-center items-center p-4">
            <div className="flex flex-row space-x-5 h-60">
                <div className="border-2 rounded-lg shadow-xl border-gray-200">
                    <Bar
                     className="h-60"
                     data={chartRevenueData}
                     options={{
                       responsive: true,
                       scales: {
                         y: {
                           display: true,
                         },
                       },
                       plugins: {
                         legend: {
                           position: "top",
                         },
                         title: {
                           display: true,
                           text: "Thống kê doanh thu",
                         },
                         tooltip: {
                           callbacks: {
                             label: (context: { dataset: { label: string; }; parsed: { y: number | null; x: number; }; }) => {
                               let label = context.dataset.label || "";
                               if (context.parsed.y !== null) {
                                 label += ` tháng ${
                                   context.parsed.x + 1
                                 }: ${context.parsed.y
                                   .toFixed(2)
                                   .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
                               }
                               return label;
                             },
                           },
                         },
                       },
                       animation: {
                         onComplete: () => {
                           delayed = true;
                         },
                         delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number; }) => {
                           let delay = 0;
                           if (
                             context.type === "data" &&
                             context.mode === "default" &&
                             !delayed
                           ) {
                             delay =
                               context.dataIndex * 300 + context.datasetIndex * 100;
                           }
                           return delay;
                         },
                       },
                     }}
                    />
                </div>
                <div className="border-2 rounded-lg shadow-xl border-gray-200">
                     <Line
                      className="h-60"
                      data={chartContractData}
                      options={{
                        responsive: true,
                        scales: {
                          y: {
                            display: true,
                          },
                        },
                        plugins: {
                          legend: {
                            position: "top",
                          },
                          title: {
                            display: true,
                            text: "Thống kê hợp đồng",
                          },
                        },
                        animation: {
                          onComplete: () => {
                            delayed = true;
                          },
                          delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number; }) => {
                            let delay = 0;
                            if (
                              context.type === "data" &&
                              context.mode === "default" &&
                              !delayed
                            ) {
                              delay =
                                context.dataIndex * 300 + context.datasetIndex * 100;
                            }
                            return delay;
                          },
                        },
                      }}
                     />
                </div>
            </div>
            <div className="border-2 h-96 w-fit rounded-lg shadow-xl border-gray-200">
                <Line
                 className="h-96"
                 data={chartUserData as any}
                 options={{
                   responsive: true,
                   plugins: {
                     legend: {
                       position: "top",
                     },
                     title: {
                       display: true,
                       text: "Thống kê người dùng",
                     },
                   },
                   animation: {
                     onComplete: () => {
                       delayed = true;
                     },
                     delay: (context: { type: string; mode: string; dataIndex: number; datasetIndex: number; }) => {
                       let delay = 0;
                       if (
                         context.type === "data" &&
                         context.mode === "default" &&
                         !delayed
                       ) {
                         delay = context.dataIndex * 300 + context.datasetIndex * 100;
                       }
                       return delay;
                     },
                   },
                }}
                />
            </div>
        </div>
    );
};
export default BarChart;