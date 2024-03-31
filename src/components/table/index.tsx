const mockData = [
  { id: 1, title: "Song Title 1", date: "2022-01-01", duration: "3:30" },
  { id: 2, title: "Song Title 2", date: "2022-01-02", duration: "4:15" },
  { id: 3, title: "Song Title 3", date: "2022-01-03", duration: "2:50" },
  { id: 4, title: "Song Title 4", date: "2022-01-04", duration: "5:10" },
  { id: 5, title: "Song Title 5", date: "2022-01-05", duration: "3:45" },
  { id: 6, title: "Song Title 1", date: "2022-01-01", duration: "3:30" },
  { id: 7, title: "Song Title 2", date: "2022-01-02", duration: "4:15" },
  { id: 8, title: "Song Title 3", date: "2022-01-03", duration: "2:50" },
  { id: 9, title: "Song Title 4", date: "2022-01-04", duration: "5:10" },
  { id: 10, title: "Song Title 5", date: "2022-01-05", duration: "3:45" },
  { id: 11, title: "Song Title 1", date: "2022-01-01", duration: "3:30" },
  { id: 12, title: "Song Title 2", date: "2022-01-02", duration: "4:15" },
  { id: 13, title: "Song Title 3", date: "2022-01-03", duration: "2:50" },
  { id: 14, title: "Song Title 4", date: "2022-01-04", duration: "5:10" },
  { id: 15, title: "Song Title 5", date: "2022-01-05", duration: "3:45" },
  { id: 16, title: "Song Title 1", date: "2022-01-01", duration: "3:30" },
  { id: 17, title: "Song Title 2", date: "2022-01-02", duration: "4:15" },
  { id: 18, title: "Song Title 3", date: "2022-01-03", duration: "2:50" },
  { id: 19, title: "Song Title 4", date: "2022-01-04", duration: "5:10" },
  { id: 20, title: "Song Title 5", date: "2022-01-05", duration: "3:45" },
];

import "./styles.scss";

export const TableComponent = () => {
  return (
    <div className="table">
      <div className="table__header">
        <div className="table__header__title">Title</div>
        <div className="table__header__date">Date</div>
        <div className="table__header__duration">Duration</div>
      </div>
      <div className="table__body">
        {mockData.map((data, index) => (
          <div
            className={`table__body__row ${
              index % 2 === 0 ? "table__body__odd-row" : ""
            }`}
            key={index}
          >
            <div className="table__body__row__title">{data.title}</div>
            <div className="table__body__row__date">{data.date}</div>
            <div className="table__body__row__duration">{data.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
