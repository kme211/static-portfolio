(function() {
  'use strict';
  const DATE_CLASS = '.project__date';
  const PROJECT_CLASS = '.project';

  // http://stackoverflow.com/questions/7641791/javascript-library-for-human-friendly-relative-date-formatting#answer-7641812
  function getRelativeTimeAgo(dateStr) {
    const dateArr = dateStr.split('-');
    const date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    const delta = Math.round((+new Date - date) / 1000);

    const minute = 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7,
      month = week * 4,
      year = day * 365;

    let fuzzy;

    if (delta < 30) {
      fuzzy = 'just now';
    } else if (delta < minute) {
      fuzzy = delta + ' seconds ago';
    } else if (delta < 2 * minute) {
      fuzzy = 'a minute ago'
    } else if (delta < hour) {
      fuzzy = Math.floor(delta / minute) + ' minutes ago';
    } else if (Math.floor(delta / hour) == 1) {
      fuzzy = '1 hour ago'
    } else if (delta < day) {
      fuzzy = Math.floor(delta / hour) + ' hours ago';
    } else if (delta < day * 2) {
      fuzzy = 'yesterday';
    } else if (delta < week) {
      fuzzy = Math.floor(delta / day) + ' days ago';
    } else if (delta < week * 2) {
      fuzzy = 'a week ago'
    } else if (delta < month) {
      fuzzy = Math.floor(delta / week) + ' weeks ago';
    } else if (delta < month * 2) {
      fuzzy = 'a month ago';
    } else if (delta < year) {
      fuzzy = Math.floor(delta / month) + ' months ago';
    } else if (delta < year * 2) {
      fuzzy = 'a year ago'
    } else {
      fuzzy = Math.floor(delta / year) + ' years ago';
    }

    return fuzzy;
  }

  const dates = document.querySelectorAll(DATE_CLASS);

  dates.forEach(date => date.textContent = getRelativeTimeAgo(date.textContent));

  const projects = document.querySelectorAll(PROJECT_CLASS);

  function checkProjects(e) {
    projects.forEach(project => {
      
      const fadeUpAt = (window.scrollY + window.innerHeight) - project.offsetHeight / 2;
      const projectBottom = project.offsetTop + project.offsetHeight;
      const isHalfShown = fadeUpAt > project.offsetTop;
      const isNotScrolledPast = window.scrollY < (projectBottom - (project.offsetHeight / 2));

      if(isHalfShown && isNotScrolledPast) {
        project.classList.add('active');
      } else {
        project.classList.remove('active');   
      }
    });
  }

  window.addEventListener('scroll', checkProjects);
  checkProjects();

  const tagList = document.querySelector('.tags');
  const tags = [].slice.call(tagList.children);

  function hasClass(el, className) {
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }

  function addClass(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  }

  function removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  function findTagEl(elem) {
    if(elem.dataset && elem.dataset.filter) return elem;
    return findTagEl(elem.parentNode)
  }

  function updateCurrentTag(currentTag) {
    tags.forEach(function(tag) {
      if(tag === currentTag) addClass(tag, 'active');
      else removeClass(tag, 'active');
    });

    const filter = currentTag.dataset.filter;

    projects.forEach(function(item) {
      if(filter !== 'all' && !hasClass(item, filter)) {
        addClass(item, 'hidden');
      } else {
        removeClass(item, 'hidden');
      }
    });

    window.setTimeout(checkProjects, 500);
  }

  tagList.addEventListener('click', function(e) {
    if(e.target.tagName.toLowerCase() === 'ul') return;
    const currentTag = findTagEl(e.target);
    updateCurrentTag(currentTag);
  })
}());