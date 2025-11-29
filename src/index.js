import { io } from 'socket.io-client';
import './index.scss';
import { getTime } from './common/util';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  const socket = io('http://localhost:3000');
  const $startGame = document.querySelector('.start-game');
  const $nameForm = document.getElementById('nameForm');
  const $inputName = document.getElementById('name');

  const $chatWrap = document.querySelector('.chat-wrap');
  const $form = document.getElementById('form');
  const $input = document.getElementById('input');
  const $message = document.querySelector('.message');

  const submitName = (e) => {
    e.preventDefault();

    if ($inputName.value) {
      ClientGame.init({
        tagId: 'game',
        playerName: $inputName.value,
      });

      socket.emit('start', $inputName.value);
      $chatWrap.style.display = 'block';

      $nameForm.removeEventListener('submit', submitName);
      $startGame.remove();
    }
  };

  $nameForm.addEventListener('submit', submitName);

  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    if ($input.value) {
      socket.emit('chat message', $input.value);
      $message.scrollTop = $message.scrollHeight;
      $input.value = '';
    }
  });

  socket.on('chat connection', (data) => {
    $message.insertAdjacentHTML('beforeend', `<p style="color: green"><strong>${data.msg}</strong></p>`);
  });

  socket.on('chat online', (data) => {
    $message.insertAdjacentHTML(
      'beforeend',
      `<div class="online-wrapper">
      <p class="online" title="Онлайн Игроков"><strong>${data.online}</strong></p>
      </div>`,
    );
  });

  socket.on('chat message', (data) => {
    $message.insertAdjacentHTML(
      'beforeend',
      `<p><strong>${getTime(data.time)}</strong> - ${data.name}: ${data.msg}</p>`,
    );
  });

  socket.on('chat disconnect', (data) => {
    $message.insertAdjacentHTML('beforeend', `<p style="color: tomato"><strong>${data.msg}</strong></p>`);
  });
});
