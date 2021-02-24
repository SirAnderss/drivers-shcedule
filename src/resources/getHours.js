const getHours = (startTime, endTime) => {
  const end = endTime.split(':'),
    start = startTime.split(':'),
    t1 = new Date(),
    t2 = new Date();

  t1.setHours(end[0], end[1], end[2]);
  t2.setHours(start[0], start[1], start[2]);

  t1.setHours(
    t1.getHours() - t2.getHours(),
    t1.getMinutes() - t2.getMinutes(),
    t1.getSeconds() - t2.getSeconds()
  );

  const segments = t1.getHours() * 2 + (t1.getMinutes() > 30 ? 1 : 0);

  return setTimes(segments, start[0], start[1], start[2]);
};

const setTimes = (segments, start, mins, secs) => {
  let arr = [];

  let now = new Date(`2021-01-01T${start}:${mins}:${secs}`);

  for (let i = 0; i < segments; i++) {
    i === 0
      ? now.setMinutes(now.getMinutes())
      : now.setMinutes(now.getMinutes() + 30);

    arr.push(now.getHours() + ':' + ('00' + now.getMinutes()).slice(-2));
  }

  return arr;
};

export default getHours;
