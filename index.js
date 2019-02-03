var TIMEOUT_IN_SECS = 3 * 60;
var PERIODIC_MESSAGING_TIMEOUT = 30;
var TEMPLATE =
  '<h1 style="text-shadow: 1px 1px #fff;"><span class="js-timer-minutes">00</span>:<span class="js-timer-seconds">00</span></h1>';

function padZero(number) {
  return ("00" + String(number)).slice(-2);
}

class Timer {
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  constructor(timeout_in_secs, callback) {
    this.initial_timeout_in_secs = timeout_in_secs;
    this.reset();
    this.callback = callback;
  }
  getTimestampInSecs() {
    var timestampInMilliseconds = new Date().getTime();
    return Math.round(timestampInMilliseconds / 1000);
  }
  start() {
    if (this.isRunning) return;
    this.timestampOnStart = this.getTimestampInSecs();
    this.isRunning = true;
  }
  stop() {
    if (!this.isRunning) return;
    this.timestampOnStart = null;
    this.isRunning = false;
    this.timeout_in_secs = this.calculateSecsLeft();
  }
  reset(timeout_in_secs) {
    this.isRunning = false;
    this.timestampOnStart = null;
    this.timeout_in_secs = this.initial_timeout_in_secs;
  }
  calculateSecsLeft() {
    if (!this.isRunning) return this.timeout_in_secs;
    var currentTimestamp = this.getTimestampInSecs();
    var secsGone = currentTimestamp - this.timestampOnStart;
    var secsLeft = Math.max(this.timeout_in_secs - secsGone, 0);
    if (!secsLeft) {
      this.stop();
      if (typeof this.callback === "function") {
        setTimeout(this.callback, 0);
      }
    }
    return secsLeft;
  }
}

class TimerWidget {
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  construct() {
    this.timerContainer = this.minutes_element = this.seconds_element = null;
  }
  mount(rootTag) {
    if (this.timerContainer) this.unmount();

    // adds HTML tag to current page
    this.timerContainer = document.createElement("div");

    this.timerContainer.setAttribute(
      "style",
      `
      height: 100px;
      width: 100px;
      position: fixed;
      z-index: 99999999;
      text-align: center;`
    );
    this.timerContainer.innerHTML = TEMPLATE;

    rootTag.insertBefore(this.timerContainer, rootTag.firstChild);

    this.minutes_element = this.timerContainer.querySelector(
      ".js-timer-minutes"
    );
    this.seconds_element = this.timerContainer.querySelector(
      ".js-timer-seconds"
    );
  }
  update(secsLeft) {
    var minutes = Math.floor(secsLeft / 60);
    var seconds = secsLeft - minutes * 60;

    this.minutes_element.innerHTML = padZero(minutes);
    this.seconds_element.innerHTML = padZero(seconds);
  }
  unmount() {
    if (!this.timerContainer) return;
    this.timerContainer.remove();
    this.timerContainer = this.minutes_element = this.seconds_element = null;
  }
}

function shuffleList(list) {
  return list.sort(() => {
    var random = Math.random();
    if (random < 0.35) {
      return -1;
    }
    if (random > 0.65) {
      return 1;
    }
    return 0;
  });
}

function getMotivationMessage() {
  return shuffleList([
    "Работа не волк, сама себя не сделает",
    "Человек должен сам сделать свои стрелы",
    "В 100% случаев не предпринятые попытки не увенчаются успехом",
    "Ваше время ограничено, не тратьте его, живя чужой жизнью",
    "Если ветер утих, берись за вёсла"
  ]).pop();
}

function showMotivationMessage(message) {
  alert(message);
}

function main() {
  var timer = new Timer(TIMEOUT_IN_SECS, startPeriodicMessaging);
  var timerWiget = new TimerWidget();
  var intervalId = null;

  timerWiget.mount(document.body);

  function startPeriodicMessaging() {
    clearInterval(intervalId);
    var timeout = PERIODIC_MESSAGING_TIMEOUT * 1000;

    showMotivationMessage(getMotivationMessage());
    setTimeout(startPeriodicMessaging, timeout);
  }

  function handleIntervalTick() {
    var secsLeft = timer.calculateSecsLeft();
    timerWiget.update(secsLeft);
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      timer.stop();
      clearInterval(intervalId);
      intervalId = null;
    } else {
      timer.start();
      intervalId = intervalId || setInterval(handleIntervalTick, 300);
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  handleVisibilityChange();
}

if (document.readyState === "complete" || document.readyState === "loaded") {
  main();
} else {
  // initialize timer when page ready for presentation
  window.addEventListener("DOMContentLoaded", main);
}
