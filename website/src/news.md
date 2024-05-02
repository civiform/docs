---
layout: layouts/page.njk
title: CiviForm | News
pagination:
  data: news
  size: 8
---

# News

<!-- TODO(rasmi): Sort by date. -->
<div class="cagov-stack">
{%- for story in pagination.items -%}
      <a href="{{story.URL}}" target="_blank" class="btn-action-primary m-t-1"><span class="btn-action-title">{{story.Title}}</span>
      <span class="btn-action-text"><strong>{{story.Date | textDate}}</strong> | {{story.Publisher}}</span></a>
{%- endfor -%}
</div>

<!-- TODO(rasmi): Make the buttons nice. -->

<a href="{{pagination.previousPageHref}}">Previous Page</a>
<a href="{{pagination.nextPageHref}}">Next Page</a>
