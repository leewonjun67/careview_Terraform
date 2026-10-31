// 날짜를 년.월.일

const formatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
});

export function DailyDate(date = new Date()) {
  return formatter.format(date); // 예: "2025년 10월 29일 수요일"
}
