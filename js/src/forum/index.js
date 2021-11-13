/*
 * This file is part of justoverclock/thread-read-time extension.
 *
 * Copyright (c) 2021 Marco Colia.
 * https://flarum.it
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import PostStream from 'flarum/forum/components/PostStream';
import PostStreamScrubber from 'flarum/forum/components/PostStreamScrubber';

app.initializers.add('justoverclock/thread-read-time', () => {
  extend(PostStreamScrubber.prototype, 'view', function (vdom) {
    if (vdom.children && vdom.children.splice) {
      const insert = (
        <div class="contReadingTime">
          <p class="readTime" id="readPerc"/>
          <div id="progress-bar" className="progressBar" />
        </div>
      );
      vdom.children.splice(0, 0, insert);
    }
  });
  extend(PostStream.prototype, ['oncreate', 'onupdate'], function () {
    const progressBar = document.querySelector('#progress-bar');
    const section = document.querySelector('div#app');
    const readTime = document.querySelector('#readPerc');

    const getScrollValue = () => {
      let distance = -section.getBoundingClientRect().top;
      let progressWidth = (distance / (section.getBoundingClientRect().height - document.documentElement.clientHeight)+0.36) * 100;
      let value = Math.floor(progressWidth);

      progressBar.style.width = value + '%';
      readTime.innerText =
        app.translator.trans('justoverclock-thread-read-time.forum.reading') + ' ' +
        value + '%' + ' ' + app.translator.trans('justoverclock-thread-read-time.forum.ofThread');
    };

    window.addEventListener('scroll', getScrollValue);
  });
});
