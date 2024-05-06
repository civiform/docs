---
layout: layouts/page.njk
title: CiviForm | News
---

# News

<div class="cagov-stack">
  {%- for story in news -%}
    <a href="{{story.URL}}" target="_blank" class="btn-action-primary m-t-1"><span class="btn-action-title">{{story.Title}}</span>
    <span class="btn-action-text"><strong>{{story.Date | textDate}}</strong> | {{story.Publisher}}</span></a>
  {%- endfor -%}
</div>
