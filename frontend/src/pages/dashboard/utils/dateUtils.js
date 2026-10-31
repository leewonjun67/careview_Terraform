// 날짜를 "YYYY-MM-DD"로 포맷
export function fmt(d) {
  return d.toISOString().slice(0, 10);
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * 주어진 cursor(해당 월) 기준으로
 * 달력에 쓸 Date/null 배열을 생성
 */
export function buildMonthGrid(cursor) {
  const first = startOfMonth(cursor);
  const last = endOfMonth(cursor);

  // 월(0) ~ 일(6) 기준으로 만드는 패딩
  const firstWeekPad = (first.getDay() + 6) % 7;
  const total = firstWeekPad + last.getDate();
  const rows = Math.ceil(total / 7);
  const grid = [];

  // 앞쪽 패딩
  for (let i = 0; i < firstWeekPad; i++) grid.push(null);

  // 해당 월 날짜
  for (let d = 1; d <= last.getDate(); d++) {
    grid.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
  }

  // 뒤쪽 패딩 (행 맞춤)
  while (grid.length < rows * 7) grid.push(null);

  return grid;
}
