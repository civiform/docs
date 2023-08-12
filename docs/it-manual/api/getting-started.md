# Getting Started

To get started using the API, we can connect from either our personal machine or another service. Connecting from your personal machine will usually


## Connect from your personal machine

1. To connect to the CiviForm API, you'll first need to determine your IP address.
1. If you're connecting to CiviForm across the public internet (for example, if CiviForm is hosted on AWS) you can use the following curl command:\
    {% code %}
    ```shell
      curl ifconfig.me
    ```
    {% endcode %}

1. In the CiviForm Admin, click "API keys" and then "New API Key"
1. Fill out the "Create a new API key" form, providing the IP address determined in Step 2, and selecting the program names you'll want to access with this key, and click Save. _Since we're only using this key for testing, set it to expire in a few days._

    {% hint style="info" %}
    When you provide your IP address, add `/32` to the end. If your IP address was `55.55.55.55`, you'd type `55.55.55.55/32` into the form.
    {% endhint %}

1. The next page will show your API key. *This is your only chance to see the key, it can not be retrieved later.* Copy it somewhere secure for the next step.
1. To test your API key and your connection to CiviForm, use the following curl command and replace `[Your CiviForm URL]` and `[Your API Key]` with the URL of your CiviForm instance and your API key, respectively:\
    {% code overflow="wrap" %}
    ```shell
      curl [Your CiviForm URL]/api/v1/checkAuth -H "Authorization: Basic [Your API Key]" -H "Content-Type: application/json" -v
    ```
    {% endcode %}

{% hint style="info" %}
If you see an `HTTP/2 200` in the output then you've succeeded!
{% endhint %}

{% hint style="warning" %}
If you see an `HTTP/2 401` in the output then something is wrong. You may have used the wrong IP address, typo'd the API key, or some other issue.
{% endhint %}

Also note: If you move locations or restart your computer, your IP address may change, and you'll need to generate a new API key.

to put somewhere:
If you're connecting to an on-prem instance of CiviForm, determing the IP address that CiviForm will see your traffic originating from can be more difficult, and you should check with your IT administrator.

## Connect from another service
Connecting to CiviForm from another service, such as IBM Cloud Pak for Data or Microsoft Dynamics CRM, you can follow similar steps as above.

The primary difference is that you'll need to know the IP addresses that service will be connecting from.

Cloudpak for data:
https://dataplatform.cloud.ibm.com/docs/content/wsj/admin/firewall_cfg.html

Microsoft Dynamics Cloud:
https://learn.microsoft.com/en-us/power-platform/admin/online-requirements#ip-addresses-required

but it seems like microsoft might change the IP address ranges?
