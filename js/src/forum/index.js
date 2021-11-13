import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import PostStream from 'flarum/forum/components/PostStream';
import PostStreamScrubber from 'flarum/forum/components/PostStreamScrubber'

app.initializers.add('justoverclock/thread-read-time', () => {
  extend(PostStreamScrubber.prototype, 'view', function (vdom){
    if (vdom.children && vdom.children.splice) {
      const insert = <div class="contReadingTime">
        <p class="readTime" id="readPerc"/>
        <div id="progress-bar" className="progressBar"/>
      </div>;
      vdom.children.splice(0, 0, insert);
    }
  })
  extend(PostStream.prototype, ['oncreate', 'onupdate'], function (){
    const progressBar = document.querySelector('#progress-bar');
    const section = document.querySelector('div#app');
    const readTime = document.querySelector('#readPerc');

    const getScrollValue = () => {
      let distance = -section.getBoundingClientRect().top;
      let progressWidth = (distance / (section.getBoundingClientRect().height - document.documentElement.clientHeight)) * 100;
      let value = Math.floor(progressWidth);
      console.log(value)
      progressBar.style.width = value + '%';
      readTime.innerText = 'Reading:' + ' ' + value + '%'
    }

    window.addEventListener('scroll', getScrollValue)
  })
});
