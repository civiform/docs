---
layout: layouts/page.njk
title: CiviForm | News
---

# News

<div class="info-box">
<span class="ca-gov-icon-info" aria-hidden="true"></span>
Check out the latest product updates in our <a href="https://github.com/civiform/civiform/releases" target="_blank">release notes</a>!
</div>

{%- for story in news_featured -%}
{%- block news_feature -%}
{%- include "layouts/news-feature.njk" -%}
{%- endblock -%}
{%- endfor -%}

<h2>More stories</h2>

<div class="cagov-stack">
  {%- for story in news -%}
    <a href="{{story.URL}}" target="_blank" class="btn-action-primary m-t-1"><span class="btn-action-title">{{story.Title}}</span>
    <span class="btn-action-text"><strong>{{story.Date | textDate}}</strong> | {{story.Publisher}}</span></a>
  {%- endfor -%}
</div>
