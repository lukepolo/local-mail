// https://vuejs.org/v2/guide/custom-directive.html
import Vue from "vue";

interface ClickAwayElement extends HTMLElement {
  checkIfShouldClose: (event: MouseEvent) => void;
}

Vue.directive("clickAway", {
  bind(el: ClickAwayElement, binding) {
    el.checkIfShouldClose = (event) => {
      if (!(el == event.target || el.contains(<Element>event.target))) {
        binding.value();
      }
    };
    let events = Object.keys(binding.modifiers) || ["click"];
    events.forEach((event) => {
      document.addEventListener(event, el.checkIfShouldClose);
    });
  },
  unbind(el: ClickAwayElement, binding) {
    let events = Object.keys(binding.modifiers) || ["click"];
    events.forEach((event) => {
      document.removeEventListener(event, el.checkIfShouldClose);
    });
  },
});
