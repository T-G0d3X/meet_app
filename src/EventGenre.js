import React, { useEffect, useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(() => getData());
  }, [events]);

  const getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const summary = events.map((event) => {
      const eventSummary = event.summary;
      return { eventSummary };
    });

    const data = genres.map((genre) => {
      const name = genre;

      const value = summary.filter((summary) =>
        summary.eventSummary.split(' ').includes(name)
      ).length;
      // Filter name and genre again here
      return { name, value };
    });

    return data.filter((data) => data.value >= 1);
  };

  const COLORS = [
    'rgb(186,85,211)',
    'rgb(147,112,219)',
    'rgb(138,43,226)',
    'rgb(148,0,211)',
    'rgb(153,50,204)',
  ];

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          labelLine={false}
          outerRadius={120}
          fill="#8884d8"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              name={entry.name}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
