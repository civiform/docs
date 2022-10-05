# Monitoring a CiviForm deployment

CiviForm supports server monitoring via [Prometheus](https://prometheus.io/) metrics visualized in [Grafana](https://grafana.com/).

![](<../.gitbook/assets/monitoring-architecture.png.png>)

## Enabling metrics export

Exporting metrics from the server is optional, and must be enabled by setting the `CIVIFORM_SERVER_METRICS_ENABLED` environment variable to `true`. When enabled, the server exports metrics from the `/metrics` HTTP route. While these metrics data are not sensitive, it is a good practice to prevent access to this route from the public internet (which is done by default when using the [CiviForm terraform deployment system](https://github.com/civiform/cloud-deploy-infra/)).

## Viewing metrics

### AWS

The [CiviForm terraform deployment system](https://github.com/civiform/cloud-deploy-infra/) for AWS deploys the monitoring stack automatically. After deployment, user access to the Grafana dashboard and configuration of the dashboard need to be done manually.

#### Configure access

[AWS Managed Grafana](https://aws.amazon.com/grafana/) uses [AWS IAM Identity Center](https://aws.amazon.com/iam/identity-center/) for access management. **Note that this is a different service from [AWS IAM](https://aws.amazon.com/iam/) the accounts/user profiles in AWS IAM Identity Center are completely separate from accounts in AWS IAM.**

1. Login to the AWS console and navigate to the IAM Identity Center service
1. In the left nav, click "Users"
1. For each user you'd like to grant access to viewing metrics, click the "Add user" button and follow the workflow
1. Follow instructions [here](https://docs.aws.amazon.com/grafana/latest/userguide/AMG-manage-users-and-groups-AMG.html) for adding granting access for those users to your Grafana workspace

#### Configure dashboard

Once you have an Identity Center user with permissions to administer your Grafana workspace, it's time to configure the workspace dashboard. From the Grafana workspace page in the AWS console, click the link under "Grafana workspace URL". After signing in this will take you to your Grafana workspace. 

To enable viewing metrics, add the Prometheus server as a data source for your Grafana workspace: 

1. Click the AWS logo in the left nav
1. Click "Amazon Managed Service for Prometheus"
1. Add the data source for Prometheus

With Prometheus connected as a Grafana workspace, panels can now be created in Grafana that display metrics from the CiviForm server. There are many metrics available, and many ways to display them. You can get started with the some basic metrics by importing a pre-built CiviForm dashboard:

1. Hover over the '+' icon in the left nav
1. Click the 'Import' option 
1. Paste the following JSON into the "Import via panel JSON" and click "Load"

```json
{
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": "-- Grafana --",
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "target": {
          "limit": 100,
          "matchAny": false,
          "tags": [],
          "type": "dashboard"
        },
        "type": "dashboard"
      }
    ]
  },
  "description": "",
  "editable": true,
  "fiscalYearStartMonth": 0,
  "graphTooltip": 0,
  "id": 4,
  "links": [],
  "liveNow": false,
  "panels": [
    {
      "datasource": {
        "type": "prometheus",
        "uid": "m7ED6744k"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 12,
        "w": 12,
        "x": 0,
        "y": 0
      },
      "id": 2,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "table",
          "placement": "bottom"
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "prometheus",
            "uid": "m7ED6744k"
          },
          "exemplar": true,
          "expr": "sum by (controller,method) (rate(http_requests_total{}[1m]))",
          "interval": "",
          "intervalFactor": 2,
          "legendFormat": "{{controller}}.{{method}}",
          "refId": "A"
        }
      ],
      "title": "Requests per minute (by action)",
      "transformations": [],
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "prometheus",
        "uid": "m7ED6744k"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 12,
        "w": 12,
        "x": 12,
        "y": 0
      },
      "id": 11,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "table",
          "placement": "bottom"
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "prometheus",
            "uid": "m7ED6744k"
          },
          "exemplar": true,
          "expr": "sum by (path) (rate(http_requests_total{}[1m]))",
          "interval": "",
          "intervalFactor": 2,
          "legendFormat": "{{controller}}.{{method}} {{path}} {{status}}",
          "refId": "A"
        }
      ],
      "title": "Requests per minute (by path)",
      "transformations": [],
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "prometheus",
        "uid": "m7ED6744k"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 12
      },
      "id": 10,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "table",
          "placement": "bottom"
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "prometheus",
            "uid": "m7ED6744k"
          },
          "exemplar": true,
          "expr": "sum by (controller,method,status) (rate(http_requests_total{status=~\"404|401|400\"}[1m]))",
          "interval": "",
          "legendFormat": "{{controller}}.{{method}} {{status}}",
          "refId": "A"
        }
      ],
      "title": "Client errors per minute (by action and status)",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "prometheus",
        "uid": "m7ED6744k"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "s"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 12,
        "w": 12,
        "x": 12,
        "y": 12
      },
      "id": 6,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "table",
          "placement": "bottom"
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "prometheus",
            "uid": "m7ED6744k"
          },
          "exemplar": true,
          "expr": "histogram_quantile(0.5, sum without(instance,Verb,Status,Path,job) ( rate(requests_latency_seconds_bucket{}[5m])) )",
          "interval": "",
          "legendFormat": "{{Controller}}.{{RouteActionMethod}}",
          "refId": "A"
        }
      ],
      "title": "Request latency p50 (by action)",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "prometheus",
        "uid": "m7ED6744k"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 8,
        "w": 12,
        "x": 0,
        "y": 20
      },
      "id": 14,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "table",
          "placement": "bottom"
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "prometheus",
            "uid": "m7ED6744k"
          },
          "exemplar": true,
          "expr": "sum by (controller,method) (rate(http_requests_total{status=~\"500\"}[1m]))",
          "interval": "",
          "legendFormat": "{{controller}}.{{method}}",
          "refId": "A"
        }
      ],
      "title": "Server errors per minute (by action)",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "prometheus",
        "uid": "m7ED6744k"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "s"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 12,
        "w": 12,
        "x": 12,
        "y": 24
      },
      "id": 12,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "table",
          "placement": "bottom"
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "prometheus",
            "uid": "m7ED6744k"
          },
          "exemplar": true,
          "expr": "histogram_quantile(0.9, sum without(instance,Verb,Status,Path,job) ( rate(requests_latency_seconds_bucket{}[5m])) )",
          "interval": "",
          "legendFormat": "{{Controller}}.{{RouteActionMethod}}",
          "refId": "A"
        }
      ],
      "title": "Request latency p90 (by action)",
      "type": "timeseries"
    },
    {
      "datasource": {
        "type": "prometheus",
        "uid": "m7ED6744k"
      },
      "fieldConfig": {
        "defaults": {
          "color": {
            "mode": "palette-classic"
          },
          "custom": {
            "axisLabel": "",
            "axisPlacement": "auto",
            "barAlignment": 0,
            "drawStyle": "line",
            "fillOpacity": 0,
            "gradientMode": "none",
            "hideFrom": {
              "legend": false,
              "tooltip": false,
              "viz": false
            },
            "lineInterpolation": "linear",
            "lineWidth": 1,
            "pointSize": 5,
            "scaleDistribution": {
              "type": "linear"
            },
            "showPoints": "auto",
            "spanNulls": false,
            "stacking": {
              "group": "A",
              "mode": "none"
            },
            "thresholdsStyle": {
              "mode": "off"
            }
          },
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 80
              }
            ]
          },
          "unit": "s"
        },
        "overrides": []
      },
      "gridPos": {
        "h": 12,
        "w": 12,
        "x": 12,
        "y": 36
      },
      "id": 13,
      "options": {
        "legend": {
          "calcs": [],
          "displayMode": "table",
          "placement": "bottom"
        },
        "tooltip": {
          "mode": "single",
          "sort": "none"
        }
      },
      "targets": [
        {
          "datasource": {
            "type": "prometheus",
            "uid": "m7ED6744k"
          },
          "exemplar": true,
          "expr": "histogram_quantile(0.99, sum without(instance,Verb,Status,Path,job) ( rate(requests_latency_seconds_bucket{}[5m])) )",
          "interval": "",
          "legendFormat": "{{Controller}}.{{RouteActionMethod}}",
          "refId": "A"
        }
      ],
      "title": "Request latency p99 (by action)",
      "type": "timeseries"
    }
  ],
  "schemaVersion": 35,
  "style": "dark",
  "tags": [],
  "templating": {
    "list": []
  },
  "time": {
    "from": "now-12h",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "",
  "title": "CiviForm server",
  "uid": "p5kGWLV4z",
  "version": 12,
  "weekStart": ""
}
```
