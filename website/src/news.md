---
layout: layouts/page.njk
title: CiviForm | News
pagination:
  data: news
  size: 7
---

# News

<div class="cagov-stack">
  {%- for story in pagination.items -%}
    <a href="{{story.URL}}" target="_blank" class="btn-action-primary m-t-1"><span class="btn-action-title">{{story.Title}}</span>
    <span class="btn-action-text"><strong>{{story.Date | textDate}}</strong> | {{story.Publisher}}</span></a>
  {%- endfor -%}
</div>

<!-- Page selection buttons -->
<div class="page-selector">
  {%- if pagination.previousPageHref -%}
    <a href="{{ pagination.previousPageHref }}" class="btn-primary-outline">Previous</a>
  {%- else -%}
    <span class="btn-disabled-outline" aria-disabled="true">Previous</span>
  {%- endif -%}
  {%- if pagination.nextPageHref -%}
    <a href="{{ pagination.nextPageHref }}" class="btn-primary-outline">Next</a>
  {%- else -%}
    <span class="btn-disabled-outline" aria-disabled="true">Next</span>
  {%- endif -%}
</div>
