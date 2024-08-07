"use client";

import {
  getLast7Days,
  getMonthlyVisits,
  getVisitorCountToday,
  getYearVisits,
} from "@/components/_service/admin/admin.service";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Chart } from "react-google-charts";

const VisitorWeekly = (props: any) => {
  const dispatch = useDispatch();
  const [visitors, setVisitors] = useState({
    year: "2024",
    month: "07",
    day: "01",
  });
  const [month, setMonth] = useState(0);
  const [visitorsData, setVisitorsData] = useState({});
  const [last7Days, setLast7Days] = useState({});
  const options = {
    title: "Chart Title",
    colors: ["gray"],
  };
  const [visitorCountToday, setVisitorCountToday] = useState(0);

  useEffect(() => {
    return () => {
      try {
        dispatch(getMonthlyVisits(visitors)).then((res: any) => {
          setMonth(res.payload);
        });

        dispatch(getYearVisits(visitors)).then((res: any) => {
          const transformedData = Object.entries(res.payload).map(
            ([day, visits]: any) => [
              day,
              parseInt(visits), // Ensure visits is a number
            ]
          );

          // Sort the data by day in ascending order
          transformedData.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

          transformedData.unshift(["Day", "Visits"]); // Add header
          setVisitorsData(transformedData);
        });
      } catch (error) {
        console.log(error);
      }
    };
  }, [visitors]);

  useEffect(() => {
    return () => {
      try {
        dispatch(getVisitorCountToday()).then((res: any) => {
          setVisitorCountToday(res.payload);
        });
        dispatch(getLast7Days()).then((res: any) => {
          const transformedData = Object.entries(res.payload).map(
            ([day, visits]: any) => [
              day,
              parseInt(visits), // Ensure visits is a number
            ]
          );

          // Sort the data by day in ascending order
          transformedData.sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

          transformedData.unshift(["Day", "Visits"]); // Add header
          setLast7Days(transformedData);
        });
      } catch (error) {
        console.log(error);
      }
    };
  }, []);

  return (
    <>
      <div className="w-[1200px] border p-2">
        <div className="border-b p-2 flex flex-row justify-between items-start">
          <p>방문자 통계</p>
          <div className="flex flex-col items-end gap-1">
            <h1 className="text-xs">이번달: {month || 0}</h1>
            <h1 className="text-xs">오늘: {visitorCountToday || 0}</h1>
          </div>
        </div>
        <div className="p-5 flex flex-col gap-2">
          <div className="gap-2 border p-3 px-5">
            <Chart
              chartType="LineChart"
              data={visitorsData}
              options={{ ...options, title: "월간 통계" }}
            />
          </div>
          <div className="gap-2 border p-3 px-5">
            <Chart
              chartType="LineChart"
              data={last7Days}
              options={{ ...options, title: "7일간 통계" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitorWeekly;
