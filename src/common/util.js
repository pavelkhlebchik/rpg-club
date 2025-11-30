/* eslint-disable no-param-reassign */
const normalize = (num) => (num.toString().length > 1 ? num : `0${num}`);

export default function clamp(x, fromX, toX) {
  if (x < fromX) x = fromX;
  if (x > toX) x = toX;

  return x;
}

export function animateEx(dx, startTime, currentTime, speed, looped = false) {
  const diff = currentTime - startTime;
  let time = (speed && diff / speed) || 0;

  if (looped) {
    time %= 1;
  } else if (time > 1) {
    time = 1;
  }

  return { offset: dx * time, progress: time };
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function getTime(date) {
  const convertDate = new Date(date);
  return `${normalize(convertDate.getHours())}:${normalize(convertDate.getMinutes())}:${normalize(
    convertDate.getSeconds(),
  )}`;
}

function random(max) {
  return Math.floor(Math.random() * (max + 1));
}

export function generateMap(mapSize) {
  const wall = 'wall';
  const grass = 'grass';
  const npcSpawn = 'npcSpawn';
  const spawn = 'spawn';
  const fire = 'fire';

  const sad = [wall, grass, npcSpawn, spawn, fire];

  const walls = [];
  const randomMapItems = [];
  const map = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; mapSize > i; i++) {
    walls.push([[wall]]);
    randomMapItems.push([[sad[random(sad.length - 1)]]]);
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; mapSize - 2 > i; i++) {
    map.unshift(randomMapItems);
  }

  map.push(walls);
  map.unshift(walls);

  return map;
}
