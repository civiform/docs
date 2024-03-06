---
pagination:
  data: redirects
  size: 1
  alias: redirect
redirects:
  - {
      "title": "CiviForm Project Public Drive",
      "from": "drive",
      "to": "https://drive.google.com/drive/folders/1LT7ZivhjXb5iSxwisuF11CjUMKPYjpi0",
    }
  - {
      "title": "CiviForm Project Private Drive",
      "from": "drive-private",
      "to": "https://drive.google.com/drive/folders/1svFQEY73YpI9k0-wyfqY2UU_w8hUFIAG",
    }
  - {
      "title": "CiviForm Slack",
      "from": "slack",
      "to": "https://civiform.slack.com",
    }
permalink: "{{ redirect.from }}/"
layout: layouts/redirect.njk
---
