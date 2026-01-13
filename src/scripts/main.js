'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let leftClick = false;

  document.addEventListener(
    'click',
    () => {
      leftClick = true;
      resolve('First promise was resolved');
      clearTimeout(timeout);
    },
    { once: true },
  );

  const timeout = setTimeout(() => {
    if (!leftClick) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener(
    'click',
    () => {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      rightClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );
});

function showNotification(message, isSuccess) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;
  document.body.append(div);
}

firstPromise
  .then((message) => showNotification(message, true))
  .catch((error) => showNotification(error.message, false));

secondPromise.then((message) => showNotification(message, true));
thirdPromise.then((message) => showNotification(message, true));
